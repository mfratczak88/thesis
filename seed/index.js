const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { exec } = require('child_process');
const { ObjectId } = require('mongodb');
const config = dotenv.config();
dotenvExpand(config);

console.log(process.env.MONGO_CONNECTION_URL)
exec(
  `seed -u '${process.env.MONGO_CONNECTION_URL}' --drop-database '${__dirname}/data'`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
