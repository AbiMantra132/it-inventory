// defining dependencies
const { sense_inventory } = require("../Database/Connection");
const { DataTypes } = require("sequelize");

// create the database model
const SenseInventory = sense_inventory.define("item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serial_number: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allownull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.TEXT("long"),
      allownull: true
    },
    departement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inventory_no: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
)


const SenseAccounts = sense_inventory.define("accounts", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "user"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
)

module.exports = {
  SenseInventory,
  SenseAccounts
};