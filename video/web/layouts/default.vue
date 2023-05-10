<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped :class="$vuetify.theme.dark?'':'drawer'">
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="item.link"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text-darken-1">订阅</v-subheader>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.text" link>
            <v-list-item-avatar>
              <img
                :src="
                  `https://randomuser.me/api/portraits/men/${item.picture}.jpg`
                "
                alt=""
              />
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>
        <v-list-item link class="mt-4" v-if="$store.state.auth.user">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">欢迎你：{{$store.state.auth.user.username}}</v-list-item-title>
        </v-list-item>
        <v-list-item link class="mt-4"  @click="isShowLoginForm=true" v-if="!$store.state.auth.user">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-login-variant</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">登录</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense height="80px">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="ml-4 mr-16 blue--text">fab fa-youtube</v-icon>
      <v-toolbar-title class="ml-16 align-center">
        <v-icon class="ml-16 mr-4 cyan--text text-darken-4 text-xl-h3">mdi-apple-keyboard-command</v-icon>
        <span class="title">视频网站</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width:650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details=""
        />
      </v-row>
      <v-spacer/>
      <v-switch hide-details color="indigo" inset v-model="$vuetify.theme.dark"></v-switch>
    </v-app-bar>

    <v-main>
      <nuxt-child />
    </v-main>
    <v-bottom-sheet
      v-model="isShowLoginForm"
      inset
    >
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-form class="pa-3" @submit.prevent="login">
          <v-text-field v-model="loginModel.username" label="用户名"></v-text-field>
          <v-text-field v-model="loginModel.password" label="密码" type="password"></v-text-field>
          <v-btn color="success" type="submit">提交</v-btn>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>

<script>

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    isShowLoginForm: false,
    loginModel:{},
    items: [
      { icon: 'home', text: '首页', link: '/' },
      { icon: 'trending_up', text: '热门课程', link: '/courses' },
      { icon: 'subscriptions', text: '热门评论', link: '/comments' }
    ],
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' }
    ]
  }),
  methods: {
    async login(){
      const {data:res} = await this.$auth.loginWith('local',{
        data:this.loginModel
      })
      console.log(res);
      this.loginModel = {}
    }
  },
  created(){
    this.$vuetify.theme.dark = false
  }
}
</script>

<style scoped>
.drawer{
  border-right: 2px solid #E9EBEC;
}
</style>