import express from "express";
import "dotenv/config";
import logger from "./logger.js";
import morgan from "morgan";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let teaData = [];
let teaId = 1;

// add a tea
app.post("/teas", (req, res) => {
  // console.log("POST")
  logger.info("A post request is made"); // more professional
  logger.warn("A post request is made");
  const { name, price } = req.body;
  const tea = { id: teaId++, name: name, price: price };
  teaData.push(tea);
  res.status(201).send(tea);
});

// list all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// list tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send("Updated");
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  res.status(200).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
