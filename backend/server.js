import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDB from "./utils/database.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

// //intialize the server
// const server = app.listen(port, () =>
//   console.log("Server up and running at port:", port)
// );

// //listen unhandleRejection
// process.on("unhandledRejection", (reason, p) => {
//   //get slack notification about the error
//   console.error("Unhandled Rejection at:", p, "reason:", reason);
//   server.close();
//   process.exit(1);
// });
// process.on("uncaughtException", (e) => {
//   console.error("Uncaught exception at:", e);

//   server.close();
//   process.exit(1);
// });

const connect = async () => {
  try {
    await connectToDB();
    app.listen(port, () =>
      console.log(`Connected to MongoDB & Running on Port ${port}`)
    );
  } catch (error) {
    console.log("Error While Connecting To Mongodb");
  }
};

connect();