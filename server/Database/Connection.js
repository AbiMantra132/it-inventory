require("dotenv").config();

// importing and defining dependencies
const { Sequelize } = require("sequelize");
const DB = process.env.DB_NAME;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// create the connection 
const sense_inventory = new Sequelize(DB, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: "mysql"
});

// test the connection
async function testDBConnection() {
  try {
    await sense_inventory.authenticate();
    console.log("Successfully creating connection to database");
  } catch (error) {
    console.log("Error creating connection to database");
    throw error;
  }
}

module.exports = {
  sense_inventory,
  testDBConnection
}