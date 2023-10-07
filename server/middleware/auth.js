import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.headers("Autorization")
        if (!token){
            return res.status(401).json({error: "No token provided"})
        }
        if(token.startswith("Bearer ")){
            token = token.replace("Bearer ", "");
        }
        const verified = jwt.verify(token, "SOME_SECRET");
        req.user = verified;
        next();
    }catch(e){
        res.status(500).json({error: e});
    }
}