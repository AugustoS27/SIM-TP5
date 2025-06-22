import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
