<template lang="">
  <div>
    <h3>{{isNew?'创建':'编辑'}}课程</h3>
    <el-form label-width="100px">
      <el-form-item label="课程名称">
        <el-input placeholder="请输入课程名称"  v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="课程封面图">
        <el-input placeholder="请输入课程封面图"  v-model="data.cover"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(data)">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue,Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CourseEdit extends Vue {
  @Prop(String) id!:string
  data = {}
  fields = {
    name:{label:'课程名称',type:'input'},
    cover:{label:'课程封面图',type:'input'}
  }

  get isNew(){
    return !this.id
  }

  async onSubmit(data: any) {
      const url = this.isNew?`courses`:`courses/${this.id}`
      const method = this.isNew? `post`:`put`
      await this.$http[method](url,data)
      this.$message.success('保存成功')
      this.data= {}
      this.$router.go(-1)
  }

  async fetch(){
    const res = await this.$http.get(`courses/${this.id}`)
    this.data = res.data
  }
  created() {
    // if(!this.isNew){
    //   this.fetch()
    // }
    !this.isNew&&this.fetch()
  }
}
</script>
<style scoped>
.el-form{
  margin: 100px 100px 0 300px;
}
.el-input{
  width: 700px;
}
</style>