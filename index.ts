import express from "express";
import dotenv from "dotenv";
import route from "./src/routes";
import db from "./src/libs/db";
import cors from "cors";

// inisialisasi dotenv
dotenv.config();

// inisialisasi express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
   origin: 'http://localhost:5173', 
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors());
app.use("/uploads", express.static("src/uploads"));

// routes

app.get("/", (req: express.Request, res: express.Response) => {
   res.send("Hello World!");
});

app.use(route);

app.listen(port, async () => {
   try {
      await db.$connect();
      console.log("Express running on port " + port);
   } catch (error) {
      await db.$disconnect();
   }
});


