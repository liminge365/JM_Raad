<template>
  <div class="dataAnalysis">
    <mt-header title="数据分析">
      <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
      <span slot="right" @click='dataDown' class='down'>下载报表</span>
    </mt-header>
    <div class="popup_liu" v-show='tipShow'>
      <div class="popup_liumask" @click='popup_liutip'></div>
      <div class="model">
        <h3>下载报表</h3>
        <span>请使用浏览器打开并下载</span>
      </div>
    </div>
    <div class="analysis">
      <div class="whole">
        <targetBar class="zhibiaoType" :targetBar='zhibiaoType'></targetBar>
        <div class="readnum">
          <h3 class="OneshotTitle">{{getAjaxCountData.title}}</h3>
          <p><span>{{dataName}}总数<b>{{getAjaxCountData.count}}</b></span><span>昨日新增<b>{{getAjaxCountData.incr}}</b></span></p>
        </div>
        <div class="chart">
          <section class="chartTitle">
            <i class="iconfont icon-xiaoshouqushi"></i>每日阅读趋势
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
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import targetBar from './targetBar.vue';
  import bus from '@/eventJs/bus.js';
  import Nodate from '@/components/Common/Nodate.vue'
  import {
    ApiSingleData
  } from '../../../api/utils.js'
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
        dataType: 2,
        dataTitle: '阅读量',
        dataName: '阅读',
        corpus_id: '',
        noDataShow: false,
        echartsShow: true,
        tipShow: false,
        getDays: [],
        getDatas: [],
        zhibiaoType: {
          name: '指标选择',
          zuId: 2,
          list: [{
              name: '阅读量',
              allName: '阅读',
              id: 2,
              type: 'read'
            },
            {
              name: '推荐量',
              allName: '推荐',
              id: 1,
              type: 'recommend'
            },
            {
              name: '评论量',
              allName: '评论',
              id: 3,
              type: 'comment'
            },
            {
              name: '转发量',
              allName: '转发',
              id: 4,
              type: 'repost'
            },
            {
              name: '收藏量',
              allName: '收藏',
              id: 5,
              type: 'collect'
            },
            {
              name: '点赞量',
              allName: '点赞',
              id: 6,
              type: 'like'
            },
          ],
        },
      }
    },
    computed: {
      ...mapGetters([
        'getApiCenterData',
        'getAjaxCountData'
      ])
    },
    created() {
      this.corpus_id = this.$route.query.Id;
      this.countData();
      this.loadData();
      bus.$on('OneDataBar', this.getData);
    },
    beforeDestroy() {
      bus.$off('OneDataBar', this.getdata)
    },
    methods: {
      getData(msg) {
        if (msg.zuId == 2) {
          this.zhibiaoType.list.map((value, index) => {
            if (value.id == msg.ulli_Id) {
              this.dataType = value.id;
              this.dataTitle = value.name;
              this.dataName = value.allName;
              this.countData();
              this.loadData();
            }
          })
        }
      },
      lastpage() {
        this.$router.go(-1);
      },
      //折线图
      drawLine(res) {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        let datas, days;
        // 计算y轴刻度
        if (res) {
          datas = res.data;
          days = res.date;
          this.option = {
            grid: {
              top: '10%',
              left: '3%',
              right: '7%',
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
                formatter: (value) => {
                  if (value <= 1000) {
                    value = value
                  } else {
                    value = value / 1000 + 'k'
                  }
                  return value;
                }
              },
            },
            series: [{
              name: this.dataTitle,
              type: 'line',
              stack: '总量',
              data: datas
            }, ]
          };
          if (this.option && typeof this.option === "object") {
            myChart.setOption(this.option, true);
          }
        }
      },
      isEmpty(obj) {
        if (obj === null || obj === undefined || (typeof obj === "string" && obj.toLowerCase() === "null") || obj ===
          "" || obj === 0 || obj.length === 0) {
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
          order: this.dataType,
          corpus_id: this.corpus_id
        };
        const params = {
          data: this.qs.stringify(cal_o),
        };
        params.callback = (res) => {
          if (this.isEmpty(res.data) || this.isZero(res.data)) {
            this.noDataShow = true;
            this.echartsShow = false;
          } else {
            this.noDataShow = false;
            this.echartsShow = true;
            this.drawLine(res);
            this.getDays = res.date.reverse();
            this.getDatas = res.data.reverse();
          }
        }
        this.$store.dispatch('actionApiCenterData', params);
      },
      countData() {
        let cal_o = {
          order: this.dataType,
          corpus_id: this.corpus_id
        };
        const params = {
          data: this.qs.stringify(cal_o),
        };
        this.$store.dispatch('actionApiAjaxSingleCount', params);
      },
      dataDown() {
        let u = navigator.userAgent;  
        let ua = window.navigator.userAgent.toLowerCase(); 
        if(ua.match(/MicroMessenger/i) == 'micromessenger'&&!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){ 
          this.tipShow = true;
        }
        window.location.href =  '/apis/s/dataDownload/singleData?corpus_id=' + this.corpus_id + '&interval=30'
      },
      popup_liutip(){
        this.tipShow = false;
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';
  .dataAnalysis {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .display-flex();
    .column();
    background-color: #eaf2f2;
    .popup_liu {
      .popup_liumask{
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1111;
          background: rgba(10, 0, 0, 0);
      }
      .model {
        width: 88%;
        height: .92rem;
        left: 6%;
        position: fixed;
        top: 50%;
        margin-top: -0.46rem;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        border-radius: 3px;
        text-align: center;
        z-index: 1120;
        h3 {
          padding-top: 15px;
          font-size: .2rem;
          padding-bottom: 10px;
        }
        span {
          font-size: .12rem;
        }
      }
    }
    .analysis {
      .flex();
      padding: 10px 20px;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }

  .down {
    cursor: pointer;
  }

  .whole {
    .chartTitle .icon-xiayibu::before {
      font-size: 12px;
      color: @primary-color;
      display: inline-block;
      transform: rotate(90deg);
      margin-left: 5px;
    }
    .readnum .icon-xiayibu::before {
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
      .OneshotTitle {
        font-size: 14px;
        color: @blue-text-color;
        font-weight: normal;
        padding-left: .1rem;
      }
      p {
        margin-top: 20px;
        .display-flex();
        span {
          width: 50%;
          display: inline-block;
          padding-left: 8px;
          box-sizing: border-box;
          color: @gray-text-color;
          margin-right: .2rem;
          text-align: center;
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
      p {
        .display-flex();
        span {
          width: 50%;
          text-align: center;
          color: @blue-text-color;
          display: block;
          height: .3rem;
          line-height: .3rem;
        }
      }
      .content {
        .display-flex();
        li {
          width: 50%;
          span {
            text-align: center;
            color: @blue-text-color;
            display: block;
            height: .3rem;
            line-height: .3rem;
          }
        }
      }
    }
  }

</style>
