import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', ()=> console.log("DATABASE CONECTADA"));
    await mongoose.connect(`${process.env.MONGODB_URI}/medreserva`)
}

export default connectDB