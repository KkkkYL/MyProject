import { Action } from '@libs/db/models/action.model';
import { userDocument } from '@libs/db/models/user.model';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { currentUser } from '../auth/current-User';

@Controller('action')
@ApiTags('用户行为')
export class ActionController {
  constructor(@InjectModel(Action) private actionModel:ReturnModelType<typeof Action>){}

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto,@currentUser() user:userDocument){
    dto.user = user._id
  const count = await this.actionModel.countDocuments(dto)
    return {
      status: count > 0
    }
  }

  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async toggle(@Body() body,@currentUser() user:userDocument){    
    //方法1
    body.user = user._id
    const res = await this.getStatus(body,user)
    if(res.status){
      await this.actionModel.deleteMany(body)
    } else {
      await this.actionModel.create(body)
    }
    return await this.getStatus(body,user)


    //方法2
    // body.id = user._id
    // const result = await this.actionModel.findOne(body)
    // if(result){
    //   await this.actionModel.deleteMany(body)
    //   return {
    //     status:false
    //   }
    // }  else {
    //   await this.actionModel.create(body)
    //   return {
    //     status:true
    //   }
    // }
  }
}
