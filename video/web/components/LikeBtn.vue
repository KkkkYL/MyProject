<template lang="">
  <div>
    <v-btn icon :color="status?'pink':null" @click="toggle">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
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
    }
  },
  data() {
    return {
      status:false
    }
  },
  methods:{
    async getStatus(){
      const ret = await this.$axios.$get('/action/status',{
        params:{
          type:this.type,
          object:this.object,
          name:'like'
        }
      })
      this.status = ret.status
    },
    async toggle(){
      const ret = await this.$axios.$post('/action/toggle',{
        type:this.type,
        object:this.object,
        name:'like'
      })
      this.status = ret.status
      console.log(ret);
    }
  },
  mounted() {
    this.getStatus()
  },
}
</script>
<style lang="">
  
</style>