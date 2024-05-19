import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model:Course
})

@Controller('courses')
@ApiTags('分类')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
  ){}

  @Get('option')
  option(){
    return {
      title:'分类管理',
      column:[
        {prop:'name',label:'分类名称',sortable:true,search:true,regex:true,row:true,span:24},
        {prop:'cover',label:'分类封面图',type:'upload',listType:'picture-img',row:true,action:'upload',width:170}
    ]
    }
  }
}
