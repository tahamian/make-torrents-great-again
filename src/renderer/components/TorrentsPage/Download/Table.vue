<template>
 <div class = "table"> 
<table class="container">
    <!-- <thead> -->
      <tr>
        <th> Download File </th>
        <th>File</th> 
        <th>Category</th>
        <th>Priority</th>
      </tr>
    <!-- </thead> -->
    <!-- <tbody> -->
      <tr v-for="item in down">
        <td>
          <b-form-checkbox v-model="item.check">
        </b-form-checkbox>
        </td>    
        <td> {{item.name}}  </td>
        <td>
          <b-form-select v-model="item.category" class="mb-3" >
          <option v-for="category in categories">
          {{category}}
          </option>
          </b-form-select>
        </td>
         <td>
          <b-form-select  value="default" class="mb-3" >
          <option v-for="pr in prior">
            {{pr}}
          </option>
          </b-form-select>
        </td> 
      </tr>
    <!-- </tbody> -->
      </table>

  </div>
</template>

<script>
import config from '../../../../../config.json'
let y = []
      config.TorrentCategories.forEach( (x) => {
        y.push(x.name)
      })
      // console.log(y)
  export default {
    name: 'customTable',
    props: ['down'],
    data () {
      return {
          categories: y,
          prior: ['default', 'high', 'low']
      }
    }
  }
</script>
<style scoped>
.table{
    padding: 20px;
    /* height: 250px; */
    /* table-layout: fixed; */
}
.container table{
  width: 100%;
}
.container thead, tbody{
  display:block;
   
    
}
.container tbody {
  /* overflow: auto; */
  /* height: 100px; */
 

}
.fixed_header {
    table-layout: fixed;
    border-collapse: collapse;
}
.fixed_header tbody{
  display:block;
  width: 100%;
  overflow: auto;
  height: 100px;
}

.fixed_header thead tr {
   display: block;
}



.fixed_header th, .fixed_header td {
  padding: 5px;
  text-align: left;
  width: 200px;
}

/* @import '~vuetify/src/stylus/main' */
</style>
