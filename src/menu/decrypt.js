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
  console.log(
    "The output results will be saved in the same directory as the original file.\n"
  );

  // Decrypt the file using xcrypt
  try {
    await xcrypt({
      file: dirPath,
      key: key,
      credential: getCredential(),
      mode: "decrypt",
    });
  } catch (error) {
    console.error(chalk.red("Decryption failed:", error.message));
    process.exit(1);
  }
};
