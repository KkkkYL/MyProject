<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        elevation="8"
        shaped
        class="home-v-card"
      >
        <v-card-title class="headline text-h4">
          欢迎打开基于Nuxtjs开发的视频网站
        </v-card-title>
        <v-card-text>
          <div class="text-explain">
            本项目的视频网站采用Nuxtjs+Vuetify开发。  
          </div>
          <div class="text-explain">
            后台管理系统采用Vue"Swan Song"+Avue已数据驱动组件的形式进行开发。
          </div>
          <div class="text-explain">
            后端接口采用Nestjs框架开发，数据库采用MongoDB，两者通过nestjs-typegoose(底层为Mongoose/nodejs)，将构建的每个模型(new Schema)映射到MongoDB的集合中。
          </div>
          <div class="text-author">
            -Zhu wk
          </div>
          <hr class="my-3" />
          <div class="jump-line-box">
            <a href="http://localhost:3009/api-docs/" target="_blank" rel="noopener noreferrer" class="jump-line-text">
              供后台管理界面调用的服务端API
            </a>
          </div>
          <div class="jump-line-box">
            <a href="http://localhost:3008/api-docs" target="_blank" rel="noopener noreferrer" class="jump-line-text">
              供前端界面调用的服务端API
            </a>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/courses"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style>
body {
  background-color: black;
}
.headline {
  width: 100%;
  text-align: center;
}
.home-v-card {
  margin-top: 100px;
  border: 1px solid red;
}
.text-explain {
  font-size: 27px;
  margin-bottom: 20px;
  height: auto;
  width: 100%;
  text-align: justify;
  line-height: 32px;
}

.text-author {
  width: 100%;
  text-align: right;
  margin-top: 50px;
  color: gray;
  font-size: 24px;

}
.jump-line-text {
  font-size: 24px;
}
.jump-line-box {
  width: 100%;
  height: auto;
  margin-bottom: 4px;
}
</style>
