import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import {hashSync} from 'bcryptjs'

export type userDocument = DocumentType<User>
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  [x: string]: any;
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string;

  @ApiProperty({ description: '密码', example: 'password1' })
  @prop({
    select:false,
    set(val){
      return val?hashSync(val):val
    }
  })
  password: string;
}
