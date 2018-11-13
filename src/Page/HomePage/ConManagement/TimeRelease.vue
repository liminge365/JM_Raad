<template>
  <div class="publish">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill=false ref="loadmore" class="loadmore">
      <div class="search">
        <input type="text" placeholder="请输入关键字">
        <button>搜索</button>
      </div>
      <div class="publish-con" v-if="getTimingMaterials.total != 0">
        <div class="publish-title">
          <div class="article">
            <i class='iconfont icon-paper'></i>
            <span>共<b>{{getTimingMaterials.total}}</b>篇文章</span>
          </div>
        </div>
        <div class="publish-list">
          <dl @click='handleclick(item.task_time,item.id)' v-for="item in getTimingMaterials.rows">
            <dt>
              <img v-if='!item.img || item.img == ""' src="/static/image/home/userhead_big.png" alt="" />
              <img v-else :src="item.img" alt="">
            </dt>
            <dd>{{item.title}}</dd>
          </dl>
        </div>
      </div>
      <div v-else class="noDataBox">
        <Nodate></Nodate>
      </div>
    </mt-loadmore>
    <transition-group name="fade">
      <div class="dialog" key='1' v-show="isShow">
        <div class="dialog-body">
          <div class="dialog-top">
            <span>定时设置</span>
            <i class='iconfont icon-bt_quxiao_b' @click='remove'></i>
          </div>
          <div class="dialog-time">{{task_time}}</div>
          <div class='cancel' @click="cancelRelease" v-if="task_id">取消定时发布</div>
          <div class='cancel' @click="remove" v-else>不可取消</div>
          <!--<div id='test-n1'></div>
          <div class='btn'><button @click='trueclick'>保存定时</button><span>取消定时</span></div>-->
        </div>
      </div>
       <div class="dialog" key='2' v-show="dialogShow">
        <div class="alertContent">
          <p class="atitle">是否确定取消定时发布</p>
          <div class="btns">
            <div class="btn1" @click='ascertain'>确定</div>
            <div class="btn2" @click='cancelClick'>取消</div>
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
    name: 'TimeRelease',
    data() {
      return {
        isShow: false,
        page: 1,
        title: '',
        allLoaded: false,
        task_time: '',
        task_id: '',
        noData: false,
        dialogShow:false
      }
    },
    components: {
      Nodate
    },
    methods: {
      handleclick(task_time, task_id) {
        this.isShow = true;
        this.task_time = task_time;
        this.task_id = task_id;
      },
      remove() {
        this.isShow = false;
      },
      cancelRelease() {
        this.isShow = false;
        this.dialogShow = true;
      },
      ascertain(){
         let queryData = {
          'id': this.task_id,
        };
        let params = {
          data: this.qs.stringify(queryData),
          id: this.task_id
        };
        this.$store.dispatch('actionAjaxTimingMaterialsCancel', params);
        this.dialogShow = false;
      },
      cancelClick(){
        this.dialogShow = false;
      },
      trueclick() {
        this.$(".laydate-btns-confirm").click()
      },
      initDate() {
        var that = this;
        this.laydate.render({
          elem: '#test-n1',
          position: 'static',
          type: "datetime",
          min: 0,
          max: 9,
          btns: ['confirm'],
          done: function (value, date, endDate) {
            console.log(value)
          }
        });
      },
      searchClick() {
        this.title = document.getElementById("title").value;
        this.allLoaded = false;
        this.page = 1;
        let queryData = {
          'page': this.page,
          'title': this.title
        };
        let params = {
          data: this.qs.stringify(queryData),
          page: this.page
        };
        this.$store.dispatch('actionAjaxTimingMaterials', params);
      },
      loadBottom() {
        let self = this;
        this.page += 1;
        let queryData = {
          'page': this.page,
          'title': this.title
        };
        let params = {
          data: this.qs.stringify(queryData),
          page: this.page
        };
        params.callback = function (orders) {
          // console.log(orders)
          if (orders.length === 0) {
            self.allLoaded = true; // 若数据已全部获取完毕
          }
          self.$refs.loadmore.onBottomLoaded();
        };
        this.$store.dispatch('actionAjaxTimingMaterials', params);

      },
    },
    computed: {
      ...mapGetters([
        'getTimingMaterials',

      ])
    },
    created() {
      let da = {
        'page': this.page,
        'title': this.title
      };
      let params = {
        data: this.qs.stringify(da),
        'page': this.page
      };
      this.$store.dispatch('actionAjaxTimingMaterials', params);
    },
    mounted() {
      this.$nextTick(() => {
        this.initDate()
      })
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';
  .publish {
    padding: .1rem .2rem;
    box-sizing: border-box;
    .noDataBox {
      background-color: #fff;
      border-radius: 5px;
      margin-top: 10px;
    }
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
          cursor: pointer;
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
      .dialog-time {
        color: #99a1a9;
        text-align: center;
      }
      .cancel {
        margin: 10px auto 0;
        color: @primary-color;
        text-align: center;
        .button();
        width: 38%;
        height: 30px;
        line-height: 30px;
      }
      .btn {
        margin: 10px auto 0;
        color: @primary-color;
        text-align: center;
        button {
          .button();
          width: 30%;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
        }
      }
    }
    .alertContent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      border-radius: 5px;
      z-index: 9999;
      background: #fff;
      .atitle {
        padding: .2rem 0;
        text-align: center;
        color: #595E62;
      }
      .btns {
        .display-flex();
        width: 70%;
        height: .25rem;
        line-height: .25rem;
        margin-left: 15%;
        margin-bottom: .2rem;
        .btn1 {
          width: 45%;
          margin-right: 10%;
          background: #29B0E7;
          color: #fff;
          text-align: center;
          border-radius: 3px;
          cursor: pointer;
        }
        .btn2 {
          width: 45%;
          text-align: center;
          border-radius: 3px;
          border: 1px solid #E8ECED;
          color: #595E62;
          cursor: pointer;
        }
      }
    }
  }

</style>
