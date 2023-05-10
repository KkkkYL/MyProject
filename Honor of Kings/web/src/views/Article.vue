<template lang="">
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-2">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">
        11/11
      </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu text-black"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link class="py-1"
        :to="`/articles/${item._id}`" tag="div" 
        v-for="(item,i) in model.related" :key="i">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    id:{ required:true }
  },
  data(){
    return {
      model:null
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  }, 
  watch:{
    id:'fetch'
  },
  created() {
  this.fetch()    
  },
}
</script>
<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.6923rem;
  }
  .body{
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width:100%;
      height: auto;
    }
  }
}
</style>