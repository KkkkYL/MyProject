<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-tabs value="basic" type="border-card">
          <el-tab-pane label="基础信息" name="basic">
            <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="称号">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="头像" id="touxiang">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res => $set(model,'avatar',res.url)"
            >
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Banner" id="touxiang">
          <el-upload
            id="banner-uploader"
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res => $set(model,'banner',res.url)"
            >
            <img v-if="model.banner" :src="model.banner" class="avatar2">
            <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="model.categories" multiple>
            <el-option v-for="item of categories" :value="item._id"
            :label="item.name" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度">
          <el-rate v-model="model.scores.difficult" :max="9" show-score style="margin-top:0.7rem;"></el-rate>
        </el-form-item>
        <el-form-item label="技能">
          <el-rate v-model="model.scores.skills" :max="9" show-score style="margin-top:0.7rem;"></el-rate>
        </el-form-item>
        <el-form-item label="攻击">
          <el-rate v-model="model.scores.attack" :max="9" show-score style="margin-top:0.7rem;"></el-rate>
        </el-form-item>
        <el-form-item label="生存">
          <el-rate v-model="model.scores.survive" :max="9" show-score style="margin-top:0.7rem;"></el-rate>
        </el-form-item>
        <el-form-item label="顺风出装">
          <el-select v-model="model.items1" multiple>
            <el-option v-for="item of items" :value="item._id"
            :label="item.name" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逆风出装">
          <el-select v-model="model.items2" multiple>
            <el-option v-for="item of items" :value="item._id"
            :label="item.name" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用技巧">
          <el-input type="textarea" v-model="model.useageTips"></el-input>
        </el-form-item>
        <el-form-item label="对战技巧">
          <el-input type="textarea" v-model="model.battleTips"></el-input>
        </el-form-item>
        <el-form-item label="团战思路">
          <el-input type="textarea" v-model="model.teamTips"></el-input>
        </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="技能" name="skills">
            <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus">添加技能</i></el-button>
            <el-row type="flex" style="flex-wrap: wrap;">
              <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="冷却值">
                  <el-input v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="图标" id="touxiang">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res => $set(item,'icon',res.url)"
                    >
                    <img v-if="item.icon" :src="item.icon" class="avatar" >
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="small"
                   @click="model.skills.splice(i,1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="最佳搭档" name="partners">
            <el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus">添加英雄</i></el-button>
            <el-row type="flex" style="flex-wrap: wrap;">
              <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
                <el-form-item label="英雄">
                  <el-select v-model="item.hero" filterable>
                    <el-option 
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="small"
                   @click="model.partners.splice(i,1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-form-item style="margin-top: 1rem;">
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
      categories:[],
      items:[],
      heroes:[],
      model:{
        name:'',
        avatar:'',
        skills:[],
        partners:[],
        scores:{
          difficult:0
        },
      },
    }
  },
  methods: {
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/heroes/${this.id}`,this.model)
        this.$router.push('/heroes/list')
        this.$message({
          type:'success',
          message:'修改成功'
        })
      } else {
        const res = await this.$http.post('rest/heroes',this.model)
        console.log(res);
        this.$router.push('/heroes/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      }
      console.log(res);
    },
    async fetch(){
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      // this.model = Object.assign({},this.model,res.data)
      this.model = {...res.data}
    },
    async fetchCategories(){
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchItems(){
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
    async fetchHeroes(){
      const res = await this.$http.get(`rest/heroes`)
      this.heroes = res.data
    },
  },
  created() {
    this.fetchItems()
    this.fetchCategories()
    this.fetchHeroes()
    this.id && this.fetch()
  },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height:5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height:5rem;
  display: block;
}

/* Banner */
.avatar-uploader-icon2{
  width: 20rem;
  height: 9.2308rem;
  line-height: 9.2308rem;
}

.avatar2 {
  max-width: 20rem;
  height:auto;
  display: block;
}
</style>