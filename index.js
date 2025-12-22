import express from "express";
const port = 3000;
const app = express();

app.use(express.json());

let teaData = [];
let teaId = 1;

// add a tea
app.post("/teas", (req, res) => {
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
