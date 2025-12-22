import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let teaId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: teaId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  res.status(204).send("Deleted");
});

// app.get("/", (req, res) => {
//   res.send("Hello from Ayush");
// });

// app.get("/login", (req, res) => {
//   res.send("Login successfull");
// });

// app.get("/logout", (req, res) => {
//   res.send("Logout successfull");
// });

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
