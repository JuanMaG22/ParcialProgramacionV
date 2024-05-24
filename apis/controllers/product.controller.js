import Product from "../models/product.model.js";

/* <------------| TRAER PRODUCTOS |------------> */
export const products = async (req, res) => {
    const productList = await Product.findAll();
  
    res.status(200).json({
      success: true,
      data: productList
    });
};


/* <------------| AGREGAR PRODUCTOS |------------> */
export const postProduct = async (req, res) => {
  const { name, category, description, price } = req.body;

  if(!name || !category || !description || !price) {
    res.status(400).json({ success: false, message: 'Todos los Campos son Obligatorios' })
  }
  
  try { 
    await Product.create({name, category, description, price});

    res.status(201).json({ success: true, message: 'Producto Añadido Correctamente'});

  } catch(error) {
    res.status(500).json({ success: false, message: 'Error al Insertar el Producto' });
  }
};


/* <------------| ACTUALIZAR PRODUCTOS |------------> */
export const putProduct = async (req, res) => {
  const { name, category, description, price } = req.body;
  const productId = req.params.id

  const product = await Product.findByPk(productId);

  if(!product) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' });
  }

  if(!name || !category || !description || !price) {
    res.status(400).json({ success: false, message: 'Todos los Campos son Obligatorios' })
  }
  
  try { 
    product.name = name;
    product.category = category;
    product.description = description;
    product.price = price;

    await product.save();

    res.status(201).json({ success: true, message: 'Producto Actualizado Correctamente', 
    product: {
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price
    }});

  } catch(error) {
    res.status(500).json({ success: false, message: 'Error al Actualizar el Producto' });
  }
};


/* <------------| ELIMINAR PRODUCTOS |------------> */
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if(!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    await product.destroy();
    res.status(200).json({ success: true, message: 'Producto eliminado exitosamente' });

  } catch(error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el producto' });
  }
};
