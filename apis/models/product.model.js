import {DataTypes}  from "sequelize";
import db from "../database/db.js";

const Product = db.define("product", {
  name:{
    type: DataTypes.STRING,
    allowNull:false,

  },
  category: {
    type: DataTypes.STRING,
    allowNull:false,

  },
  description: {
    type:DataTypes.STRING,
    allowNull:false,
 },
 price:{
    type:DataTypes.STRING,
    allowNull:false,
 },
 createdAt:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW,
 },
 updatedAt:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW,
    onUpdate:DataTypes.NOW,
 },
});

export default Product;
