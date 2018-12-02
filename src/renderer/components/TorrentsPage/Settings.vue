<template>
  <div style="overflow:auto">
    <header >
      <div class="settingheader">
      Settings
      </div>
    </header>
    <div>

    <b-card title="User interface Settings">
        <label>Change Theme </label>
        <b-form-select v-model="selectedTheme">
        <option v-for="item in themes">
        {{item}}
        </option>
        </b-form-select>

        <label>Change Font</label>
        <b-form-select v-model="selectedFont" >
        <option v-for="item in fonts">
        {{item}}
        </option>
        </b-form-select>

        <label>Change Language</label>
        <b-form-select v-model="selectedLanguage">
        <option v-for="item in languages">
        {{item}}
        </option>
        </b-form-select>
  </b-card>

<br>
<b-card title="Download/Upload Limit">
    <b-container class="bv-example-row">
    <b-row>
        <b-col>
           <b-input-group  prepend="Max Down limit" append="MBp/s">
    <b-form-input min="0" type="number" v-on:change="updateDown" v-model="down"></b-form-input>
  </b-input-group>
        </b-col>
        <b-col>
           <b-input-group  prepend="Max Up limit" append="MBp/s">
    <b-form-input min="0" type="number" v-on:change="updateUp" v-model="up"></b-form-input>
  </b-input-group>
        </b-col>
    </b-row>
</b-container>  
</b-card>

<br>

<b-card title="Data Usage">
<b-container>
<b-alert show variant="info"> 
  Period: {{formatDate(time[0])}} - {{formatDate(time[1])}}
  </b-alert>
<br>
<label>Date Range</label>
 <date-picker 
    v-model="time" 
    range :shortcuts="shortcuts" 
    lang="en"
    :not-after="after"
    confirm-text="OK"
    confrim="true"
    v-on:input="genGraph"
    ></date-picker>

      <br>     
      <h5 style="text-align:center"> Data Usuage over time </h5>
      <svg id="graph"></svg>


</b-container>

<b-alert v-if="maxUsage == null" show variant="primary">
Total usage in period {{usage}} GB  
</b-alert>

<b-alert v-if="Number(usage) <= Number(maxUsage)" show variant="success">
Total usage in period {{usage}} GB  
</b-alert>

<b-alert v-if="Number(usage) > Number(maxUsage) && maxUsage != null " show variant="danger">
Total usage in period {{usage}} GB  

</b-alert>


  <b-input-group  prepend="Max Usage Limit" append="GB">
    <b-form-input min="0" type="number" v-model="maxUsage" v-on:change="updateMax"></b-form-input>
  </b-input-group>


<br>



<b-progress v-if="maxUsage != null"  :max="Number(maxUsage)" 
 show-progress animated show-value
>
<b-progress-bar v-if="Number(usage) <= Number(maxUsage)*0.66" :value="Number(usage)" variant="success"></b-progress-bar>
<b-progress-bar v-if="Number(usage) > Number(maxUsage)*0.66 && Number(usage) < Number(maxUsage)" :value="Number(usage)" variant="warning"></b-progress-bar>
<b-progress-bar :value="Number(usage) > Number(maxUsage)" variant="danger"></b-progress-bar>
</b-progress>


</b-card>
  </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
import * as d3 from 'd3'
import DatePicker from 'vue2-datepicker'
import translate from 'translate'
import { mapActions } from 'vuex'

