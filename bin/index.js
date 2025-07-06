#!/usr/bin/env node
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";
import { GenieApp } from "../src/app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to mimic `createSpinner()`
function createSpinner(text) {
  return ora(text);
}

// ASCII Art Banner
function displayBanner() {
  console.log(
    chalk.cyan.bold(
      figlet.textSync("GENIE CLI", {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  console.log(chalk.magenta("🎩✨ Your magical command-line assistant ✨🧞‍♂️"));
  console.log(chalk.gray("━".repeat(60)));
  console.log();
}

// Fun startup tips
const tips = [
  "💡 Tip: Use 'genie --chat' for interactive AI conversations!",
  "🚀 Tip: Try 'genie --codegen' to generate code snippets instantly!",
  "📝 Tip: Use 'genie --commitmsg' to generate perfect Git commit messages!",
  "🌍 Tip: Translate anything with 'genie --translate \"text\" --lang es'!",
  "🧹 Tip: Clean up your directory with 'genie --clean'!",
];

function showRandomTip() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  console.log(chalk.yellow(randomTip));
  console.log();
}

async function main() {
  try {
    displayBanner();
    showRandomTip();

    const spinner = createSpinner("🎩 Initializing Genie...").start(); // ✅ Like before
    const app = new GenieApp();
    await app.initialize();
    spinner.succeed("✨ Genie is ready!");
    console.log();

    const args = process.argv.slice(2);
    await app.run(args);
  } catch (error) {
    console.error(chalk.red("💥 Oops! Something went wrong:"));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

main();
