import axios from "axios";
import { Endpoints } from "./Endpoints";

export const sendProduct = async (data) => {
  const { item, departement, label, type, model, serialNumber, qty, image, remark } = data;
  const config = {
    url: Endpoints.postProduct,
    data: {
      item,
      departement,
      label,
      type,
      model,
      serialNumber,
      qty,
      image,
      remark
    },
    headers: {
      accept: 'application/json',
      headers: { 'Content-Type': 'application/json' }
    }
  }

  try {
    const response = await axios.post(config.url, config.data, config.headers);

    return response.msg;
  } catch (err) {
    console.error("Error during login request:", err);
    // You might want to throw the error or return a specific value
    throw err;
  }
}

export const retrieveProducts = async () => {
  try {
    const response = await axios.get(Endpoints.allProducts);

    return response
  } catch (err) {
    console.error("Error retrieving items:", err);
    // You might want to throw the error or return a specific value
    throw err;
  }
}

export const retrieveProductsByDepartement = async (departement) => {
  const config = {
    url: Endpoints.departementProducts,
    data: {
      departement: departement
    },
    headers: {
      accept: 'application/json',
      headers: { 'Content-Type': 'application/json' }
    }
  }
  try {
    const response = await axios.post(config.url, config.data, config.headers);


    return response.data;
  } catch (err) {
    console.error("Error retrieving items:", err);
    // You might want to throw the error or return a specific value
    throw err;
  }
}

export const retrieveSingleProduct = async (product_id) => {
  try {
    const response = await axios.get(`${Endpoints.singleProduct}${product_id}`);

    return response.data
  } catch (err) {
    console.error("Error retrieving items:", err);
    // You might want to throw the error or return a specific value
    throw err;
  }
}

export const updateSingleProduct = async (data) => {
  const { item, departement, label, type, model, serialNumber, qty, image, remark, id } = data;
  const config = {
    url: `${Endpoints.updateSingleProduct}${id}`,
    data: {
      item,
      departement,
      label,
      type,
      model,
      serialNumber,
      qty,
      image,
      remark
    },
    headers: {
      accept: 'application/json',
      headers: { 'Content-Type': 'application/json' }
    }
  }
  try {
    const response = await axios.put(config.url, config.data, config.headers);

    console.log(response)
  } catch (err) {
    console.error("Error updating items:", err);
    // You might want to throw the error or return a specific value
    throw err;
  }
}

export const deleteProduct = async (id) => {
  const config = {
    url: `${Endpoints.deleteProduct}${id}`,
    headers: {
      accept: 'application/json',
      headers: { 'Content-Type': 'application/json' }
    }
  }
  try {
    const deleted = await axios.delete(config.url, config.headers)
  
    console.log(deleted)
  } catch (err) {
    console.error("Error updating items:", err);
    // You might want to throw the error or return a specific value
    throw err;
  }
}

export const getItemByInventoryNo = async (inventoryNumber) => {
  try {
    const response = await axios.get(`${Endpoints.searchbyinventoryno}${inventoryNumber}`);

    return response.data;
  } catch (err) {
    console.error("Error searching data:", err);
    throw err;
  }
}

export const downloadXLSX = async (data) => {
  try {
    const response = await axios.post(Endpoints.downloadxlsx, data, {
      responseType: 'blob', // Set the response type to 'blob' to receive binary data
    });

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.inventoryNumber}.xlsx`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error downloading xlsx:", err);
    throw err;
  }
};
