const Cart = require('../model/cartModel');
const Wishlist = require('../model/wishlistModel');

const addToCart = async (req, res) => {
    try {
        const { productId, name, price, image, qty } = req.body;
        const { userId } = req.params;
    
        // Validate required fields
        if (!productId || !name || !price || !image || !qty) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        // Find the cart for the user
        let cart = await Cart.findOne({ userId });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId, cart: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.cart.find(item => item._id.toString() === productId);
        
        if (existingItem) {
            return res.status(400).json({ message: 'Item already exists in the cart' });
        } else {
            // Add the new item to the cart
            cart.cart.push({
                _id: productId,
                name,
                price,
                image,
                qty
            });
            await cart.save();
        }
    
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
}

  

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const existingCart = await Cart.findOne({userId:userId});

        if (!existingCart) {
            return res.status(404).json({
                status: "fail",
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            cart: existingCart,
        });
    } catch (error) {
        console.error(error); // Using console.error for error logging
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

const removeCart = async (req, res) => {
    try {
        
        const { userId } = req.params;
        const { productId } = req.body;

        // Find the cart for the user
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                status: "fail",
                message: "Cart not found",
            });
        }

        const existingItem = cart.cart.find(item => item._id.toString() === productId);

        if(!existingItem){
            return res.status(404).json({
                status: "fail",
                message: "Item not found in the cart",
            });
        }

        // Find and remove the item from the cart
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { cart: { _id: productId } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({
                status: "fail",
                message: "Item not found in the cart",
            });
        }

        res.status(200).json({
            message: "Item removed from cart successfully",
            cart: updatedCart,
        });

    } catch (error) {
        console.log(error); // Using console.error for error logging
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

const addToWishlist = async (req, res) => {
    try {
        const { productId, name, price, image, qty } = req.body;
        const { userId } = req.params;
    
        // Validate required fields
        if (!productId || !name || !price || !image || !qty) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        // Find the cart for the user
        let wishlist = await Wishlist.findOne({ userId });

        // If the cart doesn't exist, create a new one
        if (!wishlist) {
            wishlist = new Wishlist({ userId, wishlist: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = wishlist.wishlist.find(item => item._id.toString() === productId);
        
        if (existingItem) {
            return res.status(400).json({ message: 'Item already exists in the wishlist' });
        } else {
            // Add the new item to the cart
            wishlist.wishlist.push({
                _id: productId,
                name,
                price,
                image,
                qty
            });
            await wishlist.save();
        }
    
        res.status(200).json({ message: 'Item added to wishlist successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
}

const getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const existingWishlist = await Wishlist.findOne({userId:userId});

        if (!existingWishlist) {
            return res.status(404).json({
                status: "fail",
                message: "Wishlist not found",
            });
        }

        return res.status(200).json({
            wishlist: existingWishlist,
        });
    } catch (error) {
        console.error(error); // Using console.error for error logging
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

const removeWishlist = async (req, res) => {
    try {
        
        const { userId } = req.params;
        const { productId } = req.body;

        // Find the cart for the user
        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({
                status: "fail",
                message: "wishlist not found",
            });
        }

        const existingItem = wishlist.wishlist.find(item => item._id.toString() === productId);

        if(!existingItem){
            return res.status(404).json({
                status: "fail",
                message: "Item not found in the wishlist",
            });
        }

        // Find and remove the item from the cart
        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { userId },
            { $pull: { wishlist: { _id: productId } } },
            { new: true }
        );

        if (!updatedWishlist) {
            return res.status(404).json({
                status: "fail",
                message: "Item not found in the wishlist",
            });
        }

        res.status(200).json({
            message: "Item removed from wishlist successfully",
            wishlist: updatedWishlist,
        });

    } catch (error) {
        console.log(error); // Using console.error for error logging
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

const increementCartQuantity = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        // Validate the inputs (Optional but recommended)
        if (!userId || !productId) {
            return res.status(400).json({
                status: "fail",
                message: "User ID and Product ID are required",
            });
        }

        // Find the user's cart
        const user = await Cart.findOne({ userId });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        // Find the item in the cart and increment its quantity
        const itemIndex = user.cart.findIndex(item => item._id.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found in cart",
            });
        }

        // Increment the quantity
        user.cart[itemIndex].qty += 1;

        // Save the updated cart
        await user.save();

        return res.status(200).json({
            status: "success",
            message: "Quantity updated successfully",
            cart: user.cart, // Return the updated cart
        });

    } catch (error) {
        console.error("Error incrementing cart quantity:", error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while updating the quantity",
        });
    }
};




module.exports = {
    addToCart, getCart,removeCart,
    addToWishlist, getWishlist, removeWishlist,
    increementCartQuantity
};
