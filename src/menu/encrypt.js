import chalk from "chalk";
import { getCredential, inputDirPath, inputKey } from "./../ui.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

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

  // Get __dirname in ES module scope
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Get absolute path to xcrypt.js
  const xcryptPath = path.resolve(__dirname, "../../src/xcrypt.cjs");

  // Prepare arguments for the xcrypt process
  const args = [
    xcryptPath,
    "--file",
    dirPath,
    "--key",
    key,
    "--credential",
    getCredential(),
    "--mode",
    "encrypt",
  ];

  // Spawn a child process to run the xcrypt script
  const child = spawn("node", args, { stdio: "inherit" });

  // Wait for the child process to complete
  await new Promise((resolve, reject) => {
    child.on("close", (code) => {
      if (code === 0) {
        console.log(chalk.green("Encryption process completed successfully!"));
        resolve();
      } else {
        reject(new Error(`xcrypt process exited with code ${code}`));
      }
    });
  });
};
