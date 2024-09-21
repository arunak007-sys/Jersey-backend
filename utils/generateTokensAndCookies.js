// tokenUtils.js
const jwt = require('jsonwebtoken');

const generateTokensAndCookies = (user) => {
    // Generate a JWT token with user data
    const token = jwt.sign(
        { id: user.id},
        process.env.JWT_SECRET, // Make sure this environment variable is set
        { expiresIn: '1h' } // Token expires in 1 hour; adjust as needed
    );
    return token;
};

module.exports = { generateTokensAndCookies };
