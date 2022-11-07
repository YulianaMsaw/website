const {Brand}=require('../models/models.js')
const ApiError=require('../error/ApiErrors')
class BrandControllers{

    async create(req,res){

        const {name}=req.query
        if(!name)
        {
            return res.json(ApiError.badRequest('Имя бренда не задано'))
        }
        try {
            const brand=await Brand.create({ name : name})
            return res.json(brand)
        }
        catch (err){
            return res.json(ApiError.badRequest('Бренд с таким именем уже существует'))
        }
    }

    async getAll(req,res){

        const brand=await Brand.findAll()
        return res.json(brand)
    }



}


module.exports=new BrandControllers()