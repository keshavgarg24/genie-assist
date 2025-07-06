
import { BasicCommands } from './basicCommands.js';
import { AICommands } from '../ai/aiCommands.js';
import { ArgumentParser } from './argumentParser.js';
import chalk from 'chalk';

export class CommandExecutor {
  constructor(geminiClient, config) {
    this.basicCommands = new BasicCommands();
    this.aiCommands = new AICommands(geminiClient);
    this.argumentParser = new ArgumentParser();
    this.config = config;
  }

  async execute(args) {
    // Handle help
    if (args.help || args.h) {
      console.log(this.argumentParser.getUsage());
      return;
    }

    // Handle version
    if (args.version || args.v) {
      console.log(chalk.cyan('🎩 Genie CLI v1.0.0'));
      return;
    }

    // Basic Commands
    if (args.ls) {
      await this.basicCommands.listFiles();
      return;
    }

    if (args.tree) {
      await this.basicCommands.showTree();
      return;
    }

    if (args.time) {
      await this.basicCommands.showTime();
      return;
    }

    if (args.whoami) {
      await this.basicCommands.showUserInfo();
      return;
    }

    if (args.find) {
      await this.basicCommands.findFiles(args.find);
      return;
    }

    if (args.clean) {
      await this.basicCommands.cleanDirectory();
      return;
    }

    if (args.init) {
      await this.basicCommands.initProject();
      return;
    }

    // AI Commands
    if (args.summarize) {
      await this.aiCommands.summarize(args.summarize);
      return;
    }

    if (args.explain) {
      await this.aiCommands.explain(args.explain);
      return;
    }

    if (args.translate) {
      const lang = args.lang || 'es';
      await this.aiCommands.translate(args.translate, lang);
      return;
    }

    if (args.chat) {
      await this.aiCommands.startChat();
      return;
    }

    if (args.email) {
      await this.aiCommands.generateEmail(args.email);
      return;
    }

    if (args.codegen) {
      await this.aiCommands.generateCode(args.codegen);
      return;
    }

    if (args.debug) {
      await this.aiCommands.debugCode(args.debug);
      return;
    }

    if (args.commitmsg) {
      await this.aiCommands.generateCommitMessage();
      return;
    }

    if (args.docs) {
      await this.aiCommands.generateDocumentation(args.docs);
      return;
    }

    if (args['summarize-file']) {
      await this.aiCommands.summarizeFile(args['summarize-file']);
      return;
    }

    if (args.idea) {
      const type = args.type || 'general';
      await this.aiCommands.generateIdea(type);
      return;
    }

    if (args.poem) {
      await this.aiCommands.writePoem(args.poem);
      return;
    }

    // If no command matched, show help
    console.log(chalk.yellow('🤔 Command not recognized. Here\'s what you can do:'));
    console.log(this.argumentParser.getUsage());
  }
}
