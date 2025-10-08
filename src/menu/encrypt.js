import { circles_5, initLoader } from "cli-loaders";
import chalk from "chalk";
import xcrypt from "../xcrypt.js";
import { getCredential, inputDirPath, inputKey } from "./../ui.js";

/**
 * Handles the encryption process by prompting the user for a file path and key,
 */
export default async () => {
  const dirPath = await inputDirPath();
  const key = await inputKey();

  console.log("\nSelected file for encryption:", dirPath);
  console.log("Starting encryption process...\n");

  // Initialize the loader
  initLoader(circles_5);

  // Encrypt the file using xcrypt
  try {
    const { outputPath } = await xcrypt({
      file: dirPath,
      key: key,
      credential: getCredential(),
      mode: "encrypt",
    });

    console.log(
      chalk.green(
        `Encryption successful! Encrypted file saved at: ${outputPath}\n`
      )
    );
  } catch (error) {
    console.error(chalk.red("Encryption failed:", error.message));
    process.exit(1);
  }
};
