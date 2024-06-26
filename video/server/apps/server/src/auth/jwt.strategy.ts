import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy,StrategyOptions} from 'passport-jwt'
import {compareSync} from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { User } from '@libs/db/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { BadRequestException } from '@nestjs/common'

export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
  constructor(@InjectModel(User) private userModel:ReturnModelType<typeof User>){
    // jwt的Secret存放在.env文件中，将会对请求头中的jwt进行验证
    super({
      secretOrKey:process.env.SECRET,
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    } as StrategyOptions)
  }
  async validate(id){
    const user = this.userModel.findById(id).select('+password')
    return user
  }
}
