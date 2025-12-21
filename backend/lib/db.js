import mongoose from "mongoose"
import { ENV } from "../lib/env.js"

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("Database connected successfully!", conn.connection.host)
    } catch (error) {
        console.error("Error in connecting the database!", error)
        process.exit(1);
    }
}