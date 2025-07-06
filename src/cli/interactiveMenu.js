
import chalk from 'chalk';

export class InteractiveMenu {
  async show(commandExecutor) {
    const { default: inquirer } = await import('inquirer');
    
    console.log(chalk.cyan('🎩 What would you like to do?'));
    console.log();

    const choices = [
      { name: '📁 List files (ls)', value: 'ls' },
      { name: '🌳 Show directory tree', value: 'tree' },
      { name: '🕐 Show current time', value: 'time' },
      { name: '👤 System information', value: 'whoami' },
      { name: '🔍 Find files', value: 'find' },
      { name: '🧹 Clean directory', value: 'clean' },
      { name: '🚀 Initialize project', value: 'init' },
      new inquirer.Separator('━━━ AI Features ━━━'),
      { name: '💬 Start AI chat', value: 'chat' },
      { name: '✍️ Summarize text', value: 'summarize' },
      { name: '💡 Explain concept', value: 'explain' },
      { name: '🌍 Translate text', value: 'translate' },
      { name: '📧 Generate email', value: 'email' },
      { name: '💻 Generate code', value: 'codegen' },
      { name: '🐛 Debug code', value: 'debug' },
      { name: '📝 Generate commit message', value: 'commitmsg' },
      { name: '📚 Generate documentation', value: 'docs' },
      { name: '📄 Summarize file', value: 'summarize-file' },
      { name: '💡 Generate ideas', value: 'idea' },
      { name: '🎨 Write poem', value: 'poem' },
      new inquirer.Separator(),
      { name: '🚪 Exit', value: 'exit' }
    ];

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices,
        pageSize: 20
      }
    ]);

    if (action === 'exit') {
      console.log(chalk.cyan('👋 Thanks for using Genie CLI!'));
      return;
    }

    await this.handleMenuAction(action, commandExecutor, inquirer);
  }

  async handleMenuAction(action, commandExecutor, inquirer) {
    switch (action) {
      case 'find':
        const { pattern } = await inquirer.prompt([
          { type: 'input', name: 'pattern', message: '🔍 Enter search pattern:' }
        ]);
        await commandExecutor.execute({ find: pattern });
        break;

      case 'summarize':
        const { text } = await inquirer.prompt([
          { type: 'input', name: 'text', message: '✍️ Enter text to summarize:' }
        ]);
        await commandExecutor.execute({ summarize: text });
        break;

      case 'explain':
        const { concept } = await inquirer.prompt([
          { type: 'input', name: 'concept', message: '💡 What concept to explain:' }
        ]);
        await commandExecutor.execute({ explain: concept });
        break;

      case 'translate':
        const { translateText, lang } = await inquirer.prompt([
          { type: 'input', name: 'translateText', message: '🌍 Enter text to translate:' },
          { type: 'input', name: 'lang', message: '🌍 Target language (e.g., es, fr, de):', default: 'es' }
        ]);
        await commandExecutor.execute({ translate: translateText, lang });
        break;

      case 'email':
        const { emailPrompt } = await inquirer.prompt([
          { type: 'input', name: 'emailPrompt', message: '📧 Describe the email to generate:' }
        ]);
        await commandExecutor.execute({ email: emailPrompt });
        break;

      case 'codegen':
        const { codePrompt } = await inquirer.prompt([
          { type: 'input', name: 'codePrompt', message: '💻 Describe the code to generate:' }
        ]);
        await commandExecutor.execute({ codegen: codePrompt });
        break;

      case 'debug':
        const { code } = await inquirer.prompt([
          { type: 'editor', name: 'code', message: '🐛 Paste your code to debug:' }
        ]);
        await commandExecutor.execute({ debug: code });
        break;

      case 'summarize-file':
        const { filePath } = await inquirer.prompt([
          { type: 'input', name: 'filePath', message: '📄 Enter file path to summarize:' }
        ]);
        await commandExecutor.execute({ 'summarize-file': filePath });
        break;

      case 'idea':
        const { ideaType } = await inquirer.prompt([
          { 
            type: 'list', 
            name: 'ideaType', 
            message: '💡 What type of ideas?',
            choices: ['startup', 'app', 'content', 'business', 'creative', 'general']
          }
        ]);
        await commandExecutor.execute({ idea: true, type: ideaType });
        break;

      case 'poem':
        const { theme } = await inquirer.prompt([
          { type: 'input', name: 'theme', message: '🎨 Enter poem theme or style:' }
        ]);
        await commandExecutor.execute({ poem: theme });
        break;

      default:
        await commandExecutor.execute({ [action]: true });
    }

    // Ask if user wants to continue
    console.log();
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: '🎩 Would you like to do something else?',
        default: true
      }
    ]);

    if (shouldContinue) {
      console.log();
      await this.show(commandExecutor);
    } else {
      console.log(chalk.cyan('👋 Thanks for using Genie CLI!'));
    }
  }
}
