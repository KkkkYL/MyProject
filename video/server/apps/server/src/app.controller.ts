import { Controller, Get, UseInterceptors,Post, Req, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Post } from '@typegoose/typegoose';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
