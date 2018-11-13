<template>
  <div class="publish">
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :autoFill="false"
        ref="loadmore">
        <div class="search">
          <input type="text" placeholder="请输入关键字" v-model='search' @keyup.13='searchTitle'>
          <button @click='searchTitle'>搜索</button>
        </div>
        <div class="publish-con">
          <div class="publish-title">
            <div class="article">
              <i class='iconfont icon-paper'></i>
              <span>共<b>{{getAjaxListCount}}</b>篇文章</span>
            </div>
            <div class="setTime" @click='handledata'>
              <span v-if='!timevalue'>全部</span>
              <span v-else>{{timevalue}}</span>
              <i class='iconfont icon-xiayibu'></i>
            </div>
          </div>
          <div class="publish-list" v-if='getAjaxListCount != 0'>
            <dl v-for='(item,key) in getAjaxList' :key='key' @click='pubdetail(item)'>
              <dt>
                <img v-if='!item.img' src="/static/image/home/userhead_big.png" alt="" />
                <img v-else :src="item.img" alt="" />
              </dt>
              <dd>【{{item.type}}】{{item.title}}</dd>
            </dl>
          </div>
          <Nodate v-else></Nodate>
        </div>
      </mt-loadmore>
    <transition-group name="fade">
      <div class="dialog" v-show="isShow" :key='0'>
        <div class="dialog-body">
          <div class="dialog-top">
            <span>时间选择</span>
            <i class='iconfont icon-bt_quxiao_b' @click='remove'></i>
          </div>
          <div id='test-n1'></div>
          <p class='true' @click='trueClick'>确定</p>
        </div>
      </div>
      <div class="dialog" v-show="isShowdatail" :key='1'>
        <div class="dialog-body" id='publish-detail'>
          <div class="dialog-top">
            <span>发布详情</span>
            <i class='iconfont icon-bt_quxiao_b' @click='remove'></i>
          </div>
          <div class="dialog-title">
            <p><b>{{item.title}}</b></p>
            <div class="dialog-status" v-if='number != 0'>
              <div class='dialog-list' v-for='(task,index) in item.task' :index='index'>
                <a v-if='task.state == 1 || task.state == 3 || task.state == 7'>
                  <span class='setImg'><img :src="task.accountlogo" alt=""><b>{{task.accountName}}</b></span>
                  <span class='name'></span>
                  <span class='error'>{{task.statereason}}</span>
                </a>
                <a v-else-if='task.state == 4'>
                  <span class='setImg'><img :src="task.accountlogo" alt=""><b>{{task.accountName}}</b></span>
                  <span class='name'></span>
                  <span class='success'>{{task.statereason}}</span>
                </a>
                <a v-else>
                  <span class='setImg'><img :src="task.accountlogo" alt=""><b>{{task.accountName}}</b></span>
                  <span class='name'></span>
                  <span class='error'>{{task.statereason}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Nodate from '@/components/Common/Nodate.vue'
  export default {
    name: 'bind1',
    data() {
      return {
        isShow: false,
        isShowdatail: false,
        timevalue: '全部',
        pageSize: 1,
        change: '',
        search: '',
        item: {},
        number: 1,
        allLoaded: false,
        bottomStatus: ''
      }
    },
    computed: {
      ...mapGetters([
        'getAjaxListCount',
        'getAjaxList',
        'getAjaxListPageSize'
      ])
    },
    components: {
      Nodate
    },
    created() {
      this.getData()
    },
    methods: {
      handledata() {
        this.isShow = true;
      },
      remove() {
        this.isShow = false;
        this.isShowdatail = false;
      },
      trueClick() {
        this.isShow = false;
        this.isShowdatail = false;
        if (!this.change) {
          this.timevalue = this.getNowFormatDateToDay();
        } else {
          this.timevalue = this.change
        }
        this.pageSize = 1;
        this.allLoaded = false;
        this.getData();
      },
      searchTitle() {
        this.pageSize = 1;
        this.allLoaded = false;
        this.getData();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          this.pageSize += 1;
//          let lastValue = this.getAjaxList.length + this.getAjaxListPageSize;
          let lastValue = this.getAjaxList.length;
          if (lastValue < this.getAjaxListCount) {
            this.getData();
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1000);
      },
      getData() {
        if (this.timevalue == '全部') {
          this.timevalue = ''
        }
        let cal_o = {
          searchContent: this.search.trim(),
          page: this.pageSize,
          time: this.timevalue
        };
        const params = {
          data: this.qs.stringify(cal_o),
          page:this.pageSize
        };
        this.$store.dispatch('actionApiAjaxlist', params);
      },
      pubdetail(item) {
        this.isShowdatail = true;
        this.item = item;
        this.number = item.task.length;
      },
      getNowFormatDateToDay() {
        var date = new Date()
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      initDate() {
        this.laydate.render({
          elem: '#test-n1',
          position: 'static',
          type: "date",
          showBottom: false,
          start: this.getNowFormatDateToDay(),
          done: (value, date, endDate) => {
            this.change = value
          }
        });
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.getNowFormatDateToDay();
        this.initDate();
      })
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';
  .publish {
    padding: .1rem .2rem;
    box-sizing: border-box;
    .search {
      .display-flex();
      .align-item();
      .space-between();
      height: .35rem;
      input {
        .input();
      }
      button {
        .button();
      }
    }
    .publish-con {
      padding: .1rem .2rem;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 5px;
      margin-top: .1rem;
      margin-bottom: .1rem;
      .publish-title {
        .display-flex();
        .align-item();
        .space-between();
        color: @blue-text-color;
        border-bottom: 1px solid @gray-border-color;
        padding-bottom: 10px;
        padding-top: 5px;
        font-weight: 800;
        .article {
          font-size: .14rem;
          b {
            color: @primary-color;
            padding-left: 2px;
            padding-right: 2px;
          }
        }
        .setTime {
          color: @primary-color;
          cursor: pointer;
          i {
            font-size: 12px;
          }
        }
      }
      .publish-list {
        dl {
          .display-flex();
          .align-item();
          margin-top: .12rem;
          dt {
            width: 20%;
            text-align: center;
            img {
              width: 46px;
              height: 46px;
            }
          }
          dd {
            width: 70%;
            margin-left: 5%;
            word-break: break-all;
            color: @blue-text-color;
            font-weight: 800;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            cursor: pointer;
          }
        }
      }
    }
  }

  .dialog {
    .dialog();
    .dialog-body {
      .dialog-body();
      .dialog-top {
        font-size: .14rem;
        color: @blue-text-color;
        position: relative;
        margin-bottom: 10px;
        i {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
      .true {
        .btnp();
        height: .3rem;
        line-height: .3rem;
        margin-top: 10px;
      }
      .dialog-title {
        p {
          border-bottom: 2px solid @gray-border-color;
          padding-bottom: 5px;
          color: @blue-text-color;
        }
        .dialog-list {
          a {
            .display-flex();
            .align-item();
             color: @blue-text-color;
            margin-top: 10px;
            .setImg {
              width: 38%;
              display: block;
              .display-flex();
              .align-item();
              img {
                width: 24%;
              }
              b {
                width: 76%;
                display: block;
                padding-left: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .name {
              width: 32%;
              display: block;
              text-align: left;
              color: #ffb46e;
            }
            .error {
              width: 30%;
              display: block;
              color: #ffb46e;
            }
            .success {
              width: 30%;
              display: block;
              color: @primary-color;
            }
          }
        }
      }
    }
    .dialog-status{
      max-height: 255px;
      overflow-y: auto;
    }
  }

</style>
