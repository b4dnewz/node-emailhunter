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
program.name('email-hunter leads-list');

// List all the account leads
program
  .command('list')
  .alias('ls')
  .description('List all the leads lists.')
  .option('-l, --limit [number]', 'A limit on the number of leads to be returned.', 20)
  .option('-o, --offset [number]', 'The number of leads to skip.', 0)
  .action(options => {
    hunter = new Hunter(program.key || apiKey);
    let { offset, limit } = options;
    console.log(' Getting account leads list: \n');
    hunter.leadsList.list({ offset, limit }, (err, results) => {
      if (err) {
        return printError(err);
      }
      if (results.data.leads.length === 0) {
        console.log("You don't have any leads lists.", '\n');
        return;
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
    });
  });

// Get informations for single leads-list by ID
program
  .command('retrieve <id>')
  .alias('get')
  .description('Retrieves all the informations of a leads list by ID.')
  .action(id => {
    hunter = new Hunter(program.key || apiKey);
    console.log(' Getting account leads list by ID:', id, '\n');
    hunter.leadsList.retrieve(id, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
    });
  });

// Create a new leads-list into account
program
  .command('create <name>')
  .description('Creates a new leads list.')
  .action(name => {
    hunter = new Hunter(program.key || apiKey);
    console.log(' Creating new leads list by name:', name);
    hunter.leadsList.create({ name }, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
    });
  });

// Delete a leads-list by ID
program
  .command('delete <id>')
  .alias('rm')
  .description('Delete a leads list by ID.')
  .action(id => {
    hunter = new Hunter(program.key || apiKey);
    console.log(' Deleting leads list by ID:', id, '\n');
    hunter.leadsList.delete(id, (err, results) => {
      if (err) {
        return printError(err);
      }
      results = JSON.stringify(results.data, null, 2);
      console.log(results + '\n');
    });
  });

// Update a leads-list by ID
program
  .command('update')
  .alias('up')
  .description('Update the leads list informations by name.')
  .action(() => {
    console.log('Command not available');
  });

program.parse(process.argv);
