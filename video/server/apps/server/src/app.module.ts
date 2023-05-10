import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from 'libs/common/src/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionModule } from './action/action.module';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    CommonModule,
    CoursesModule,
    AuthModule,
    ActionModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
