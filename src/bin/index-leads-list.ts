#!/usr/bin/env node

/* tslint:disable:no-console */

import program from "commander";
import inquirer from "inquirer";
import EmailHunter from "../index";
import { handleResponse } from "./common";

let hunter: EmailHunter;

program
  .name("email-hunter leads-list")
  .description("Saving and managing leads lists.")
  .option("--api-key <key>", "Set the Hunter.io API key", process.env.HUNTERIO_KEY);

// List all the account leads
program
  .command("list")
  .alias("ls")
  .description("List all the leads lists.")
  .option("-l, --limit [number]", "A limit on the number of leads to be returned.", 20)
  .option("-o, --offset [number]", "The number of leads to skip.", 0)
  .action((options) => {
    const { parent, offset, limit } = options;
    hunter = new EmailHunter(parent.apiKey);
    hunter.leadsList.list({ offset, limit }, handleResponse);
  });

// Get informations for single leads-list by ID
program
  .command("retrieve <id>")
  .alias("get")
  .description("Retrieves all the informations of a leads list by ID.")
  .action((id, { parent }) => {
    hunter = new EmailHunter(parent.apiKey);
    hunter.leadsList.retrieve(id, handleResponse);
  });

// Create a new leads-list into account
program
  .command("create [name]")
  .alias("new")
  .description("Creates a new leads list.")
  .action((name, { parent }) => {
    hunter = new EmailHunter(parent.apiKey);

    function create(opts) {
      hunter.leadsList.create(opts, handleResponse);
    }

    if (name) {
      return create({ name });
    }

    inquirer
      .prompt([
        {
          message: "Enter the name of the leads list.",
          name: "name",
          type: "input",
          validate: (v) => v !== "",
        },
      ])
      .then((answers) => {
        create(answers);
      });
  });

// Delete a leads-list by ID
program
  .command("remove <ids...>")
  .alias("rm")
  .description("Delete one or more leads list by ID.")
  .action((ids, { parent }) => {
    hunter = new EmailHunter(parent.apiKey);
    ids.forEach((id) => {
      hunter.leadsList.delete(id, handleResponse);
    });
  });

// Update a leads-list by ID
program
  .command("update <id>")
  .alias("up")
  .description("Update the leads list informations by name.")
  .action((id, { parent }) => {
    hunter = new EmailHunter(parent.apiKey);
    inquirer
      .prompt([
        {
          message: "Enter the new name of the leads list.",
          name: "name",
          type: "input",
          validate: (v) => v !== "",
        },
        {
          message: "The id of the team to share your leads with. (optional)",
          name: "team_id",
          type: "input",
        },
      ])
      .then((answers) => {
        hunter.leadsList.update(id, answers, handleResponse);
      });
  });

program.parse(process.argv);
