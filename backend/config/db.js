import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://harmannsingh1_db_user:x8CTXveadfhSAA68@cluster0.cn1tzrc.mongodb.net/?appName=Cluster0').then(()=>console.log("Database is Connected"))
}


// x8CTXveadfhSAA68

// harmannsingh1_db_user