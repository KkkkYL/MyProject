import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import {User} from './models/user.model'
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { Action } from './models/action.model';
import { Comment } from './models/comment.model';

const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode,
  Action,
  Comment
])

@Global()
@Module({
  imports:[
    TypegooseModule.forRootAsync({
      //useFactory是用于帮~~~Async结尾的这些异步方法处理promise的
      useFactory(){
        return {
          uri:"mongodb://localhost/topfullstack",
          // useNewUrlParser:true,
          // useUnifiedTopology:true,
          // userCreateIndex:true,
          // useFindAndModify:false
        }
      }
    }),
    // TypegooseModule.forRoot(process.env.DB, {
      // useNewUrlParser:true,
      // useUnifiedTopology:true,
      // useCreateIndex:true,
      // useFindAndMondify:false
    // }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}
