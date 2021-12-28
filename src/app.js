import cors from "cors";
import express from "./services/express.js";
import productRouter from "./routes/products.js";
import productsService from "./services/entities/Products.js";
import messagesService from "./services/entities/Messages.js";
import io from "./services/io.js";
import { app } from "./services/express.js";
import { __dirname } from "./utils.js";
import { databaseMySql, databaseSqlite3 } from "./services/database/db.js";

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static(__dirname + "/public"));

app.use("/api/productos", productRouter);

const products = new productsService(databaseMySql, "products");
const messages = new messagesService(databaseSqlite3, "messages");

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const productsArray = await products.getAll();
  const messagesArray = await messages.getAll();
  socket.emit("deliverProducts", productsArray.payload);
  socket.emit("deliverMessages", messagesArray.payload);
  socket.on("message", (data) => {
    messages.save(data).then((result) => {
      io.emit("sendMessage", result.payload);
    });
  });
});
