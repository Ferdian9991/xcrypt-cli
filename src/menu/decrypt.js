import { inputDirPath, inputKey } from "./../ui.js";

export default async () => {
  const dirPath = await inputDirPath("xcrypt");
  const key = await inputKey();

  // Spawan a child process to handle decryption
  console.log("\nSelected file for decryption:", dirPath);

  process.argv.push(`--file=${dirPath}`);
  process.argv.push(`--key=${key}`);
  process.argv.push(`--mode=decrypt`);

  console.log("Starting decryption process...\n");
  console.log(
    "The output results will be saved in the same directory as the original file.\n"
  );

  // Dynamic import xcrypt module
  await import("../xcrypt.cjs");
};
