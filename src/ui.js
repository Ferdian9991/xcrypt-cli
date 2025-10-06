import chalk from "chalk";
import figlet from "figlet";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
