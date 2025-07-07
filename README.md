
# 🎩 Genie CLI ✨

> _Your magical command-line assistant that combines developer utilities with AI superpowers!_

[![npm version](https://badge.fury.io/js/genie-assist.svg)](https://badge.fury.io/js/genie-asist)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

### 🛠️ Developer Utilities
- 📁 **File Operations** - List, search, and manage files
- 🌳 **Directory Tree** - Visualize project structure
- 🕐 **System Info** - Time, user, and system information
- 🧹 **Cleanup Tools** - Remove clutter files automatically
- 🚀 **Project Init** - Bootstrap new projects

### 🤖 AI-Powered Features
- 💬 **Interactive Chat** - Terminal-based AI conversations
- ✍️ **Text Summarization** - Summarize any text or file
- 🌍 **Translation** - Translate text to any language
- 💻 **Code Generation** - Generate code from descriptions
- 🐛 **Code Debugging** - Find and fix bugs automatically
- 📝 **Git Commit Messages** - Generate perfect commit messages
- 📚 **Documentation** - Auto-generate code documentation
- 💡 **Idea Generation** - Creative ideas for any project
- 🎨 **Creative Writing** - Poems, emails, and more

## 📦 Installation

```bash
# Install globally
npm install -g genie-assist

# Or use without installing
npx genie-assist
```

## 🔧 Setup

On first run, Genie will ask for your Google Gemini API key:

1. Get your free API key at [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Run `genie` and paste your API key when prompted
3. Start using AI features immediately!

## 🎯 Usage

### Interactive Mode
```bash
genie
```
Launch the interactive menu to explore all features.

### Direct Commands

#### 🛠️ Basic Utilities
```bash
genie --ls                    # List files
genie --tree                  # Show directory tree
genie --time                  # Current time
genie --whoami               # System info
genie --find "*.js"          # Find files
genie --clean                # Remove clutter
genie --init                 # Create README
```

#### 🤖 AI Features
```bash
genie --chat                               # Start AI chat
genie --summarize "Your text here"        # Summarize text
genie --explain "quantum computing"       # Explain concepts
genie --translate "Hello" --lang es       # Translate text
genie --codegen "React login form"        # Generate code
genie --debug "your code here"            # Debug code
genie --commitmsg                         # Generate commit message
genie --docs "function code"              # Generate docs
genie --summarize-file README.md          # Summarize file
genie --idea --type startup               # Generate ideas
genie --poem "ocean sunset"               # Write poetry
genie --email "meeting request"           # Generate emails
```

## 🎨 Examples

### Generate Code
```bash
genie --codegen "Express.js API with authentication"
```

### Debug Code
```bash
genie --debug "
function factorial(n) {
  if (n = 1) return 1;
  return n * factorial(n - 1);
}
"
```

### Smart Commit Messages
```bash
git add .
genie --commitmsg
# Output: "feat: add user authentication with JWT tokens"
```

### File Summarization
```bash
genie --summarize-file package.json
# Get AI insights about your project dependencies
```

## 🔧 Configuration

Genie stores its configuration in:
- **macOS/Linux**: `~/.config/genie-assist/config.json`
- **Windows**: `%APPDATA%/genie-assist/config.json`

### Reset Configuration
```bash
rm ~/.config/genie-assist/config.json  # Unix
# Or delete the config file on Windows
```

## 🌟 AI Models

Genie uses **Google Gemini 1.5 Flash** for all AI features:
- ⚡ Ultra-fast responses
- 🆓 Free tier available
- 🧠 Advanced reasoning capabilities
- 🌐 Multilingual support

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup
```bash
git clone https://github.com/your-username/genie-assist.git
cd genie-assist
npm install
npm run dev
```

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for powering our AI features
- **Chalk** for beautiful terminal colors
- **Inquirer** for interactive prompts
- **Figlet** for ASCII art magic

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/genie-assist)
- [GitHub Repository](https://github.com/keshavgarg24/genie-assist)
- [Google AI Studio](https://aistudio.google.com/app/apikey)

---

<div align="center">

**Made to ease out daily tasks - It is an open sourced project and your contributions are highly appreciated**

_Star ⭐ this repo if you find it helpful!_
