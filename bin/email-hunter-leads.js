#!/usr/bin/env node
'use strict';

const program = require('commander');
const Hunter = require('../dist/hunter.io.node.js');
const apiKey = process.env.HUNTERIO_KEY;

// Hunter object
let hunter = null;

const printError = err => {
  return err.errors.forEach(e => {
    console.log(` [${e.code}] ${e.id}: ${e.details}`);
  });
};

// Ensure proper command name
program.name('email-hunter leads');

// List all the account leads
program
  .command('list')
  .alias('ls')
  .description('List all the leads')
  .option('-l, --limit [number]', 'A limit on the number of leads to be returned.', 20)
  .option('-o, --offset [number]', 'The number of leads to skip.', 0)
  .action(options => {
    hunter = new Hunter(program.key || apiKey);
    let { offset, limit } = options;

    console.log(' Getting account leads list: \n');
    hunter.leads.list({ offset, limit }, (err, results) => {
      if (err) {
        return printError(err);
      }

      if (results.data.leads.length === 0) {
        console.log("You don't have any leads.", '\n');
        return;
      }

      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
    });
  });

// Get informations for single leads by ID
program
  .command('retrieve <id>')
  .alias('get')
  .description('Retrieves all the informations of a lead by ID.')
  .action(id => {
    hunter = new Hunter(program.key || apiKey);
    console.log(' Getting account leads id:', id, '\n');
    hunter.leads.retrieve(id, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
    });
  });

// TODO: Add inquisitor support for many questions
// Create a new lead into account
program
  .command('create')
  .description('Creates a new lead.')
  .action(() => {
    console.log('Command not available.');
  });

// Delete a lead by ID
program
  .command('delete <id>')
  .alias('rm')
  .description('Delete a lead by ID.')
  .action(id => {
    hunter = new Hunter(program.key || apiKey);
    console.log(' Deleting lead by ID:', id, '\n');
    hunter.leads.delete(id, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
    });
  });

// Update a lead by ID
program
  .command('update')
  .alias('up')
  .description('Update the lead informations by ID.')
  .action(() => {
    console.log('Command not available.');
  });

program.parse(process.argv);
