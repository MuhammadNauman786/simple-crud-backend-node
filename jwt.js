const jwt = require('jsonwebtoken');


const jwtAuthMiddleWare = (req, res, next) => {

    const authorization = req.headers.authorization;

    if(!authorization) return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "UnAutorized Request"});

    // Extract token from the request header
    const token = authorization.split(" ")[1];

    if(!token) return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "UnAutorized Request"});

     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
     } catch (error) {
        console.error(error);
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Invalid accesss token"});
     }
    
};

// Generate new  JWT token fron user data
const generateToken = (userData) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: userData
    }, process.env.JWT_SECRET);
};

module.exports = {jwtAuthMiddleWare, generateToken};