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
  console.log(
    "The output results will be saved in the same directory as the original file.\n"
  );

  // Encrypt the file using xcrypt
  try {
    await xcrypt({
      file: dirPath,
      key: key,
      credential: getCredential(),
      mode: "encrypt",
    });
  } catch (error) {
    console.error(chalk.red("Encryption failed:", error.message));
    process.exit(1);
  }
};
