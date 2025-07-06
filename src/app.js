
import { ArgumentParser } from './cli/argumentParser.js';
import { ConfigManager } from './utils/config.js';
import { GeminiClient } from './services/geminiClient.js';
import { CommandExecutor } from './cli/commandExecutor.js';
import { InteractiveMenu } from './cli/interactiveMenu.js';
import chalk from 'chalk';

export class GenieApp {
  constructor() {
    this.config = new ConfigManager();
    this.argumentParser = new ArgumentParser();
    this.geminiClient = null;
    this.commandExecutor = null;
    this.interactiveMenu = new InteractiveMenu();
  }

  async initialize() {
    // Load configuration
    await this.config.load();
    
    // Initialize Gemini client
    const apiKey = this.config.get('geminiApiKey');
    if (apiKey) {
      this.geminiClient = new GeminiClient(apiKey);
      await this.geminiClient.validateApiKey();
    }
    
    // Initialize command executor
    this.commandExecutor = new CommandExecutor(this.geminiClient, this.config);
  }

  async run(args) {
    // If no arguments, show interactive menu
    if (args.length === 0) {
      await this.showInteractiveMenu();
      return;
    }

    // Parse arguments and execute command
    const parsedArgs = this.argumentParser.parse(args);
    await this.executeCommand(parsedArgs);
  }

  async showInteractiveMenu() {
    const hasApiKey = this.config.get('geminiApiKey');
    
    if (!hasApiKey) {
      console.log(chalk.yellow('🔑 First time setup required!'));
      await this.setupApiKey();
    }
    
    await this.interactiveMenu.show(this.commandExecutor);
  }

  async executeCommand(parsedArgs) {
    const hasApiKey = this.config.get('geminiApiKey');
    
    // Check if command requires AI and we don't have API key
    const aiCommands = ['summarize', 'explain', 'translate', 'chat', 'email', 'codegen', 'debug', 'commitmsg', 'docs', 'summarize-file', 'idea', 'poem'];
    const needsAi = aiCommands.some(cmd => parsedArgs[cmd]);
    
    if (needsAi && !hasApiKey) {
      console.log(chalk.yellow('🔑 This command requires AI features. Let\'s set up your API key first!'));
      await this.setupApiKey();
      
      // Reinitialize with new API key
      const apiKey = this.config.get('geminiApiKey');
      this.geminiClient = new GeminiClient(apiKey);
      this.commandExecutor = new CommandExecutor(this.geminiClient, this.config);
    }
    
    await this.commandExecutor.execute(parsedArgs);
  }

  async setupApiKey() {
    const { default: inquirer } = await import('inquirer');
    
    console.log(chalk.cyan('🚀 To use AI features, you need a Google Gemini API key.'));
    console.log(chalk.gray('Get yours free at: https://aistudio.google.com/app/apikey'));
    console.log();
    
    const { apiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: '🔑 Enter your Gemini API key:',
        mask: '*',
        validate: (input) => {
          if (!input.trim()) {
            return 'API key is required!';
          }
          if (!input.startsWith('AIza')) {
            return 'Invalid API key format. Should start with "AIza"';
          }
          return true;
        }
      }
    ]);
    
    // Test the API key
    const spinner = (await import('ora')).default('🧪 Testing API key...').start();
    
    try {
      const testClient = new GeminiClient(apiKey.trim());
      await testClient.validateApiKey();
      
      this.config.set('geminiApiKey', apiKey.trim());
      await this.config.save();
      
      spinner.succeed('✅ API key validated and saved!');
      console.log(chalk.green('🎉 You\'re all set! AI features are now available.'));
      console.log();
      
    } catch (error) {
      spinner.fail('❌ Invalid API key');
      console.log(chalk.red('Please check your API key and try again.'));
      process.exit(1);
    }
  }
}
