import chalk from "chalk";
import figlet from "figlet";
import fs, { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";
import inquirer from "inquirer";
import Fuse from "fuse.js";

// Register autocomplete prompt
const { default: autocompletePrompt } = await import(
  "inquirer-autocomplete-prompt"
);
inquirer.registerPrompt("autocomplete", autocompletePrompt);

/**
 * Retrieves the current version of the application from package.json.
 */
export const getVersion = () => {
  // Get __dirname equivalent in ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Get package.json path
  const packageJsonPath = path.resolve(__dirname, "../package.json");

  // Read and parse
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  return packageJson.version;
};

/**
 * Draws the CLI logo using ASCII art.
 */
export const drawLogo = async () => {
  cleanUp();
  await figlet(
    "X-Crypt",
    {
      font: "Avatar",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 100,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        throw new Error(err);
      }

      console.info(chalk.green(data) + chalk.blueBright(` v${getVersion()}\n`));
      console.info(
        chalk.whiteBright(
          "A simple and secure file encryption and decryption tool.\n"
        )
      );
    }
  );
};

/**
 * Cleans up the console output.
 */
export const cleanUp = () => {
  if (process.stdout.isTTY) {
    process.stdout.write("\x1Bc");
  } else {
    console.clear();
  }
};

/**
 * Inputs and displays files in the current directory in a formatted manner.
 */
export const inputDirPath = async (filterExt = null) => {
  const files = fs
    .readdirSync(process.cwd())
    .filter(
      (file) =>
        fs.lstatSync(file).isFile() &&
        (filterExt ? file.endsWith(filterExt) : true)
    );

  const fuse = new Fuse(files, { threshold: 0.4 });

  const { fileName } = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "fileName",
      message: "Select a file (enter to autocomplete):",
      source: (_answersSoFar, input) => {
        input = input || "";
        const results = fuse.search(input);
        if (input === "") return files;
        return results.map((result) => result.item);
      },
    },
  ]);

  return fileName;
};

/**
 * Inputs the encryption/decryption key from the user.
 */
export const inputKey = async () => {
  const { key } = await inquirer.prompt([
    {
      type: "password",
      name: "key",
      message: "Enter your encryption/decryption key:",
      mask: "*",
      validate: (input) => {
        if (input.trim() === "") {
          return "Key cannot be empty.";
        }
        return true;
      },
    },
  ]);

  return key;
};
