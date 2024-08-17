const jwt = require("jsonwebtoken");
const { JWT_SECRET } =  require("./config");

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "Invalid Token"});
        
    }
    const token = authHeader.split(" ")[1];
    
    try {
        const validToken = jwt.verify(token, JWT_SECRET);
        req.userId = validToken.userId;
        next(); 

    } catch(error) {
        return res.status(411).json({});
    }
}

module.exports = { 
    authMiddleware,
};