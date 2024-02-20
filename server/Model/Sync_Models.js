// import dependencies
const { sense_inventory } = require("../Database/Connection");
const { SenseInventory, SenseAccounts } = require("./sense_inventory_DB");

// function
async function syncModels() {
  const Models = [SenseInventory];

  // sync
  try {
    for (let i = 0; i < Models.length; i++) {
      await Models[i].sync({ alter: true })
      console.log(`Model "${Models[i]}" synchronized successfully.`);
    }
  } catch (err) {
    console.error('Error synchronizing models:', err.message);
  }
}


module.exports = syncModels;