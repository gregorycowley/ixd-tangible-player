const fs = require('node:fs');
const path = require('node:path');

/**
 * Stringifies a JavaScript object and appends it to a new line in a specified text file.
 * @param {Object} obj - The JavaScript object to append.
 * @param {string} filename - The name of the file to append to.
 * @returns {Promise<void>}
 */
function appendObjectToNewLine(obj, filename) {
  return;
  return new Promise((resolve, reject) => {
    // Define the full path for the file
    const filePath = path.join(__dirname, filename);

    // Convert the object to a JSON string with a newline character
    const data = JSON.stringify(obj) + '\n';

    // Append the JSON string to the file, creating the file if it doesn't exist
    fs.appendFile(filePath, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports.appendObjectToNewLine = appendObjectToNewLine;
