#!/usr/bin/env node

/* tslint:disable:no-console */

import program from "commander";
import inquirer from "inquirer";
import EmailHunter from "../index";
import { handleResponse } from "./common";

const apiKey = process.env.HUNTERIO_KEY;

// Print a single lead details
const printLead = (data) => {
  console.log("LEAD ID:".padEnd(12), data.id);
  console.log("EMAIL:".padEnd(12), data.email);
  if (data.first_name || data.last_name) {
    console.log("FULLNAME:".padEnd(12), data.first_name || "", data.last_name || "");
  }
  if (data.confidence_score) {
    console.log("CONFIDENCE:".padEnd(12), `${data.confidence_score}%`);
  }
  if (data.website) { console.log("WEBSITE:".padEnd(12), data.website); }
  if (data.notes) { console.log("NOTES:".padEnd(12), data.notes); }
  console.log("");
};

let hunter: EmailHunter;

program
  .name("email-hunter leads")
  .description("Saving and managing leads");

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
  .action((options) => {
    hunter = new EmailHunter(apiKey);
    const { offset, limit } = options;
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
  .action((id, options) => {
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
  .action((email) => {
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
  .action((id) => {
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
  .action((id) => {
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
