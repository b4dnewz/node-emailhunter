#!/usr/bin/env node

/* tslint:disable:no-console */

import program from "commander";
import inquirer from "inquirer";
import EmailHunter from "../index";
import { handleResponse } from "./common";

const apiKey = process.env.HUNTERIO_KEY;

// Print single lead list result
const printLeadsList = (data) => {
  if (data.id) { console.log("LIST ID:".padEnd(12), data.id); }
  console.log("LIST NAME:".padEnd(12), data.name);
  console.log("LEADS COUNT:".padEnd(12), data.leads_count);
  if (data.team_id) { console.log("TEAM ID:".padEnd(12), data.team_id); }
  console.log("");
};

let hunter: EmailHunter;

// Ensure proper command name
program
  .name("email-hunter leads-list")
  .description("Saving and managing leads lists.");

// List all the account leads
program
  .command("list")
  .alias("ls")
  .description("List all the leads lists.")
  .option("-w, --write [name]", "Write the JSON result output to file.")
  .option("-l, --limit [number]", "A limit on the number of leads to be returned.", 20)
  .option("-o, --offset [number]", "The number of leads to skip.", 0)
  .action((options) => {
    hunter = new EmailHunter(apiKey);
    const { offset, limit } = options;
    hunter.leadsList.list({ offset, limit }, handleResponse);
  });

// Get informations for single leads-list by ID
program
  .command("retrieve <id>")
  .alias("get")
  .description("Retrieves all the informations of a leads list by ID.")
  .option("-w, --write [name]", "Write the JSON result output to file.")
  .action((id, options) => {
    hunter = new EmailHunter(apiKey);
    hunter.leadsList.retrieve(id, handleResponse);
  });

// Create a new leads-list into account
program
  .command("create [name]")
  .alias("new")
  .description("Creates a new leads list.")
  .action((name) => {
    hunter = new EmailHunter(apiKey);

    function create(opts) {
      hunter.leadsList.create(opts, handleResponse);
    }

    if (name) {
      return create({ name });
    }

    // Ask for arguments
    inquirer
      .prompt([
        {
          message: "The name of the leads list.",
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
  .action((ids) => {
    hunter = new EmailHunter(apiKey);
    ids.forEach((id) => {
      hunter.leadsList.delete(id, handleResponse);
    });
  });

// Update a leads-list by ID
program
  .command("update <id>")
  .alias("up")
  .description("Update the leads list informations by name.")
  .action((id) => {
    hunter = new EmailHunter(apiKey);
    inquirer
      .prompt([
        {
          message: "The new name of the leads list.",
          name: "name",
          type: "input",
          validate: (v) => v !== "",
        },
        {
          message: "The id of the team to share your leads with (must be your team).",
          name: "team_id",
          type: "input",
        },
      ])
      .then((answers) => {
        hunter.leadsList.update(id, answers, handleResponse);
      });
  });

program.parse(process.argv);
