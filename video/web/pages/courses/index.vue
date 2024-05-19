<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h2 class="classify">热门视频分类</h2>
    <!-- <h3>{{ courses }}</h3> -->
    <v-row no-gutters style="height: 150px;">
      <v-col v-for="item in courses" :key="item._id" md="3">
        <v-card  class="mx-auto"  max-width="344">
          <router-link :to="`/courses/${item._id}`">
            <v-img :src="item.cover" height="200px"></v-img>
          </router-link>
          <!-- <router-link :to="`/courses/${item._id}`"> -->
            <v-card-title>
            {{ item.name }}
          </v-card-title>
          <!-- </router-link> -->

          <v-card-subtitle>
            {{ item.updatedAt }}
          </v-card-subtitle>

          <v-card-actions>
            <LikeBtn type="Course" :object="item._id"/>
            <v-btn color="orange lighten-2" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import LikeBtn from '~/components/LikeBtn.vue';
export default {
  components: {
    LikeBtn
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return {
      courses: data.data
    }
  },
  data: () => ({
    show: false,
  }),
}
</script>
<style>
.classify {
  margin-top:20px;
  margin-left:60px;
  margin-bottom:20px;
}

.mx-auto {
  margin-bottom:20px;
}
</style>