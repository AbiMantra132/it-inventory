const PROTOCOL = "http";
const PORT = 8080;

const originalURL = `${PROTOCOL}://localhost:${PORT}`

export const Endpoints = {
  postUser: `${originalURL}/uservalidation`,
  postProduct: `${originalURL}/addproduct`,
  allProducts: `${originalURL}/getitems`,
  departementProducts: `${originalURL}/itemsbydepartement`,
  singleProduct: `${originalURL}/item/`,
  updateSingleProduct: `${originalURL}/update/`,
  deleteProduct: `${originalURL}/deleteproduct/`,
  searchbyinventoryno: `${originalURL}/inventory/`,
  downloadxlsx: `${originalURL}/downloadxlsx`,
  getCookies: `${originalURL}/checkcookie`
}