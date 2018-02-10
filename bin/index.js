#!/usr/bin/env node

const { version } = require('../package.json');
const fs = require('fs');
const program = require('commander');
const Hunter = require('../dist/hunter.io.node.js');
const apiKey = process.env.HUNTERIO_KEY;

// Hunter object
let hunter = null;

// Print package banner
console.log(`
  Email Hunter CLI v.${version}
`);

const printError = err => {
  return err.errors.forEach(e => {
    console.log(`[${e.code}] ${e.id}: ${e.details}`);
  });
};

const optionallySaveOutput = (filename, data) => {
  if (!filename || typeof filename === 'undefined') {
    return;
  }
  filename = typeof filename === 'string' ? filename : `${Date.now()}.json`;
  fs.writeFile(filename, data, err => {
    if (err) {
      console.log('An error occurred while trying to save output. ');
      return;
    }
    console.log(`File was successfully saved to disk: ${filename} `);
  });
};

// Global settings and options
program
  .name('email-hunter')
  .version(version)
  .description('Unofficial command line interface for Hunter.io API.');

// Get account information for the current user
program
  .command('account')
  .description('Get information regarding your Hunter account at any time.')
  .option('-w, --write [name]', 'Write the JSON result output to file.')
  .action(options => {
    hunter = new Hunter(apiKey);
    console.log('Getting account informations: \n');
    hunter.account((err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
      optionallySaveOutput(options.write, results);
    });
  });

// Get the emails number count for a given domain
program
  .command('count <domain>')
  .description(
    'Know how many email addresses are associated to one domain or one company.'
  )
  .option('-w, --write [name]', 'Write the JSON result output to file.')
  .action((domain, options) => {
    hunter = new Hunter(apiKey);
    console.log('Getting domain emails count informations: \n');
    hunter.emailCount(domain, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
      optionallySaveOutput(options.write, results);
    });
  });

// Verify the deliverability of an email address.
program
  .command('verify <email>')
  .alias('ve')
  .description('Verify the deliverability of a given email address.')
  .option('-w, --write [name]', 'Write the JSON result output to file.')
  .action((email, options) => {
    hunter = new Hunter(apiKey);
    console.log(`Verifing email address deliverability: ${email}": \n`);
    hunter.emailVerifier(email, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
      optionallySaveOutput(options.write, results);
    });
  });

// Search emails associated with a given domain
program
  .command('search <domain>')
  .alias('se')
  .description(
    'Search all the email addresses found on the internet related to this domain.'
  )
  .option('-w, --write [name]', 'Write the JSON result output to file.')
  .option('-l, --limit [number]', 'Limit the number of results to return.', 10)
  .option('-o, --offset [number]', 'Specifies the number of email addresses to skip.', 0)
  .option('-t, --type [type]', 'Get only personal or generic email addresses.')
  .action((domain, options) => {
    hunter = new Hunter(apiKey);
    let { type, offset, limit } = options;
    console.log(`Running domain search for: ${domain} `);
    hunter.domainSearch({ domain, type, offset, limit }, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
      optionallySaveOutput(options.write, results);
    });
  });

// Find email address by personal informations
program
  .command('find <domain> <first_name> <last_name>')
  .description(
    'Generates or retrieves the most likely email address from domain name, first name and last name.'
  )
  .option('-w, --write [name]', 'Write the JSON result output to file.')
  .action((domain, first_name, last_name, options) => {
    hunter = new Hunter(apiKey);
    console.log(`Finding email for "${first_name} ${last_name}" at "${domain}": \n`);
    hunter.emailFinder(
      {
        domain,
        first_name,
        last_name
      },
      (err, results) => {
        if (err) {
          return printError(err);
        }
        results = JSON.stringify(results.data, null, 2);
        console.log(results + '\n');
        optionallySaveOutput(options.write, results);
      }
    );
  });

// Sub command for leads
program.command('leads', 'List and manage account related leads.');
program.command('leads-list', 'List and manage account related leads lists.');

// Parse process args
program.parse(process.argv);
