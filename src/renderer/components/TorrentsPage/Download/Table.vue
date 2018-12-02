<template>
 <div class = "table"> 
<table class="container">
      <tr>
        <th> </th>
        <th>File</th> 
        <th>Category</th>
        <th>Priority</th>
      </tr>
      <tr v-for="item in down">
        <td>
          <b-form-checkbox v-model="item.check">
        </b-form-checkbox>
        </td>
        
        <td> {{item.filename}}  </td>
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
      </table>
      {{this.down}}

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
    height: 250px;
    overflow: auto;
}
.container {
    width: 80%;
    height: 10px;
}
.fixed_header{
    width: 400px;
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

.fixed_header thead {
  background: black;
  color:#fff;
}

.fixed_header th, .fixed_header td {
  padding: 5px;
  text-align: left;
  width: 200px;
}
</style>
