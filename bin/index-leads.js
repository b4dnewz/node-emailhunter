#!/usr/bin/env node

'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const Hunter = require('../dist/hunter.io.node.js');
const common = require('./common');
const apiKey = process.env.HUNTERIO_KEY;

// Print a single lead details
const printLead = data => {
  console.log('LEAD ID:'.padEnd(12), data.id);
  console.log('EMAIL:'.padEnd(12), data.email);
  if (data.first_name || data.last_name) {
    console.log('FULLNAME:'.padEnd(12), data.first_name || '', data.last_name || '');
  }
  if (data.confidence_score)
    console.log('CONFIDENCE:'.padEnd(12), `${data.confidence_score}%`);
  if (data.website) console.log('WEBSITE:'.padEnd(12), data.website);
  if (data.notes) console.log('NOTES:'.padEnd(12), data.notes);
  console.log('');
};

// Hunter object
let hunter = null;

// Ensure proper command name
program.name('email-hunter leads');

// List all the account leads
program
  .command('list')
  .alias('ls')
  .description('List all the leads')
  .option('-w, --write [name]', 'Write the JSON result output to file.')
  .option('-l, --limit [number]', 'A limit on the number of leads to be returned.', 20)
  .option('-o, --offset [number]', 'The number of leads to skip.', 0)
  .action(options => {
    hunter = new Hunter(apiKey);
    const { offset, limit } = options;
    console.log('Getting account leads list: \n');
    hunter.leads.list(
      {
        offset,
        limit
      },
      (err, results) => {
        if (err) {
          return common.printError(err);
        }

        if (results.data.leads.length === 0) {
          console.log("You don't have any leads.", '\n');
          return;
        }

        // Print all leads
        results.data.leads.forEach(printLead);
        common.optionallySaveOutput(options.write, results);
      }
    );
  });

// Get informations for single leads by ID
program
  .command('retrieve <id>')
  .alias('get')
  .description('Retrieves all the informations of a lead by ID.')
  .option('-w, --write [name]', 'Write the JSON result output to file.')
  .action((id, options) => {
    hunter = new Hunter(apiKey);
    console.log('Getting account leads id:', id, '\n');
    hunter.leads.retrieve(id, (err, results) => {
      if (err) {
        return common.printError(err);
      }

      printLead(results.data);
      common.optionallySaveOutput(options.write, results);
    });
  });

// Create a new lead into account
program
  .command('create [email]')
  .alias('new')
  .description('Creates a new lead.')
  .action(email => {
    hunter = new Hunter(apiKey);

    function create(opts) {
      console.log('');
      console.log('Creating new lead from email:', opts.email);
      hunter.leads.create(opts, (err, results) => {
        if (err) {
          return common.printError(err);
        }
        console.log('Lead has been created successfully with ID:', results.data.id);
      });
    }

    // If email argument was used
    if (email) {
      return create({
        email
      });
    }

    // Ask for lead properties
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'email',
          message: 'The email address of the lead.',
          validate: v => v !== ''
        },
        {
          type: 'input',
          name: 'first_name',
          message: 'The first name of the leads. (optional)'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'The last name of the lead. (optional)'
        },
        {
          type: 'input',
          name: 'company',
          message: 'The name of the company the lead is working in. (optional)'
        },
        {
          type: 'input',
          name: 'notes',
          message: 'Personal notes about the lead. (optional)'
        },
        {
          type: 'input',
          name: 'leads_list_id',
          message: 'The ID of the list the lead belongs to. (optional)'
        }
      ])
      .then(create);
  });

// Delete a lead by ID
program
  .command('delete <id>')
  .alias('rm')
  .description('Delete a lead by ID.')
  .action(id => {
    hunter = new Hunter(apiKey);
    console.log('Deleting lead by ID:', id, '\n');
    hunter.leads.delete(id, err => {
      if (err) {
        return common.printError(err);
      }
      console.log('The lead has been successfully deleted.');
    });
  });

// Update a lead by ID
program
  .command('update <id>')
  .alias('up')
  .description('Update the lead informations by ID.')
  .action(id => {
    hunter = new Hunter(apiKey);

    // Ask for lead properties
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'email',
          message: 'The new email address of the lead.',
          validate: v => v !== ''
        },
        {
          type: 'input',
          name: 'first_name',
          message: 'The first name of the leads. (optional)'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'The last name of the lead. (optional)'
        },
        {
          type: 'input',
          name: 'company',
          message: 'The name of the company the lead is working in. (optional)'
        },
        {
          type: 'input',
          name: 'notes',
          message: 'Personal notes about the lead. (optional)'
        },
        {
          type: 'input',
          name: 'leads_list_id',
          message: 'The ID of the list the lead belongs to. (optional)'
        }
      ])
      .then(answers => {
        console.log('');
        console.log('Updating lead values by ID:', id);
        hunter.leads.update(id, answers, err => {
          if (err) {
            return common.printError(err);
          }
          console.log('Lead has been successfully updated.');
        });
      });
  });

program.parse(process.argv);
