<template lang="">
  <div>
    <v-row>
      <v-col :md="8">
        <h1 class="pa-2 cyan lighten-2">视频详情</h1>
        <div class="pa-3 cyan lighten-3">
          <h2>电影ID：{{id}}</h2>
        </div>
        <div class="pa-3 cyan lighten-4 d-flex  justify-space-between align-center">
          <span class="text-h4 font-weight-black">电影名称：{{episode.name}}</span>
          <LikeBtn type="Course" :object="id"/>
        </div>
        <v-select 
        v-model="currentIndex"
        :items="course.episodes.map((v,i)=>({text:v.name,value:i}))"
        ></v-select>
        <video width="100%" controls :src="episode.file"></video>
      </v-col>
      <v-divider class="divider-inset-max-height" vertical></v-divider>
      <v-col :md="4">
        <!-- 评论卡片（1） -->
        <!-- <v-card class="d-flex justify-space-between pa-2" :color="`rgb(${item.color1},${item.color2},${item.color3})`" v-for="(item,index) of CommentAll" :key="item._id">
          <div class="flex-1">
            <h2><v-icon class="mr-2" hide-details color="cyan">mdi-account</v-icon>{{item.user}}</h2>
            <p>{{item.content}}</p>
          </div>
            <v-btn class="py-3 rounded-lg align-self-end mr-6 mb-1" @click="deleteComment(item._id)">
              <v-icon>mdi-delete-sweep</v-icon>
            </v-btn>
        </v-card>
        <v-divider inset class="mt-12"></v-divider>
        <v-spacer/> -->
        <CommentList type="Episode" :object="episode._id"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CommentList from '../../components/CommentList.vue'
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })
    return {
      id,
      course
    }
  },
  components:{
    CommentList
  },
  data() {
    return {
      currentIndex: 0,
      commentValue:'',
      CommentAll:[]
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  },
}
</script>
<style scoped lang="scss">

</style>

