#!/usr/bin/env node

const { version } = require('../package.json');
const program = require('commander');
const Hunter = require('../dist/hunter.io.node.js');
const common = require('./common');
const apiKey = process.env.HUNTERIO_KEY;

// Hunter object
let hunter = null;

// Print package banner
console.log(`
  Email Hunter CLI v.${version}
`);

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
        return common.printError(err);
      }
      common.printResponse(results);
      common.optionallySaveOutput(options.write, results);
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
    console.log(`Getting emails count for: ${domain}\n`);
    hunter.emailCount(domain, (err, results) => {
      if (err) {
        return common.printError(err);
      }
      common.printResponse(results);
      common.optionallySaveOutput(options.write, results);
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
    console.log(`Verifing email address deliverability for: ${email}\n`);
    hunter.emailVerifier(email, (err, results) => {
      if (err) {
        return common.printError(err);
      }
      common.printResponse(results);
      common.optionallySaveOutput(options.write, results);
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
    const { type, offset, limit } = options;
    console.log(`Searching emails for: ${domain}\n`);
    hunter.domainSearch({ domain, type, offset, limit }, (err, results) => {
      if (err) {
        return common.printError(err);
      }
      common.printResponse(results);
      common.optionallySaveOutput(options.write, results);
    });
  });

// Find email address by personal informations
program
  .command('find <domain> <first_name> <last_name>')
  .description('Generates or retrieves the most likely email address from given fields.')
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
          return common.printError(err);
        }
        common.printResponse(results);
        common.optionallySaveOutput(options.write, results);
      }
    );
  });

// Sub command for leads
program.command('leads', 'List and manage account related leads.');
program.command('leads-list', 'List and manage account related leads lists.');

// Parse process args
program.parse(process.argv);
