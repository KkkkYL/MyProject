const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{ type:String },
  avatar:{ type:String },
  banner:{ type:String },
  title:{ type:String },
  categories:[{ type:mongoose.Schema.ObjectId, ref:'Category'}],
  scores:{
    difficult:{type:Number},
    skills:{type:Number},
    attack:{type:Number},
    survive:{type:Number},
  },
  skills:[{
    icon:{type:String},
    name:{type:String},
    description:{type:String},
    tips:{type:String},
    delay: {type:String },
    cost: {type:String },
  }],
  items1:[{type:mongoose.Schema.ObjectId,ref:'Item'}],
  items2:[{type:mongoose.Schema.ObjectId,ref:'Item'}],
  useageTips:{type:String},
  battleTips:{type:String},
  teamTips:{type:String},
  partners:[{
    hero:{type:mongoose.Schema.ObjectId,ref:'Hero'},
    description:{type:String}
  }]
})

module.exports = mongoose.model('Hero',schema,'heroes')