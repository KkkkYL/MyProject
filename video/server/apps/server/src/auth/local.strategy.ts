import {PassportStrategy} from '@nestjs/passport'
import {Strategy,IStrategyOptions} from 'passport-local'
import {compareSync} from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { User } from '@libs/db/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { BadRequestException } from '@nestjs/common'

export class LocalStrategy extends PassportStrategy(Strategy,'local'){
  constructor(@InjectModel(User) private userModel:ReturnModelType<typeof User>){
    super({
      usernameField:'username',
      passwordField:'password'
    } as IStrategyOptions)
  }
  // 将请求体携带的用户username和password，到数据库中的User集合进行查询，若存在则请求成功
  async validate(username:string,password:string){
    const user = await this.userModel.findOne({username}).select('+password');
    if(!user){
      throw new BadRequestException('找不到用户')
    }
    
    if (!compareSync(password,user.password)){
      throw new BadRequestException('密码错误!')
    }
    return user
  }
}
