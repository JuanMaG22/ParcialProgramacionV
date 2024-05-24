import express from "express";
import { products, postProduct, putProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

    
//forma larga...
router.get("/", products)

router.post("/", postProduct)

router.put("/:id", putProduct)

router.delete("/:id", deleteProduct)



export default router;