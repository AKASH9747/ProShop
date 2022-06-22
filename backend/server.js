import path from "path";
// Import express
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

// Initilizing express/creating app using express
const app = express();

if (process.env.NODE_ENVI === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// app.get("/", (req, res) => {
//   res.send("API is Running...");
// });

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENVI === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running...");
  });
}

// const __dirname = path.resolve()
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")))
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   )
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is Running...")
//   })
// }

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
// Set up the port number
app.listen(PORT, () =>
  console.log(
    `Server Running in ${process.env.NODE_ENVI} mode on port number: ${PORT}`
  )
);