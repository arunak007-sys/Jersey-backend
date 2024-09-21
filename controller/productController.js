const Product = require('../model/productModel')

const createProduct = async (req,res) => {
    try {

        const { image,name,price,category,description,qty } = req.body

        const product = new Product({
            image,
            name,
            price,
            category,
            description,
            qty
        });

        await product.save()

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
       console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const getProduct = async (req,res) => {
    try {
        
        const products = await Product.find()

        res.status(200).json({
            total:products.length,
            products,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the product by primary key
         await Product.findByIdAndDelete(productId);

        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const productUpdate = async (req,res) => {
    try {
        
        const { productId } = req.params

        const { image,name,price,category,description,qty } = req.body

        const product = await Product.findByIdAndUpdate(productId,{id:productId,image,name,price,category,description,qty},{new:true})

        if(!product){
            return res.status(404).json({
                stauts:'fail',
                message:'product not found'
            })
        }

        res.status(200).json({
            status:'success',
            mesaage:'product updated succesfully',
            product
        })
       

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { createProduct, getProduct, deleteProduct,productUpdate }