
//import express from "express";//importar express
//en que puerto se va a desplegar la api

import express from "express";
import cors from "cors";
import productRouter from "./routes/product.route.js";
import db from "./database/db.js";

const app = express();
const port = process.env.PORT || 3000;


//bd conecction...
(async () => {
  try {
    await db.authenticate();
    db.sync(); // crea las tablas en la db ( si no existen )
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

app.use(express.json()); //envio recepcion de informacion en formato tipo json
app.use(cors());//cosumo d API 
app.use(express.static("public"));

//http:localhost:300/products
// app.get("/products",(req, res)=> {
//   //rest.send("hello world");
//   res.json({
//     succes: true,
//     data: [
//       {
//         subjet: "programacionv",
//         semester: "7",
//         hours: "20:00",
//         date:new Date().toDateString(),

//     },
//   ],
//   }); 
// });
app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
});
