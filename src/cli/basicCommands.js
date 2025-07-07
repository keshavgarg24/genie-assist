import { readdir, stat, readFile, writeFile, unlink } from 'fs/promises';
import { join, extname } from 'path';
import { execSync } from 'child_process';
import os from 'os';
import chalk from 'chalk';
import ora from 'ora';

export class BasicCommands {
  async listFiles() {
    const spinner = ora('📁 Reading directory...').start();

    try {
      const files = await readdir('.');
      const fileStats = await Promise.all(
        files.map(async (file) => {
          const stats = await stat(file);
          return {
            name: file,
            isDirectory: stats.isDirectory(),
            size: stats.size,
            modified: stats.mtime
          };
        })
      );

      spinner.succeed('📁 Directory contents:');
      console.log();

      fileStats.forEach(file => {
        const icon = file.isDirectory ? '📂' : this.getFileIcon(file.name);
        const size = file.isDirectory ? '' : this.formatFileSize(file.size);
        const date = file.modified.toLocaleDateString();

        console.log(`${icon} ${chalk.cyan(file.name)} ${chalk.gray(size)} ${chalk.yellow(date)}`);
      });

    } catch (error) {
      spinner.fail('❌ Failed to read directory');
      console.error(chalk.red(error.message));
    }
  }

  async showTree(dir = '.', level = 0, maxLevel = 3) {
    if (level === 0) {
      console.log('🌳 Directory Tree:');
      console.log();
    }

    if (level > maxLevel) return;

    try {
      const files = await readdir(dir);
      const indent = '  '.repeat(level);

      for (const file of files) {
        if (file.startsWith('.') && level === 0) continue;

        const filePath = join(dir, file);
        const stats = await stat(filePath);
        const icon = stats.isDirectory() ? '📂' : this.getFileIcon(file);

        console.log(`${indent}${level > 0 ? '├── ' : ''}${icon} ${file}`);

        if (stats.isDirectory() && level < maxLevel) {
          await this.showTree(filePath, level + 1, maxLevel);
        }
      }
    } catch (error) {
      console.error(chalk.red(`Error reading ${dir}: ${error.message}`));
    }
  }

  async showTime() {
    const now = new Date();
    const spinner = ora('🕐 Getting current time...').start();

    setTimeout(() => {
      spinner.succeed('🕐 Current Time:');
      console.log();
      console.log(`📅 Date: ${chalk.cyan(now.toLocaleDateString())}`);
      console.log(`⏰ Time: ${chalk.cyan(now.toLocaleTimeString())}`);
      console.log(`🌍 Timezone: ${chalk.yellow(Intl.DateTimeFormat().resolvedOptions().timeZone)}`);
      console.log(`📊 Unix Timestamp: ${chalk.gray(Math.floor(now.getTime() / 1000))}`);
    }, 500);
  }

  async showUserInfo() {
    const spinner = ora('👤 Gathering system info...').start();

    try {
      const userInfo = {
        username: os.userInfo().username,
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        homeDir: os.homedir(),
        nodeVersion: process.version,
        totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
        freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB'
      };

      spinner.succeed('👤 System Information:');
      console.log();
      console.log(`👤 User: ${chalk.cyan(userInfo.username)}`);
      console.log(`💻 Hostname: ${chalk.cyan(userInfo.hostname)}`);
      console.log(`🖥️  Platform: ${chalk.cyan(userInfo.platform)} (${userInfo.arch})`);
      console.log(`🏠 Home: ${chalk.gray(userInfo.homeDir)}`);
      console.log(`🟢 Node.js: ${chalk.green(userInfo.nodeVersion)}`);
      console.log(`💾 Memory: ${chalk.yellow(userInfo.freeMemory)} free / ${userInfo.totalMemory} total`);

    } catch (error) {
      spinner.fail('❌ Failed to get system info');
      console.error(chalk.red(error.message));
    }
  }

  async findFiles(pattern) {
    const spinner = ora(`🔍 Searching for "${pattern}"...`).start();

    try {
      const results = await this.searchFiles('.', pattern);

      if (results.length === 0) {
        spinner.warn(`🔍 No files found matching "${pattern}"`);
        return;
      }

      spinner.succeed(`🔍 Found ${results.length} file(s) matching "${pattern}":`);
      console.log();

      results.forEach(file => {
        const icon = this.getFileIcon(file);
        console.log(`${icon} ${chalk.cyan(file)}`);
      });

    } catch (error) {
      spinner.fail('❌ Search failed');
      console.error(chalk.red(error.message));
    }
  }

  async searchFiles(dir, pattern, results = []) {
    const files = await readdir(dir);

    for (const file of files) {
      if (file.startsWith('.')) continue;

      const filePath = join(dir, file);
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        await this.searchFiles(filePath, pattern, results);
      } else if (file.toLowerCase().includes(pattern.toLowerCase())) {
        results.push(filePath);
      }
    }

    return results;
  }

  async cleanDirectory() {
    const spinner = ora('🧹 Cleaning directory...').start();

    const clutterPatterns = [
      '.DS_Store',
      'Thumbs.db',
      '*.log',
      '*.tmp',
      '*~',
      '.*.swp'
    ];

    let deletedCount = 0;

    try {
      const files = await readdir('.');

      for (const file of files) {
        const shouldDelete = clutterPatterns.some(pattern => {
          if (pattern.includes('*')) {
            const regex = new RegExp(pattern.replace('*', '.*'));
            return regex.test(file);
          }
          return file === pattern;
        });

        if (shouldDelete) {
          await unlink(file);
          deletedCount++;
          console.log(`${chalk.red('🗑️')} Deleted: ${file}`);
        }
      }

      if (deletedCount === 0) {
        spinner.succeed('✨ Directory is already clean!');
      } else {
        spinner.succeed(`🧹 Cleaned ${deletedCount} clutter file(s)!`);
      }

    } catch (error) {
      spinner.fail('❌ Failed to clean directory');
      console.error(chalk.red(error.message));
    }
  }

  async initProject() {
    const spinner = ora('🚀 Initializing project...').start();

    const readmeContent = `# New Project

Welcome to your new project! 🎉

## Getting Started

This project was initialized by Genie CLI.

## Features

- [ ] Add your features here
- [ ] Update this README
- [ ] Start coding!

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

Generated with ❤️ by [Genie CLI](https://github.com/keshavgarg24/genie-assist)
`;

    try {
      await writeFile('README.md', readmeContent);
      spinner.succeed('🚀 Project initialized with README.md!');
      console.log();
      console.log(chalk.green('✅ Created: README.md'));
      console.log(chalk.yellow('💡 Next steps: Edit README.md and start building!'));

    } catch (error) {
      spinner.fail('❌ Failed to initialize project');
      console.error(chalk.red(error.message));
    }
  }

  getFileIcon(filename) {
    const ext = extname(filename).toLowerCase();
    const iconMap = {
      '.js': '📜',
      '.ts': '📘',
      '.json': '📋',
      '.md': '📝',
      '.txt': '📄',
      '.html': '🌐',
      '.css': '🎨',
      '.png': '🖼️',
      '.jpg': '🖼️',
      '.jpeg': '🖼️',
      '.gif': '🖼️',
      '.pdf': '📕',
      '.zip': '📦',
      '.tar': '📦',
      '.gz': '📦'
    };

    return iconMap[ext] || '📄';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
