import { readFile } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

export class AICommands {
  constructor(geminiClient) {
    this.gemini = geminiClient;
  }

  async summarize(text) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora('✍️ Summarizing...').start();
    try {
      const prompt = `Please provide a concise summary of the following text:\n\n${text}`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed('✍️ Summary:');
      console.log(chalk.cyan(response));
    } catch (error) {
      spinner.fail('❌ Failed to summarize');
      console.error(chalk.red(error.message));
    }
  }

  async explain(concept) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora('💡 Thinking...').start();
    try {
      const prompt = `Please explain the following concept with examples:\n\n${concept}`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed('💡 Explanation:');
      console.log(chalk.cyan(response));
    } catch (error) {
      spinner.fail('❌ Failed to explain');
      console.error(chalk.red(error.message));
    }
  }

  async translate(text, targetLang) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora(`🌍 Translating to ${targetLang}...`).start();
    try {
      const prompt = `Translate the following text to ${targetLang}:\n\n${text}`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed(`🌍 Translation (${targetLang}):`);
      console.log(chalk.green(`Original: ${text}`));
      console.log(chalk.cyan(`Translation: ${response}`));
    } catch (error) {
      spinner.fail('❌ Failed to translate');
      console.error(chalk.red(error.message));
    }
  }

  async startChat() {
    if (!this.gemini) return this.noApiKey();

    const { default: inquirer } = await import('inquirer');
    console.log(chalk.cyan('💬 Starting AI Chat Mode'));
    console.log(chalk.gray('Type "exit" or "quit" to end the conversation'));
    console.log(chalk.gray('━'.repeat(50)));

    try {
      const chat = await this.gemini.startChat();

      while (true) {
        const { message } = await inquirer.prompt([
          {
            type: 'input',
            name: 'message',
            message: chalk.blue('You:')
          }
        ]);

        if (['exit', 'quit'].includes(message.toLowerCase())) {
          console.log(chalk.cyan('👋 Chat ended. Thanks for using Genie!'));
          break;
        }

        const spinner = ora('🤖 Genie is thinking...').start();
        try {
          const result = await chat.sendMessage(message);
          const text = (await result.response).text();
          spinner.stop();
          console.log(chalk.magenta('🧞‍♂️ Genie:'), chalk.white(text));
        } catch (err) {
          spinner.fail('❌ Failed to get response');
          console.error(chalk.red(err.message));
        }
      }
    } catch (error) {
      console.error(chalk.red('❌ Failed to start chat:'), error.message);
    }
  }

  async generateEmail(prompt) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora('📧 Generating email...').start();
    try {
      const fullPrompt = `Generate a professional email based on this request: ${prompt}\n\nPlease include:\n- Subject line\n- Greeting\n- Body\n- Closing`;
      const response = await this.gemini.generateContent(fullPrompt);
      spinner.succeed('📧 Generated Email:');
      console.log(chalk.cyan(response));
    } catch (error) {
      spinner.fail('❌ Failed to generate email');
      console.error(chalk.red(error.message));
    }
  }

  async generateCode(description) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora('💻 Generating code...').start();
    try {
      const prompt = `Generate clean, well-commented code for: ${description}\nInclude syntax highlighting, comments, best practices, and example usage if applicable.`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed('💻 Generated Code:');
      console.log(chalk.cyan(response));
    } catch (error) {
      spinner.fail('❌ Failed to generate code');
      console.error(chalk.red(error.message));
    }
  }

  async debugCode(code) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora('🐛 Analyzing code...').start();
    try {
      const prompt = `Analyze this code for bugs and improvements:\n\n${code}`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed('🐛 Code Analysis:');
      console.log(chalk.cyan(response));
    } catch (error) {
      spinner.fail('❌ Failed to debug code');
      console.error(chalk.red(error.message));
    }
  }

  async generateCommitMessage() {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora('📝 Analyzing git changes...').start();
    try {
      const gitDiff = execSync('git diff --cached', { encoding: 'utf8' });
      if (!gitDiff.trim()) {
        spinner.warn('⚠️ No staged changes. Use: git add <file>');
        return;
      }

      const prompt = `Generate a conventional commit message based on this diff:\n\n${gitDiff}`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed('📝 Suggested Commit Message:');
      console.log(chalk.green(response));
    } catch (error) {
      spinner.fail(error.message.includes('not a git repository') ? '❌ Not a git repository' : '❌ Failed to generate commit message');
      console.error(chalk.red(error.message));
    }
  }

  async generateDocumentation(code) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora('📚 Generating documentation...').start();
    try {
      const prompt = `Generate documentation for the following code:\n\n${code}`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed('📚 Generated Documentation:');
      console.log(chalk.cyan(response));
    } catch (error) {
      spinner.fail('❌ Failed to generate documentation');
      console.error(chalk.red(error.message));
    }
  }

  async summarizeFile(filePath) {
    if (!this.gemini) return this.noApiKey();

    const spinner = ora(`📄 Summarizing ${filePath}...`).start();
    try {
      const content = await readFile(filePath, 'utf8');
      const prompt = `Summarize the contents of this file:\n\n${content}`;
      const response = await this.gemini.generateContent(prompt);
      spinner.succeed(`📄 Summary of ${filePath}:`);
      console.log(chalk.cyan(response));
    } catch (error) {
      spinner.fail('❌ Failed to summarize file');
      console.error(chalk.red(error.message));
    }
  }

  noApiKey() {
    console.log(chalk.red('❌ AI features require Gemini API key setup'));
  }
}
