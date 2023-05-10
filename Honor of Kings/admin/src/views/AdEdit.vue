<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="广告">
          <el-button size="small" @click="model.items.push({})" style="margin-bottom: 2rem;"><i class="el-icon-plus">添加技能</i></el-button>
            <el-row type="flex" style="flex-wrap: wrap;">
              <el-col :md="8" v-for="(item,i) in model.items" :key="i" class="bdd">
                <el-form-item :label="`第`+ i +`个URL链接`">
                  <el-input v-model="item.url"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(item,'image',res.url)"
                    >
                    <img v-if="item.image" :src="item.image" class="avatar" >
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="small" class="delete"
                   @click="model.items.splice(i,1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>        
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    id:{}
  },
  data() {
    return {
      model:{
        items:[]
      },
      // parents:[]
    }
  },
  methods: {
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/ads/${this.id}`,this.model)
        this.$router.push('/ads/list')
        this.$message({
          type:'success',
          message:'修改成功'
        })
      } else {
        const res = await this.$http.post('rest/ads',this.model)
        console.log(res);
        this.$router.push('/ads/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      }
      console.log(res);
    },
    async fetch(){
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({},this.model,res.data)
      // this.model = {...this.model,...res.data}
      console.log('111',this.model);
    },
    // async fetchParents(){
    //   const res = await this.$http.get(`rest/ads`)
    //   this.parents = Object.assign({},this.model,res.data)
    // }
  },
  created() {
    // this.fetchParents()
    this.id && this.fetch()
  },
}
</script>

<style scoped>
.delete{
  margin-left: 120px;
}
.el-row .el-form-item{
  margin-bottom: 15px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 338px;
  height: 10rem;
  line-height: 10rem;
  text-align: center;
}
.avatar {
  width: 338px;
  height:10rem;
  display: block;
}
</style>