const bcrypt = require('bcryptjs');
const User = require('../model/authModel');
const { generateTokensAndCookies } = require('../utils/generateTokensAndCookies');

const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already in use' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create the user with plain text password to trigger validation
        const user = await User.create({ username, email, password });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user with hashed password
        user.password = hashedPassword;
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
       console.log(error)
        res.status(500).json({ error: error.message });
    }
};


const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if the user exists
        const user = await User.findOne({username:username});
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // Generate a JWT token
        const token = generateTokensAndCookies(user);
        
        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000 // 1 hour in milliseconds
        });
        
        res.status(200).json({ 
            userId:user._id,
            token,
            message: 'Sign-in successful' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({_id: userId});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true, // Prevent JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict' // Protect against CSRF attacks
        });
        
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
           console.log(error)
        // Handle other errors
        res.status(500).json({ error: error.message });
    }
};


module.exports = { signin, signup,logout}
