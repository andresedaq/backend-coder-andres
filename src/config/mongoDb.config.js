import mongoose from "mongoose";

const urlDb = "mongodb+srv://admin:admin123456@e-commerce.itjjvkv.mongodb.net/ecommerce"

export const connectMongoDB = async () => {
    try {
        mongoose.connect(urlDb);
        console.log("Mongo DB Conectado")
    } catch (error) {
        console.log(error)
    }
}