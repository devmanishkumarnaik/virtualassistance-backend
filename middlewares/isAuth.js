import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
        console.log("=== Auth Middleware ===")
        console.log("Cookies:", req.cookies)
        console.log("Headers:", req.headers)
        
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies.token
        
        if(!token && req.headers.authorization){
            token = req.headers.authorization.replace('Bearer ', '')
        }
        
        console.log("Token found:", !!token)
        
        if(!token){
            console.log("No token found in cookies or headers")
            return res.status(401).json({message:"token not found - please login again"})
        }
        
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId
        console.log("User authenticated:", req.userId)

        next()

    } catch (error) {
        console.error("Auth middleware error:", error.message)
        return res.status(401).json({message:"Invalid or expired token - please login again"})
    }
}

export default isAuth