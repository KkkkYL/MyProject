import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
import { Episode } from './episode.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Action {
  @prop({ref:'User'})
  user:Ref<User>

  @prop({enum:['Episode','Course']})
  type:string

  @prop({refPath:'type'})
  object:Ref<Episode|Course>

  @prop({enum:['like','upVote']})
  name:string
}
