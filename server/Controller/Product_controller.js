const {SenseInventory} = require("../Model/sense_inventory_DB.js");
const ExcelJS = require("exceljs");
const addProduct = async (req, res) => {
  const { item, departement, label, type, model, serialNumber, qty, image, remark } = req.body;
  
  // create inventory number
  /* IT|SSS|2023|0001 */

  async function generateInventoryNo() {
    try {
      // get constant input
      const companyInfo = "SSS";

      // get year
      const date = new Date();
      const yearInfo = date.getFullYear();

      // get number
      const lastRow = await SenseInventory.findOne({
        order: [["id", "DESC"]]
      });

      let numberInfo = "0001";
      if (lastRow) {
        const lastInventoryNumber = lastRow.inventory_no;
        const lastOrder = lastInventoryNumber.split("|")[3];

        let order = parseInt(lastOrder);

        order++;

        numberInfo = order.toString().padStart(4, "0");
      }

      return `${departement}|${companyInfo}|${yearInfo}|${numberInfo}`;
    } catch (err) {
      throw err;
    }
  }
  try {
    const inventory_no = await generateInventoryNo();

    const quantity = `${qty} ${label}`

    await SenseInventory.create({
      item: item,
      qty: quantity,
      serial_number: serialNumber,
      remark: remark,
      type: type,
      model: model,
      picture: image,
      departement: departement,
      inventory_no: inventory_no,
    });

    res.status(200).json({ msg: "Item successfully inserted" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

const getProducts = async (req,res) => {
  try {
    const data = await SenseInventory.findAll();

    res.status(200).json(data);

  } catch(err) {
    console.error("Error querying product:", err);
    res.status(500).json({ error: "Failed to search product" });
  }
}

const productsbyDepartement = async (req, res) => {
  try {
    const data = await SenseInventory.findAll({
      where: {
        departement: req.body.departement
      }
    })

    if(data.length === 0) return res.status(200).json({status: false})


    res.status(200).json({ data,  status: true });
  } catch (err) {
    console.error("Error querying product:", err);
    res.status(500).json({ error: "Failed to search product" });
  }
} 

const getItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await SenseInventory.findOne({
      where: {
        id: id
      }
    })

    res.status(200).json(item);
  } catch (err) {
    console.error("Error querying product:", err);
    res.status(500).json({ error: "Failed to search product" });
  }
}

const updateSingleProduct = async (req ,res) => {
  const { item, departement, label, type, model, serialNumber, qty, image, remark } = req.body;

  const id = req.params.id;

  try {
    const Item = await SenseInventory.findOne({
      where: {
        id: id
      }
    })

    const quantity = `${qty.split(" ")[0]} ${label}`

    console.log(quantity)

    if(Item) {
      await Item.update({
        item: item,
        qty: quantity,
        serial_number: serialNumber,
        remark: remark,
        type: type,
        model: model,
        picture: image,
        departement: departement,
      });

      await Item.save();

      res.status(200).json({ msg: "Item updated successfully" });
    }
  } catch (err) {
    console.error("Error querying product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
}

const deleteSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await SenseInventory.destroy({
      where: {
        id: id
      }
    })

    res.status(200).json({ msg: "Item deleted successfully", item });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};
const createXLSX = (req, res) => {
  const { item, qty, type, model, departement, serialNumber, image, inventoryNumber, remark } = req.body;

  // Create new workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`${inventoryNumber}`);

  // Merge cells and assign titles
  worksheet.mergeCells("C1:D1");
  worksheet.getCell("C1").value = "Item";
  worksheet.mergeCells("E1:F1");
  worksheet.getCell("E1").value = "Quantity";
  worksheet.mergeCells("G1:H1");
  worksheet.getCell("G1").value = "Serial Number";
  worksheet.mergeCells("I1:J1");
  worksheet.getCell("I1").value = "Type/Model";
  worksheet.mergeCells("K1:L1");
  worksheet.getCell("K1").value = "Department";
  worksheet.mergeCells("M1:N1");
  worksheet.getCell("M1").value = "Inventory No";
  worksheet.mergeCells("O1:P1");
  worksheet.getCell("O1").value = "Image";
  worksheet.mergeCells("Q1:S1");
  worksheet.getCell("Q1").value = "Remark";

  // Center align titles and make them bold
  worksheet.getRow(1).alignment = { horizontal: 'center' };
  worksheet.getRow(1).font = { bold: true };

  // Add data
  worksheet.mergeCells("C2:D6");
  worksheet.getCell("C2").value = item;
  worksheet.mergeCells("E2:F6");
  worksheet.getCell("E2").value = qty;
  worksheet.mergeCells("G2:H6");
  worksheet.getCell("G2").value = serialNumber;
  worksheet.mergeCells("I2:J6");
  worksheet.getCell("I2").value = `${type} ${model}`;
  worksheet.mergeCells("K2:L6");
  worksheet.getCell("K2").value = departement;
  worksheet.mergeCells("M2:N6");
  worksheet.getCell("M2").value = inventoryNumber;
  worksheet.mergeCells("O2:P6")
  worksheet.mergeCells("Q2:S6");
  worksheet.getCell("Q2").value = remark;

  // Center align titles and make them bold
  worksheet.getRow(2).alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(2).font = { bold: false };

  // Add image to the worksheet
  if (image) {
    const imageId = workbook.addImage({
      base64: image,
      extension: 'png',
    });

    worksheet.addImage(imageId,"O2:P6");
  }

  // Set content type and disposition for download
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${inventoryNumber}.xlsx`);

  // Pipe workbook to response
  workbook.xlsx.write(res)
    .then(function () {
      console.log('Data sent successfully!');
      res.end(); // End the response after writing the workbook data
    })
    .catch(function (err) {
      console.error('Error:', err);
      res.status(500).send('Error sending Excel file');
    });
};

const getByInventoryNumber = async (req, res) => {
  try {
    const inventoryNumber = req.params.inventoryNumber;

    const data = await SenseInventory.findOne({
      where: {
        inventory_no: inventoryNumber
      }
    })

    res.status(200).json(data?.id);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json('Error querying inventorynumber');
  }
} 

module.exports = {
  addProduct,
  getProducts,
  productsbyDepartement,
  getItem,
  updateSingleProduct,
  deleteSingleProduct,
  createXLSX,
  getByInventoryNumber
}