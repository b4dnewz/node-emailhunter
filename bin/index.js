#!/usr/bin/env node

const pkg = require('../package.json');
const program = require('commander');
const Hunter = require('../dist/hunter.io.node.js');
const apiKey = process.env.HUNTERIO_KEY;

// Hunter object
let hunter = null;

console.log(`

  Email Hunter
  v.${pkg.version}

`);

const printError = err => {
  return err.errors.forEach(e => {
    console.log(` [${e.code}] ${e.id}: ${e.details}`);
  });
};

program
  .name('email-hunter')
  .version(pkg.version)
  .description(pkg.description)
  .option('-k, --key [apikey]', 'Set the Hunter.io API key for the execution.');

// Serach emails associated with a given domain
program
  .command('domain-search [domain]')
  .description(
    'You give one domain name and it returns all the email addresses using this domain name found on the internet.'
  )
  .option(
    '-l, --limit [number]',
    'Specifies the max number of email addresses to return.'
  )
  .option('-o, --offset [number]', 'Specifies the number of email addresses to skip.')
  .option('-t, --type [type]', 'Get only personal or generic email addresses.')
  .action((domain, options) => {
    hunter = new Hunter(program.key || apiKey);
    let { type, offset, limit } = options;
    console.log(` Running domain search for: ${domain} `);
    hunter.domainSearch({ domain, type, offset, limit }, (err, results) => {
      if (err) {
        return printError(err);
      }
      console.log(JSON.stringify(results.data, null, 2));
    });
  });

// Get the emails number count for a given domain
program
  .command('count [domain]')
  .description('Know how many email addresses we have for one domain or for one company.')
  .action(domain => {
    hunter = new Hunter(program.key || apiKey);
    console.log(' Getting domain emails count informations: \n');
    hunter.emailCount(domain, (err, results) => {
      if (err) {
        return printError(err);
      }
      console.log(JSON.stringify(results.data, null, 2));
    });
  });

// Get account information for the current user
program
  .command('account')
  .description(
    'Get information regarding your Hunter account at any time. This call is free.'
  )
  .action(() => {
    hunter = new Hunter(program.key || apiKey);
    console.log(' Getting account informations: \n');
    hunter.account((err, results) => {
      if (err) {
        return printError(err);
      }
      console.log(JSON.stringify(results.data, null, 2));
    });
  });

program.parse(process.argv);
