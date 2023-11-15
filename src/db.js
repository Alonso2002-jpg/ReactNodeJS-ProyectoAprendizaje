import mongoose from 'mongoose'

export const connectDB = async () =>{
    try {
    await mongoose.connect('mongodb://127.0.0.1/merndb',{});
    console.log("Connection Sucefull")
    } catch (error) {
        console.log(error)
    }
}