module.exports = options =>{
  return async (req,res,next) => {
    //小写复数转大写单数
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}