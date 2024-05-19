/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Episode } from './episode.model';

// 打上时间戳，转JSON
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON:{virtuals:true}
  },
})
export class Course {
  @ApiProperty({ description: '分类名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string;

  // @prop({type: ()=>[Episode]})
  // episodes:Episode[];

  //分类与视频进行关联，用于关联查询时将视频一同带出
  @prop({
    ref:'Episode',
    type:()=>[Episode],
    localField:'_id',
    foreignField:'course'
  })
  episodes: Ref<Episode>[];
}
