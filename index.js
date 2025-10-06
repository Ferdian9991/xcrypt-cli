#!/usr/bin/env node

import inquirer from "inquirer";
import { drawLogo } from "./src/ui.js";
import encrypt from "./src/menu/encrypt.js";
import decrypt from "./src/menu/decrypt.js";

const MENU_ENCRYPT = "Encrypt File";
const MENU_DECRYPT = "Decrypt File";
const MENU_EXIT = "← Exit";

const EXIT_TRIGGERED_BY_USER = "exit_triggered_by_user";
const EXIT_TRIGERRED_BY_DEFAULT = "exit_triggered_by_default";

let state = null;

const optionTools = [
  {
    type: "list",
    name: "SELECTED_MENU",
    message: "Please choose menu option:",
    choices: [MENU_ENCRYPT, MENU_DECRYPT, MENU_EXIT],
  },
];

const main = async () => {
  await drawLogo();

  while (true) {
    let choices = await inquirer.prompt(optionTools);

    switch (choices.SELECTED_MENU) {
      case MENU_ENCRYPT:
        await drawLogo();
        await encrypt();
        state = EXIT_TRIGERRED_BY_DEFAULT;
        process.exit(0);
      case MENU_DECRYPT:
        await drawLogo();
        await decrypt();
        state = EXIT_TRIGERRED_BY_DEFAULT;
        process.exit(0);
      case MENU_EXIT:
        state = EXIT_TRIGGERED_BY_USER;
        process.exit(0);
    }
  }
};

/**
 * Handles cleanup on exit.
 */
const exitHandler = (options) => {
  if (state === EXIT_TRIGGERED_BY_USER) {
    console.log("\nThank you for using X-Crypt. Goodbye!\n");
  }
  if (options.exit) process.exit();
};

process.on("exit", exitHandler.bind(null, { cleanup: true }));

// Execute main function
main();
