module.exports = options => {
  const AdminUser = require('../models/AdminUser')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  return async (req,res,next) => {
    const token = (req.headers.authorization||'').split(' ').pop()
    assert(token,401,'请先登录！')
    const {id} = jwt.verify(token,req.app.get('secret'))
    assert(id,401,'请先登录！！')
    req.user = await AdminUser.findById(id)
    // console.log(req.user);
    assert(req.user,401,'请先登录')
    await next()
  }
}