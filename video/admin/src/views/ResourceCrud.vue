<template lang="">
  <div>
    <avue-crud 
      :data="data.data" 
      :option="option"
      :page="page"
      v-model="obj"
      
      :upload-before="uploadBefore"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
      ></avue-crud>
  </div>
</template>
<script lang="ts">
import { Vue,Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!:string
  data:any = {}
  option:any = {}
  page:any = {
    // pageSize:2,
    pageSizes:[2,5,10],
    total:0
  }
  query:any = {}
  obj: any ={}//图片part新增的obj
  videoobj:any={}

  async fetch(){
    const res = await this.$http.get(`${this.resource}`,{
      params:{
        query:this.query
      },
    })
    this.data = res.data
    this.page.total = res.data.total  
  }
  async fetchOption(){
    const res = await this.$http.get(`${this.resource}/option`)
    this.option = res.data
  }
  async create(row: any,done: any){
    await this.$http.post(`${this.resource}`,row)
    this.$message.success('创建成功!')
    this.fetch()
    done()
  }
  async update(row: { _id: any },index: any,done: () => void){
    await this.$http.put(`/${this.resource}/${row._id}`,row)
    this.$message.success('更新成功!')
    this.fetch()
    done()
  }

  async remove(row: { _id: any }){
    try {
      await this.$confirm('是否确认删除?')
    } catch(e) {
      return
    }
    await this.$http.delete(`${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  async changePage({currentPage,pageSize}:{currentPage:any,pageSize:any}){
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  async changeSort({prop,order}:{prop:any,order:any}){
    if(!order){
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]:order === 'ascending'? 1 :-1
      }
    }
    this.fetch()
  }

  async search(where:any,done:any){
    for(let k in where){
      const field = await this.option.column.find((v: { prop: string })=>v.prop === k)
      if(field.regex){
        where[k]={ $regex: where[k] }
      }    
    }
    this.query.where = where
    this.fetch()
    done()
  }

  async uploadBefore (file: string | Blob,done: () => void) {
        let params = new FormData()
        params.append('file',file)
        let res:any = await this.$http.post('upload',params, {
            headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
        })
        // console.log(res)
        this.obj.cover = res.data.url
        // this.obj.file = res.data.url
        this.$set(this.obj,'file',res.data.url) //this.$set是vue提供的方法在vue2时，可为对象添加未含有的键值对，并立刻响应数据
        done()
    }

  created() {
   this.fetch()
   this.fetchOption() 
  }
}
</script>
<style scoped>
  .el-table{
    margin-top: 10px;
  }
</style>