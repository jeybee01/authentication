module.exports = (sequelize, dataTypes)=>{
    const user = sequelize.define('user', {
        username:{
            type:dataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:dataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:dataTypes.STRING,
            allowNull:false,
        },
    })
    return user;
}