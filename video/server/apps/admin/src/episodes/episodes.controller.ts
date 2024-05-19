import { Controller, Get } from '@nestjs/common';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model:Episode
})

@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly courseModel: ReturnModelType<typeof Course>
  ){}

  @Get('option')
  async option(){
    const courses = (await this.courseModel.find()).map(v=> ({
      label:v.name,
      value:v._id
    }))
    // 后台管理系统生成表单列名的数据来源
    return {
      title:'视频管理',
      column:[
        {prop:'course',label:'所属分类',type:'select',row:true,dicData:courses},
        {prop:'name',label:'视频名称',span:24,},
        {prop:'file',label:'视频文件',span:24,type:'upload',action:'upload',listType: 'picture-img',width:120},
      ]
    }
  }
}
