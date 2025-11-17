import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"


const app=express()

// CORS configuration for both local and deployed frontend
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://virtualassistance-frontend.onrender.com",
    // Add your actual frontend domain here
]

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if(!origin) return callback(null, true)
        if(allowedOrigins.indexOf(origin) === -1){
            return callback(null, true) // For development, allow all origins
        }
        return callback(null, true)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}))
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>{
    connectDb()
    console.log("server started")
})

