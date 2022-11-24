require('dotenv').config()
const ApiError=require('../error/ApiErrors')
const bcrypt=require('bcrypt')
const {User,Basket}=require('../models/models')
const  {body,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')

const  generateAccessToken=(id,roles)=>{

    const payload={
        id,
        roles
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"})
}
const maxAge=60 * 60 * 1000 * 24 * 365  // one year
const signed=true

class UserControllers{


    async registration(req,res,next){

        try{
            const {email, password, role}=req.body
            const  errors=validationResult(req)
            if(!errors.isEmpty())
            {
                console.log(errors.errors[0].msg)
                return next(ApiError.badRequest(errors.errors[0].msg))
            }
            const hashPassword=bcrypt.hashSync(password,10)
            const candidate= await User.findOne({where: {email:email}});

            if(candidate){
                return next(ApiError.badRequest('пользователь с таким email уже существует'))
            }
            const  user=await User.create({email, password:hashPassword, role})
            const basket=await Basket.create({userId:user.id})

            res.cookie('basketId',basket.id, {maxAge,signed})
            console.log(2)
            const token=generateAccessToken(user.id, user.role)
            return res.json({token})
        }catch (err) {
            return  next(ApiError.badRequest('Не удалось создать пользователя'))
        }

    }

    async getOne(id) {
        const user = await User.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }

    async login(req,res,next){

        try {

            const {email,password}=req.body
            const user=await User.findOne({where:{email}})
            if(!user){
                return next(ApiError.badRequest('Пользователь не зарегестрирован'))
            }
            const  validPassword=bcrypt.compareSync(password, user.password)
            if(!validPassword)
            {
                return (res.status(401).json({message : "Неверный пароль"}))
            }
            const token=generateAccessToken(user.id, user.role)
            return  res.json({token})

        }catch (err)
        {
            return (ApiError.badRequest('Не удалось залогинеться'))
        }
    }

    async check(req,res,next){
        const token=generateAccessToken(req.user.id, req.user.roles)
        return res.json({token})
    }

}


module.exports=new UserControllers()