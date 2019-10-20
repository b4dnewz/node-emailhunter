#!/usr/bin/env node

/* tslint:disable:no-console */

import program from "commander";
import inquirer from "inquirer";
import EmailHunter from "../index";
import { handleResponse } from "./common";

let hunter: EmailHunter;

program
  .name("email-hunter leads")
  .description("Saving and managing leads")
  .option("--api-key <key>", "Set the Hunter.io API key", process.env.HUNTERIO_KEY);

/**
 * Returns all the leads already saved in your account.
 * The leads are returned in sorted order, with the most recent leads appearing first.
 * @see: https://hunter.io/api/docs#list-leads
 */
program
  .command("list")
  .alias("ls")
  .description("List all the leads")
  .option("-l, --limit [number]", "A limit on the number of leads to be returned.", 20)
  .option("-o, --offset [number]", "The number of leads to skip.", 0)
  .action(({ options }) => {
    const { apiKey, offset, limit } = options;
    hunter = new EmailHunter(apiKey);
    hunter.leads.list(
      {
        limit,
        offset,
      },
      handleResponse,
    );
  });

/**
 * Retrieves all the fields of a lead.
 * @see: https://hunter.io/api/docs#get-lead
 */
program
  .command("retrieve <id>")
  .alias("get")
  .description("Retrieves all the informations of a lead by ID.")
  .action((id, { apiKey }) => {
    hunter = new EmailHunter(apiKey);
    hunter.leads.retrieve(id, handleResponse);
  });

/**
 * Creates a new lead.
 * @see: https://hunter.io/api/docs#create-lead
 */
program
  .command("create [email]")
  .alias("new")
  .description("Creates a new lead.")
  .action((email, { apiKey }) => {
    hunter = new EmailHunter(apiKey);

    function create(opts) {
      hunter.leads.create(opts, handleResponse);
    }

    // If email argument was used
    if (email) {
      return create({
        email,
      });
    }

    // Ask for lead properties
    inquirer
      .prompt([
        {
          message: "The email address of the lead.",
          name: "email",
          type: "input",
          validate: (v) => v !== "",
        },
        {
          message: "The first name of the leads. (optional)",
          name: "first_name",
          type: "input",
        },
        {
          message: "The last name of the lead. (optional)",
          name: "last_name",
          type: "input",
        },
        {
          message: "The name of the company the lead is working in. (optional)",
          name: "company",
          type: "input",
        },
        {
          message: "Personal notes about the lead. (optional)",
          name: "notes",
          type: "input",
        },
        {
          message: "The ID of the list the lead belongs to. (optional)",
          name: "leads_list_id",
          type: "input",
        },
      ])
      .then(create);
  });

/**
 * Deletes an existing lead.
 * @see: https://hunter.io/api/docs#delete-lead
 */
program
  .command("delete <id>")
  .alias("rm")
  .description("Delete a lead by ID.")
  .action((id, { apiKey }) => {
    hunter = new EmailHunter(apiKey);
    hunter.leads.delete(id, handleResponse);
  });

/**
 * Updates an existing lead.
 * The fields you can update are the same params you can give when you create a lead.
 * @see: https://hunter.io/api/docs#update-lead
 */
program
  .command("update <id>")
  .alias("up")
  .description("Update the lead informations by ID.")
  .action((id, { apiKey }) => {
    hunter = new EmailHunter(apiKey);

    // Ask for lead properties
    inquirer
      .prompt([
        {
          message: "The new email address of the lead.",
          name: "email",
          type: "input",
          validate: (v) => v !== "",
        },
        {
          message: "The first name of the leads. (optional)",
          name: "first_name",
          type: "input",
        },
        {
          message: "The last name of the lead. (optional)",
          name: "last_name",
          type: "input",
        },
        {
          message: "The name of the company the lead is working in. (optional)",
          name: "company",
          type: "input",
        },
        {
          message: "Personal notes about the lead. (optional)",
          name: "notes",
          type: "input",
        },
        {
          message: "The ID of the list the lead belongs to. (optional)",
          name: "leads_list_id",
          type: "input",
        },
      ])
      .then((answers) => {
        hunter.leads.update(id, answers, handleResponse);
      });
  });

// parse command arguments
program.parse(process.argv);
