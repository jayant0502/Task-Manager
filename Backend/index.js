const express= require('express')
const app =express();
const path = require('path')
const envPath=path.resolve(__dirname,"../.env")
const dotenv=require('dotenv');
dotenv.config({path:envPath})
require('./config/db')
const PORT=process.env.PORT;
const userRoutes=require('./routes/userRoutes')
const taskRoutes=require('./routes/taskRoutes')


app.use(express.json())
app.use('/users',userRoutes)
app.use('/task',taskRoutes)

app.get('/',(req,res)=>{
    res.json({message:'Task Manager API is working'})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`)
})