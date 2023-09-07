import mongoose from 'mongoose';
require('dotenv').config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;


export default async function startDb(){
    try {
        await mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.gc4ly0f.mongodb.net/stock-alert?retryWrites=true&w=majority`);
        console.log('Connected on MongoDB')
    } catch (error) {
        console.log(console.log('Error in connection:' + error))
    }
}