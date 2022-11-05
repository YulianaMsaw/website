const sequelize=require('../db.js')
const { DataTypes} =require("sequelize")

const User=sequelize.define('user',{
    id: { type: DataTypes.INTEGER , primaryKey:true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role:{type: DataTypes.STRING, defaultValue:'user'},
})



const Product=sequelize.define('product',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true, allowNull:false},
    price:{type: DataTypes.INTEGER, allowNull:false},
    rating:{type:DataTypes.INTEGER, defaultValue:0},
    img:{type: DataTypes.STRING, allowNull:false},
})


const  Basket=sequelize.define('basket',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const  BasketProduct=sequelize.define('basketProduct',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const Type=sequelize.define('type',{
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING, unique: true, allowNull: false}
})


const Brand=sequelize.define('brand',{
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, unique: true, allowNull: false},
})

const TypeBrand=sequelize.define('typeBrand',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const ProductInfo=sequelize.define('info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.STRING, allowNull:false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(ProductInfo, {as:'info'})
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports={
    User, Basket, BasketProduct, Product,
        ProductInfo, Type, TypeBrand, Brand
}

