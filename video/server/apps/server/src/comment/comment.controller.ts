import { Comment } from '@libs/db/models/comment.model';
import { userDocument } from '@libs/db/models/user.model';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { currentUser } from '../auth/current-User';

@Controller('comment')
@ApiTags('用户评论')
export class CommentController {
  constructor(@InjectModel(Comment) private commentModel:ReturnModelType<typeof Comment>){}

  @Get()
  async index(@Query('query') query){
    const params = JSON.parse(query)
    console.log(params,query);
    return await this.commentModel.find().populate('user').sort('-_id').limit(10).where(params.where).setOptions(params.where)
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body,@currentUser() user:userDocument){
    body.user = user._id
    console.log(body)
    return await this.commentModel.create(body)
  }

  @Delete('delete')
  async delete(@Query() id){
    const res = await this.commentModel.deleteOne(id)
    return res
  }
}
