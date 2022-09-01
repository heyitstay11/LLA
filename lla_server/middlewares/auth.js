import jwt from 'jsonwebtoken';


export const getJWTToken = ({ _id }) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


export const requireAuth = async (req, res, next) => {
    const token = req.headers["x-auth-token"];
    
    if(!token){
        return res.status(401).json({ message : "No Token Provided"});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message : "Invalid Token" });
    }
}