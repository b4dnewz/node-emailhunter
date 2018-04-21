const fs = require('fs');

module.exports = {
  printError: err => {
    return err.errors.forEach(e => {
      console.log(`[${e.code}] ${e.id}: ${e.details}`);
    });
  },
  printResponse: res => {
    console.log(JSON.stringify(res.data, null, 2) + '\n');
  },
  optionallySaveOutput: (filename, data) => {
    if (!filename || typeof filename === 'undefined') {
      return;
    }
    filename = typeof filename === 'string' ? filename : `${Date.now()}.json`;
    fs.writeFile(filename, JSON.stringify(data, null, 2), err => {
      if (err) {
        console.log('An error occurred while trying to save output. ');
        return;
      }
      console.log(`File was successfully saved to disk: ${filename} `);
    });
  }
};
