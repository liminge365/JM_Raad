<template>
  <div class="whole">
    <targetBar class="zhibiaoTime" :targetBar='zhibiaoTime'></targetBar>
    <targetBar class="zhibiaoType" :targetBar='zhibiaoType'></targetBar>
    <div class="readnum">
      <h3>{{dataName}}总数</h3>
      <p><span>{{dataName}}总数<b>{{getMobileAjaxCountData.count}}</b></span><span>昨日新增<b>{{getMobileAjaxCountData.incr}}</b></span></p>
    </div>
    <div class="chart">
      <section class="chartTitle">
        <i class="iconfont icon-xiaoshouqushi"></i>每日阅读趋势
        <span @click="$('.zhibiaoTime').show()">近{{interval}}天<i class="iconfont icon-xiayibu"></i></span>
        <span @click="$('.zhibiaoType').show()" style="margin-right:10px;">{{dataTitle}}<i class="iconfont icon-xiayibu"></i></span>
      </section>
      <div id="container" style=" width:100%;height: 200px" v-show='echartsShow'></div>
      <Nodate v-show='noDataShow'></Nodate>
    </div>
    <div class="wholeList" v-show='echartsShow'>
      <p><span>时间</span><span>阅读数</span></p>
      <ul class="content">
        <li>
          <span v-for='(item,index) in getDays'>{{item}}</span>
        </li>
        <li>
          <span v-for='(item,index) in getDatas'>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import targetBar from './targetBar.vue';
  import bus from '@/eventJs/bus.js'
  import Nodate from '@/components/Common/Nodate.vue'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'whole',
    components: {
      targetBar,
      Nodate
    },
    data() {
      return {
        option: null,
        dataType: 'read',
        interval: 30,
        dataTitle: '阅读量',
        dataName:'阅读',
        noDataShow:false,
        echartsShow: true,
        getDays:[],
        getDatas:[],
        zhibiaoTime: {
          name: '指标选择',
          zuId: 1,
          list: [{
              name: '最近30天',
              id: 1,
              type: 30
            },
            {
              name: '最近15天',
              id: 2,
              type: 15
            },
            {
              name: '最近7天',
              id: 3,
              type: 7
            }
          ],
        },
        zhibiaoType: {
          name: '指标选择',
          zuId: 2,
          list: [
            {
              name: '阅读量',
              allName:'阅读',
              id: 1,
              type: 'read'
            },
            {
              name: '文章数',
              allName:'文章',
              id: 2,
              type: 'article'
            },
            {
              name: '同步数',
              allName:'同步',
              id: 3,
              type: 'release'
            },
            {
              name: '推荐量',
              allName:'推荐',
              id: 4,
              type: 'recommend'
            },
            {
              name: '评论量',
              allName:'评论',
              id: 5,
              type: 'comment'
            },
            {
              name: '转发量',
              allName:'转发',
              id: 6,
              type: 'repost'
            },
            {
              name: '收藏量',
              allName:'收藏',
              id: 7,
              type: 'collect'
            },
            {
              name: '点赞量',
              allName:'点赞',
              id: 8,
              type: 'like'
            },
          ],
        },
      }
    },
    computed: {
      ...mapGetters([
        'getAjaxDetailData',
        'getMobileAjaxCountData'
      ])
    },
    created() {
      this.loadData();
      this.countData();
      bus.$on('Whole', this.getData)
    },
    beforeDestroy () {
      bus.$off('Whole',this.getdata)
    },
    methods: {
      getData(msg){
        if (msg.zuId == 1) {
          this.zhibiaoTime.list.map((value, index) => {
            if (value.id == msg.ulli_Id) {
              this.interval = value.type;
              this.countData();
              this.loadData();
            }
          })
        } else if (msg.zuId == 2) {
          this.zhibiaoType.list.map((value, index) => {
            if (value.id == msg.ulli_Id) {
              this.dataType = value.type;
              this.dataTitle = value.name;
              this.dataName = value.allName;
              this.countData();
              this.loadData();
            }
          })
        }
      },
      //折线图
      drawLine(res) {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        let datas, days, min, max, minData, maxData, minDigit, maxDigit;
        // 计算y轴刻度
        if (res) {
          datas = res.datas;
          days = res.days;
          // minData = datas[0];
          // maxData = datas[datas.length - 1];
          minData = Math.min.apply(null,datas);
          maxData = Math.max.apply(null,datas);
          minDigit = String(minData).length;
          maxDigit = String(maxData).length;
          if (minDigit == maxDigit) {
            min = Math.floor(minData / Math.pow(10, minDigit - 2)) * Math.pow(10, minDigit - 2);
            max = Math.ceil(maxData / Math.pow(10, maxDigit - 2)) * Math.pow(10, maxDigit - 2);
          } else {
            min = Math.floor(minData / Math.pow(10, minDigit - 1)) * Math.pow(10, minDigit - 1);
            max = Math.ceil(maxData / Math.pow(10, maxDigit - 2)) * Math.pow(10, maxDigit - 2);
          }
          this.option = {
            grid: {
              top: '10%',
              left: '3%',
              right: '2%',
              bottom: '3%',
              containLabel: true
            },
            textStyle: {
              fontSize: 12,
              color: '#858B8B',
              fontWeight: 'normal'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: days,
              axisLine: {
                lineStyle: {
                  color: '#858B8B'
                }
              }
            },
            yAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#858B8B'
                }
              },
              axisLabel: {        
                  formatter: (value)=>{
                    if(value <= 1000){
                      value = value
                    }else{
                      value = value/1000 + 'k'
                    }
                    return value; 
                  }         
              },
              min: min,
              max: max,
              interval: (max - min) / 5
            },
            series: [{
              name: this.dataTitle,
              type: 'line',
              stack: '总量',
              data: datas
            }]
          };
          if (this.option && typeof this.option === "object") {
            myChart.setOption(this.option, true);
          }
        }
      },
      isEmpty(obj){
          if (obj === null || obj === undefined || (typeof obj === "string" && obj.toLowerCase() === "null") || obj === "" || obj === 0 || obj.length === 0) {
              return true;
          } else {
              return false;
          }
      },
      isZero(obj) {
          if (obj === 0 || obj === '0') {
              return true;
          }
          if (Array.isArray(obj)) {
              for (var i = 0; i < obj.length; i++) {
                  if (obj[i] !== 0 && obj[i] !== '0') {
                      return false;
                  }
              }
              return true;
          }
          return false;
      },
      loadData() {
        let cal_o = {
          dataType: this.dataType,
          interval: this.interval
        };
        const params = {
          data: this.qs.stringify(cal_o),
        };
        params.callback = (res) => {
          if(this.isEmpty(res.datas) || this.isZero(res.datas)){
             this.noDataShow = true;
             this.echartsShow = false;
          }else{
             this.noDataShow = false;
             this.echartsShow = true;
             this.drawLine(res);
             this.getDays = res.days.reverse();
             this.getDatas = res.datas.reverse();
          }
        }
        this.$store.dispatch('actionApiAjaxDetailData', params);
      },
      countData(){
        let cal_o = {
          dataType: this.dataType
        };
        const params = {
          data: this.qs.stringify(cal_o),
        };
        this.$store.dispatch('actionApiMobileAjaxCountData', params);
      }
    },
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';
  .whole {
    .icon-xiayibu::before {
      font-size: 12px;
      color: @primary-color;
      display: inline-block;
      transform: rotate(90deg);
      margin-left: 5px;
    }
    .readnum {
      background-color: #fff;
      border-radius: 5px;
      padding: 18px 20px 40px;
      box-sizing: border-box;
      h3 {
        font-size: 14px;
        color: @blue-text-color;
        font-weight: normal;
      }
      p {
        margin-top: 20px;
        span {
          width: 50%;
          display: inline-block;
          padding-left: 8px;
          box-sizing: border-box;
          color: @gray-text-color;
          .ellipsis();
          b {
            font-weight: 400;
            color: @primary-color;
            padding-left: 2px;
          }
        }
      }
    }
    .chartTitle {
      border-bottom: 1px solid #d7dcdc;
      height: .3rem;
      line-height: .3rem;
      color: @blue-text-color;
      span {
        float: right;
        color: @primary-color;
      }
    }
    .chart,
    .wholeList {
      background-color: #fff;
      border-radius: 5px;
      padding: 18px 20px 40px;
      box-sizing: border-box;
      margin-top: 10px;
    }
    .wholeList {
      p{
        .display-flex();
        span{
          width:50%;
          text-align: center;
          color: @blue-text-color;
          display:block;
          height: .3rem;
          line-height: .3rem;
        }
      }
      .content{
        .display-flex();
        li{
            width:50%;
            span {
                text-align: center;
                color: @blue-text-color;
                display:block;
                height: .3rem;
                line-height: .3rem;
            }
        }
      }
    }
  }
</style>
