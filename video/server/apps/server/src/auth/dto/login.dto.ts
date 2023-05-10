import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";

export class loginUser {
  @ApiProperty({description:"用户名", example:'user1'})
  @prop()
  username:string;

  @ApiProperty({description:'密码', example:'password1'})
  @prop()
  password:string;
}