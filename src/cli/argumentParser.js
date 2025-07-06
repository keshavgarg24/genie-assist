
export class ArgumentParser {
  parse(args) {
    const parsed = {};
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg.startsWith('--')) {
        const key = arg.slice(2);
        const nextArg = args[i + 1];
        
        // Check if next argument is a value (not a flag)
        if (nextArg && !nextArg.startsWith('--')) {
          parsed[key] = nextArg;
          i++; // Skip next argument as it's consumed as value
        } else {
          parsed[key] = true;
        }
      } else if (arg.startsWith('-')) {
        // Single letter flags
        const key = arg.slice(1);
        parsed[key] = true;
      } else {
        // Positional argument
        if (!parsed._positional) {
          parsed._positional = [];
        }
        parsed._positional.push(arg);
      }
    }
    
    return parsed;
  }

  getUsage() {
    return `
🎩 Genie CLI Usage:

📚 Basic Utilities:
  --ls                    List files in current directory
  --tree                  Show directory tree structure
  --time                  Display current date and time
  --whoami                Show system and user information
  --find <filename>       Search for files
  --clean                 Remove clutter files (.DS_Store, *.log, etc.)
  --init                  Initialize project with README

🤖 AI Features (requires Gemini API key):
  --summarize <text>      Summarize text or content
  --explain <concept>     Explain complex concepts
  --translate <text> --lang <code>  Translate text
  --chat                  Interactive chat mode
  --email <prompt>        Generate emails
  --codegen <description> Generate code snippets
  --debug <code>          Find and fix bugs
  --commitmsg             Generate Git commit messages
  --docs <code>           Generate documentation
  --summarize-file <path> Summarize file contents
  --idea --type <type>    Generate creative ideas
  --poem <theme>          Write poems or lyrics

🔧 Options:
  --help, -h              Show this help message
  --version, -v           Show version information

Examples:
  genie --translate "Hello world" --lang es
  genie --codegen "React form with validation"
  genie --summarize-file README.md
  genie --idea --type startup
    `;
  }
}
