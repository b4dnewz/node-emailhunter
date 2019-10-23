#!/usr/bin/env node

/* tslint:disable:no-console */

import program from "commander";
import updateNotifier from "update-notifier";
import { log } from "util";
import EmailHunter from "../index";
import { handleResponse } from "./common";

const pkg = require("../../package.json");

let hunter: EmailHunter;

updateNotifier({ pkg }).notify();

// Global settings and options
program
  .name("email-hunter")
  .version(pkg.version)
  .description("An unofficial NodeJs client for Hunter.io API")
  .option("--api-key <key>", "Set the Hunter.io API key", process.env.HUNTERIO_KEY);

/**
 * This API endpoint enables you to get information regarding your Hunter account at any time. This call is free.
 * @see: https://hunter.io/api/docs#account
 */
program
  .command("account")
  .description("Get information regarding your Hunter account at any time.")
  .action(({ parent }) => {
    hunter = new EmailHunter(parent.apiKey);
    hunter.account(handleResponse);
  });

/**
 * This API endpoint allows you to know how many email addresses we have for one domain or for one company.
 * It's free and doesn't require authentication.
 * @see: https://hunter.io/api/docs#email-count
 */
program
  .command("count <domain>")
  .description(
    "Know how many email addresses are associated to one domain or one company.",
  )
  .action((domain, { parent }) => {
    hunter = new EmailHunter(parent.apiKey);
    hunter.emailCount(domain, handleResponse);
  });

/**
 * This API endpoint allows you to verify the deliverability of an email address.
 * @see: https://hunter.io/api/docs#email-verifier
 */
program
  .command("verify <email>")
  .alias("ve")
  .description("Verify the deliverability of a given email address.")
  .action((email, { parent }) => {
    hunter = new EmailHunter(parent.apiKey);
    hunter.emailVerifier(email, handleResponse);
  });

/**
 * Search all the email addresses corresponding to one website
 * @see: https://hunter.io/api/docs#domain-search
 */
program
  .command("search <domain>")
  .alias("se")
  .description(
    "Search all the email addresses found on the internet related to this domain.",
  )
  .option("-l, --limit [number]", "Limit the number of results to return.", 10)
  .option("-o, --offset [number]", "Specifies the number of email addresses to skip.", 0)
  .option("-t, --type [type]", "Get only personal or generic email addresses.")
  .action((domain, options) => {
    const { parent, type, offset, limit } = options;
    hunter = new EmailHunter(parent.apiKey);
    hunter.domainSearch({ domain, type, offset, limit }, handleResponse);
  });

/**
 * This API endpoint generates or retrieves the most likely email address
 * from a domain name, a first name and a last name.
 * @see: https://hunter.io/api/docs#email-finder
 */
program
  .command("find <domain> <first_name> <last_name>")
  .description("Generates or retrieves the most likely email address from given fields.")
  .action((domain, first_name, last_name, { parent }) => {
    hunter = new EmailHunter(parent.apiKey);
    hunter.emailFinder(
      {
        domain,
        first_name,
        last_name,
      },
      handleResponse,
    );
  });

/**
 * Saving and managing leads.
 * @see: https://hunter.io/api/docs#leads
 */
program.command("leads", "List and manage account related leads.");

/**
 * Saving and managing leads lists.
 * @see: https://hunter.io/api/docs#leads-lists
 */
program.command("leads-list", "List and manage account related leads lists.");

// Parse process args and execute commands
program.parse(process.argv);
