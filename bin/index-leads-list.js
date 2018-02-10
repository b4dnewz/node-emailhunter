#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const Hunter = require('../dist/hunter.io.node.js');
const apiKey = process.env.HUNTERIO_KEY;

// Hunter object
let hunter = null;

const printError = err => {
  return err.errors.forEach(e => {
    console.log(` [${e.code}] ${e.id}: ${e.details}`);
  });
};

const printList = data => {
  if (data.id) console.log('LIST ID:'.padEnd(12), data.id);
  console.log('LIST NAME:'.padEnd(12), data.name);
  console.log('LEADS COUNT:'.padEnd(12), data.leads_count);
  if (data.team_id) console.log('TEAM ID:'.padEnd(12), data.team_id);
  console.log('');
};

// Ensure proper command name
program
  .name('email-hunter leads-list')
  .option('-w, --write [name]', 'Write the JSON result output to file.');

// List all the account leads
program
  .command('list')
  .alias('ls')
  .description('List all the leads lists.')
  .option('-l, --limit [number]', 'A limit on the number of leads to be returned.', 20)
  .option('-o, --offset [number]', 'The number of leads to skip.', 0)
  .action(options => {
    hunter = new Hunter(apiKey);
    let { offset, limit } = options;
    console.log('Getting account leads list: \n');
    hunter.leadsList.list({ offset, limit }, (err, results) => {
      if (err) {
        return printError(err);
      }
      if (results.data.leads_lists.length === 0) {
        console.log("You don't have any leads lists.", '\n');
        return;
      }

      // Print the leads lists
      results.data.leads_lists.forEach(r => printList(r));
    });
  });

// Get informations for single leads-list by ID
program
  .command('retrieve <id>')
  .alias('get')
  .description('Retrieves all the informations of a leads list by ID.')
  .action(id => {
    hunter = new Hunter(apiKey);
    console.log('Getting account leads list by ID:', id, '\n');
    hunter.leadsList.retrieve(id, (err, results) => {
      if (err) {
        return printError(err);
      }
      printList(results.data);
    });
  });

// Create a new leads-list into account
program
  .command('create [name]')
  .alias('new')
  .description('Creates a new leads list.')
  .action(name => {
    hunter = new Hunter(apiKey);

    function create(opts) {
      console.log('Creating new leads list by name:', opts.name);
      hunter.leadsList.create(opts, (err, results) => {
        if (err) {
          return printError(err);
        }
        console.log('Leads list created successfully with ID:', results.data.list_id);
      });
    }

    // If name argument was used
    if (name) {
      return create({ name });
    }

    // Ask for arguments
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'The name of the leads list.',
          validate: v => v !== ''
        }
      ])
      .then(answers => {
        create(answers);
      });
  });

// Delete a leads-list by ID
program
  .command('delete <ids...>')
  .alias('rm')
  .description('Delete one or more leads list by ID.')
  .action(ids => {
    hunter = new Hunter(apiKey);
    ids.forEach(id => {
      console.log('Deleting leads list by ID:', id, '\n');
      hunter.leadsList.delete(id, err => {
        if (err) {
          return printError(err);
        }
        console.log('The leads list has been successfully deleted.');
      });
    });
  });

// Update a leads-list by ID
program
  .command('update <id>')
  .alias('up')
  .description('Update the leads list informations by name.')
  .action(id => {
    hunter = new Hunter(apiKey);
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'The new name of the leads list.',
          validate: v => v !== ''
        },
        {
          type: 'input',
          name: 'team_id',
          message: 'The id of the team to share your leads with (must be your team).'
        }
      ])
      .then(answers => {
        console.log('Updating lead list by ID:', id);
        hunter.leadsList.update(id, answers, err => {
          if (err) {
            return printError(err);
          }
          console.log('The leads list has been successfully updated.');
        });
      });
  });

program.parse(process.argv);
