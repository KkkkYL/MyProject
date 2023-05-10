<template>
  <div>
  <swiper :options="swiperOption">
    <swiper-slide>
      <img src="../assets/images/ae01b45519913a9d6bad3cc61aea3267.jpeg" alt="" class="w-100">
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/images/1f94fee881592952ee18e287890dd632.jpeg" alt="" class="w-100">
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/images/7bc561bbbcd10782000dd2ebd20ce041.jpeg" alt="" class="w-100">
    </swiper-slide>
    <div class="swiper-pagination text-right pagination-home px-3 pb-1" 
    slot="pagination">
    </div>
  </swiper>
  <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
    <div class="d-flex flex-wrap">
      <div class="nav-item mb-3" v-for="(item,index) in items" :key="index">
        <i :class="`sprite sprite-${item.cn}`"></i>
        <div class="py-2">{{item.name}}</div>
      </div>
    </div>
    <div class="bg-light py-2 fs-sm">
      <i class="sprite sprite-arrow mr-1"></i>
      <span>收起</span>
    </div>
  </div>

  <!-- end of nav icons -->
  <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
    <template #items="{category}">
      <router-link
      tag="div"
      v-for="(news,i) in category.newsList" :key="i" 
      class="py-2 ml-3 fs-lg d-flex"
      :to="`/articles/${news._id}`">
                <span class="text-info">[{{news.categoryName}}]</span>
                <span class="px-2">|</span>
                <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
                <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
      </router-link>
    </template>
  </m-list-card>


  <m-list-card icon="superhero-" title="英雄列表" :categories="HeroCats">
    <template #items="{category}">
      <div class="d-flex flex-wrap" style="margin:0 1rem;">
        <router-link tag="div" :to="`heroes/${hero._id}`" v-for="(hero,i) in category.heroList" :key="i" class="p-2 text-center" style="width: 20%;">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{hero.name}}</div>
        </router-link>
      </div>
    </template>
  </m-list-card>
  <m-card icon="Menu" title="精彩视频"></m-card>
  <m-card icon="Menu" title="图文攻略"></m-card>


  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      items:[
       {name:'爆料站',cn:'news'},{name:'故事站',cn:'story'},{name:'周边商场',cn:'shopping'},
       {name:'体验服',cn:'try'},{name:'新人专区',cn:'newPeople'},{name:'荣耀·传承',cn:'honor'},
       {name:'王者基地',cn:'home'},{name:'公众号',cn:"number"},{name:'版本介绍',cn:'show'},
       {name:'对局环境',cn:'enviroment'},{name:'IP计划',cn:'ip'},{name:'互动',cn:'action'}
      ],
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      },
      newsCats:[],
      HeroCats:[]
    }
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('new/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.HeroCats = res.data
    }
  },
  created() {
    this.fetchHeroCats()
    this.fetchNewsCats()
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.pagination-home{
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    background:map-get($colors,'white');
    &.swiper-pagination-bullet-active{
      background: map-get($colors,'info');
    }
  }
}

.nav-icons{
  border-top:1px solid $border-color;
  border-bottom:1px solid $border-color;
  .nav-item{
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n){
      border-left:none;
    }
  }
}

</style>



