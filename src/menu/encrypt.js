import { inputDirPath, inputKey } from "./../ui.js";

export default async () => {
  const dirPath = await inputDirPath();
  const key = await inputKey();

  // Spawan a child process to handle encryption
  console.log("\nSelected file for encryption:", dirPath);

  process.argv.push(`--file=${dirPath}`);
  process.argv.push(`--key=${key}`);
  process.argv.push(`--mode=encrypt`);

  console.log("Starting encryption process...\n");
  console.log("The output results will be saved in the same directory as the original file.\n");

  // Dynamic import xcrypt module
  await import("../xcrypt.cjs");
};
