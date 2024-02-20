// defining dependencies
const cors = require('cors');
const express = require("express");
const { testDBConnection } = require("./Database/Connection");
const cookieParser = require("cookie-parser");
const router = require("./Router/routes");
const syncModels = require("./Model/Sync_Models");
const BodyParser = require("body-parser");

// defining server dependencies
const PORT = 8080;
const app = express();

// defining middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(BodyParser.json({ limit: '200mb' }));


// defining functions
async function createServer() {
  app.listen(PORT, async () => {
    try {
      console.log("Server is running on port " + PORT);
      await testDBConnection();
      await syncModels();
    } catch (error) {
      console.error("Error during server startup:", error);
    }
  });
}

createServer();

app.use("/", router);