export default {
  name: 'settings',
  props: ['show'],
  components: {DatePicker},
  mounted: function () {
  this.$nextTick(function () {
    this.genGraph()
  })
  },
  watch: {
    selectedTheme: function(currentValue) { this.changeTheme() },
    selectedFont: function(currentValue) { this.changeFont() },
    selectedLanguage: function(currentValue) { this.changeLang() },
  },
  data () {
    let now = new Date
    return {
      margin: {top: 20, right: 50, bottom: 40, left: 50},
      width: 680 - 70,
      height: 300 - 50,
      usage: null,
      time: [new Date(now.getFullYear(), now.getMonth()), now],
      after: new Date,
      shortcuts: [
        {
          text: 'Today',
          onClick: () => {
            this.time = [ new Date(), new Date() ]
          }
        }
      ],
      timePickerOptions:{
        start: '00:00',
        step: '00:30',
        end: '23:30'
      },
      selectedTheme: this.$store.getters.getThemes,
      selectedFont: this.$store.getters.getFonts,
      selectedLanguage: this.$store.getters.getLanguages,
      maxUsage: this.$store.getters.getUsage,
      languages: ['English', 'French', 'Spanish'],
      fonts: ['Arial','Courier','Geneva','Georgia','Helvetica','Roboto','Times New Roman','Verdana'],
      themes: ['Light', 'Dark', 'Blue'],
      up: this.$store.getters.getUp,
      down: this.$store.getters.getDown
    }
  },
  created () {
    this.genGraph()
  },
  methods: {
    ...mapActions([
      'change_lang',
      'change_font',
      'change_theme',
      'change_down',
      'change_up',
      'change_max'
      ]),
    onChange(range) {
      this.range = range;
    },
    setRange (p) {
      if (typeof p === 'number') {
        console.log(p)
        this.range = {
          startDate: moment().add(p, 'days'),
          endDate: moment()
        }
      }
    },
    genGraph () {
      d3.select("g").remove()

      let parseTime = d3.timeParse('%d-%b-%y')
      let data = this.genData()
      
      data.forEach( (d) => {
        d.date = parseTime(d.date)
      })
      
      var x = d3.scaleTime().range([0, this.width])
      var y = d3.scaleLinear().range([this.height, 0])
      
      var valueline = d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.value) })
      
      let svg = d3.select('#graph')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform","translate(" + this.margin.left + "," + this.margin.top + ")")
      
      x.domain(d3.extent(data, function(d) { return d.date; }))
      y.domain([0, d3.max(data, function(d) { return Math.max(d.value) })])
    
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .attr('fill','none')
      .attr('stroke', 'blue')

    svg.append("g").attr("transform", "translate(0," + this.height + ")").call(d3.axisBottom(x))
    
    svg.append("g").call(d3.axisLeft(y))

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", this.width/2 +7)
    .attr("y", this.height + 30)
    .text("Time (Days)")

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Data Used (GB)")

    this.usage = parseFloat(data[data.length - 1 ].value).toPrecision(4)
    //change state in actions
    
    },
    genData () {
      let r = d3.randomExponential(0.8)
      let x = 0
      let data = []
      for (var m = moment(this.time[0]); m.isBefore(moment(this.time[1]) + 1); m.add(1, 'days')) {
        x += Math.abs(r())
        let y = m.format('DD-MMM-YY')
        data.push({ date: y.toString(), value: x })
      }
      return data
    },
    changeTheme (){
    let back = ''
    let color = ''
    if(this.selectedTheme == 'Blue'){
      back = '#0c87eb'
      color = '#fff'
    }
    else if (this.selectedTheme == 'Dark'){
      back = '#575757'
      color = '#fff'
    }
    var all = document.getElementsByTagName("*")
    document.querySelectorAll('*').forEach(function(node) {
    if (node.style != undefined ){
       node.style.backgroundColor = back 
       node.style.color = color
      }
    })
    this.change_theme({value: this.selectedTheme})
    },
    changeFont () {
    let fontfam = ''
    this.change_font({value: this.selectedFont})

    switch (this.fonts.indexOf(this.selectedFont)) {
      case 0:
      fontfam = 'Arial, Helvetica, sans-serif'
      break
      case 1:
      fontfam = '"Courier New", Courier, monospace'
      break
      case 2:
      fontfam = 'Tahoma, Geneva, sans-serif'
      break
      case 3: 
      fontfam = 'Georgia, serif'
      break
      case 4: 
      fontfam = '"Trebuchet MS", Helvetica, sans-serif'
      break
      case 5:
      fontfam = ''
      break
      case 6:
      fontfam = '"Times New Roman", Times, serif'
      break
      case 7:
      fontfam = 'Verdana, Geneva, sans-serif'
      break
    }
    document.querySelectorAll('*').forEach(function(node) {
    if (node.style != undefined ){
       node.style.fontFamily = fontfam
      }
      //change state in actions
      // console.log(this.selectedFont)

    })

    },
    formatDate (today) {
      return moment(today).format("MMM Do YYYY")
    },
    changeLang () {
      //change state in action
      this.change_lang({lang : this.selectedLanguage})
      // let lang = ''
      // if (this.selectedLanguage == 'English'){lang = 'en'}
      // if (this.selectedLanguage == 'French'){lang = 'fr'}
      // if (this.selectedLanguage == 'Spanish'){lang = 'es'}
      // document.querySelectorAll('*').forEach(function(node) {
      //   // console.log(node)
      // if (node.textContent != null  ){
      //  translate(node.textContent, lang).then(text => {
      //   console.log(text);  // Hola mundo
      //   // node.textContent = text
      // });
      // }
    // })
    },
    updateDown() {
      //change state using actions
    this.change_down({value: this.down})
    },
    updateUp() {
      //change state using actions
    this.change_up({value: this.up})

    },
    updateMax() {
      //change state using acitons
    this.change_max({value: this.maxUsage})

    }
  }
}
</script>
<style scoped>
/* @import 'element-theme-chalk'; */
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  .line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
.settingheader
{
  height: 100%;
  font-size: 20px;
  opacity: 0.7;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  color: white;
  /* position: fixed; */
}

</style>
