import { User, userDocument } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport'
import { loginUser } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { currentUser } from './current-User';

@Controller('auth')
@ApiTags('用户')
export class AuthController { 
  constructor(
    private jwtService:JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}
  @Post('register')
  @ApiOperation({summary:'注册'})
  async register(@Body() dto: User) {
    const {username,password} = dto;
    const user = await this.userModel.create({
      username,
      password
    })
    return user;
  }

  @Post('login')
  @ApiOperation({summary:'登录'})
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: loginUser,@currentUser() user:userDocument) {
    return {
       token:this.jwtService.sign(String(user._id))
    }
    // return req.user;
  }

  @Get('user')
  @ApiOperation({summary:"查看指定用户信息"})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async checkOne(@currentUser() user:userDocument){
    return user
  }

  @Get('checkAll')
  @ApiOperation({summary:'查看所有用户信息'})
  async checkAll(){
    return await this.userModel.find()
  }
}
