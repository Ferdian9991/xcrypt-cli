import chalk from "chalk";
import { inputDirPath, inputKey } from "./../ui.js";
import { spawn } from "child_process";
import path from "path";

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

  // Get absolute path to xcrypt.js
  const xcryptPath = path.resolve("src/xcrypt.cjs");

  // Prepare arguments for the xcrypt process
  const args = [
    xcryptPath,
    "--file",
    dirPath,
    "--key",
    key,
    "--mode",
    "decrypt",
  ];

  // Spawn a child process to run the xcrypt script
  const child = spawn("node", args, { stdio: "inherit" });

  // Wait for the child process to complete
  await new Promise((resolve, reject) => {
    child.on("close", (code) => {
      if (code === 0) {
        console.log(chalk.green("Decryption process completed successfully!"));
        resolve();
      } else {
        reject(new Error(`xcrypt process exited with code ${code}`));
      }
    });
  });
};
