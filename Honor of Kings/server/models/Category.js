const mongoose=require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  parent:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}
})

schema.virtual('children',{
  localField:'_id',
  foreignField:'parent',
  justOne:false,
  ref:'Category'
})

module.exports = mongoose.model('Category',schema)