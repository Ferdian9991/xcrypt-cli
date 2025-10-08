import { circles_5, initLoader } from "cli-loaders";
import chalk from "chalk";
import xcrypt from "../xcrypt.js";
import { getCredential, inputDirPath, inputKey } from "./../ui.js";

/**
 * Handles the decryption process by prompting the user for a file path and key,
 */
export default async () => {
  const dirPath = await inputDirPath("xcrypt");
  const key = await inputKey();

  console.log("\nSelected file for decryption:", dirPath);
  console.log("Starting decryption process...\n");

  // Initialize the loader
  initLoader(circles_5);

  // Decrypt the file using xcrypt
  try {
    const { outputPath } = await xcrypt({
      file: dirPath,
      key: key,
      credential: getCredential(),
      mode: "decrypt",
    });

    console.log(
      chalk.green(
        `Decryption successful! Decrypted file saved at: ${outputPath}\n`
      )
    );
  } catch (error) {
    console.error(chalk.red("Decryption failed:", error.message));
    process.exit(1);
  }
};
