require('dotenv').config()
const express=require('express')
const sequelize=require('./db')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const models=require('./models/models')
const router=require('./routes/router')
const path =require('path')
const  errorHandler=require('./middleware/ErrorHandlingMiddelware')


const PORT=process.env.PORT || 5555
const app=express()

app.use(cors())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(express.json())
app.use(fileUpload({}))
app.use('/api',router)


app.use(errorHandler)
const start=async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>{ console.log(`Сервер запустился на ${PORT} порту`)})
    }
    catch (err){
        console.log(err)
    }
}




start()