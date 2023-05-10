<template lang="">
  <div>
    <v-card>
          <v-form @submit.prevent="send">
            <v-text-field
            label="输入内容..."
            v-model="commentValue"
            append-icon="mdi-send"
            @click:append="send"></v-text-field>
          </v-form>
          <v-list>
            <v-list-item v-for="(item,index) of comments" :key="item._id">
              <v-list-item-avatar class="teal lighten-4">
                <v-icon color="indigo darken-4">mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{item.user.username}}</v-list-item-title>
                <v-list-item-subtitle>{{item.content}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-alert
          v-model="alert"
          dismissible
          color="red"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-alert-circle-outline"
          transition="scale-transition"
          prominent
        >
          你发布的评论<strong>不能为空</strong> !
        </v-alert>
        <v-alert
          v-model="remain"
          dismissible
          color="cyan"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-check-circle-outline"
          transition="scale-transition"
          prominent
        >
          你发布的评论<strong>发送成功</strong> !
        </v-alert>
  </div>
</template>
<script>
export default {
  props:{
    type:{
      type:String,
      required:true
    },
    object:{
      type:String,
      required:true
    },
  },
  data() {
    return {
      alert:false,
      remain:false,
      commentValue:null,
      comments:[]
    }
  },
  methods:{
    async send(){
      if(this.commentValue == null) {
        this.alert = true
        return
      }
      const ret = await this.$axios.$post('/comment/create',{
        type:this.type,
        object:this.object,
        content:this.commentValue
      })
      this.remain = true
      this.fetchComment()
      this.commentValue = null
    },

    async fetchComment(){
      this.alert = false
      if(this.remain == true){
        setTimeout(() => {
          this.remain = false        
        }, 3000);
      }
      const ret = await this.$axios.$get('/comment',{
        params:{
          query:{
            where:{
              type:this.type,
              object:this.object
            }
          }
        }
      })
      this.comments = ret
    }
  },
  watch:{
    object:{
      handler:'fetchComment',
      immediate:true
    }
  },
}
</script>
<style lang="">
  
</style>