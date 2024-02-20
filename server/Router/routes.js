// importing dependencies
const express = require('express');
const router = express.Router();
const { getCookie, validateUser } = require('../Controller/Auth_controller');
const { addProduct, getProducts, deleteSingleProduct, productsbyDepartement, getItem, updateSingleProduct, createXLSX, getByInventoryNumber } = require('../Controller/Product_controller');

{/* Functions */ }

//get routes
router.get("/getitems", getProducts);
router.get("/item/:id", getItem);
router.get("/inventory/:inventoryNumber", getByInventoryNumber);
router.get("/checkcookie", getCookie)

// post routes
router.post("/uservalidation", validateUser);
router.post("/addproduct", addProduct);
router.post("/itemsbydepartement", productsbyDepartement);
router.post("/downloadxlsx", createXLSX);

// put routes
router.put("/update/:id", updateSingleProduct)

// delete routes
router.delete("/deleteproduct/:id", deleteSingleProduct);

module.exports = router;