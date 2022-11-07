
const {Type}=require('../models/models.js')
const ApiError=require('../error/ApiErrors')
class TypeControllers{

    async create(req,res){

        const {name}=req.query
        if(!name)
        {
            return res.json(ApiError.badRequest('Имя типа не задано'))
        }
        try {
            const type=await Type.create({ name : name})
            return res.json(type)
        }
        catch (err){
            return res.json(ApiError.badRequest('Тип с таким именем уже существует'))
        }
    }

    async getAll(req,res){

        const type=await Type.findAll()
        return res.json(type)
    }

}


module.exports=new TypeControllers()