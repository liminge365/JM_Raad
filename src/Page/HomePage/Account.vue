<template>
  <div class="HomePage">
    <content-top title='账号选择'></content-top>
    <div class="account">
      <div class="account-select">
        <div class="select-top">
          <p>
            <img src="/static/image/accountmsg/wechat.png" alt="">
            <span>娱乐百家</span>
          </p>
          <p>
            <img src="/static/image/accountmsg/wechat.png" alt="">
            <span>娱乐百家</span>
          </p>
          <p>
            <img src="/static/image/accountmsg/wechat.png" alt="">
            <span>娱乐百家</span>
          </p>
          <p>
            <img src="/static/image/accountmsg/wechat.png" alt="">
            <span>娱乐百家</span>
          </p>
          <p>
            <img src="/static/image/accountmsg/wechat.png" alt="">
            <span>娱乐百家</span>
          </p>
        </div>
        <div class="select-btn">完成(6)</div>
      </div>
      <div class="accountSearch">
        <input type="text" v-model='value' placeholder="请输入关键字">
        <button @click='search(value)'>搜索</button>
      </div>
      <ul class='checkbox-btn'>
          <li v-for = "(item,index) in headerData" :key = 'index' :index='index'>
              <div class='toggle-title' @click = "changeli(item,index)">
                  {{item.name}}<i class='iconfont icon-xiayibu'></i>
              </div>
              <div class='toggle-con' v-show="item.show">
                  <p v-for="(val,i) in item.list">
                      <i class='iconfont icon-tucenggouxuan'></i>
                      <img src='/static/image/accountmsg/wechat.png' alt="">
                      <b>{{val}}</b>
                  </p>
              </div>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import ContentTop from '@/components/Common/ContentTop.vue'
  export default {
    name: 'HomePage',
    data() {
      return {
        value:'',
        headerData: [{
            name: '导航1',
            list: ['子集1', '子集', '子集', '子集', '子集'],
            show: false
        }, {
            name: '导航2',
            list: ['子集2', '子集', '子集', '子集', '子集'],
            show: false
        }, {
            name: '导航3',
            list: ['子集3', '子集', '子集', '子集', '子集'],
            show: false
        }, {
            name: '导航4',
            list: ['子集4', '子集', '子集', '子集', '子集'],
            show: false
        }, {
            name: '导航5',
            list: ['子集5', '子集', '子集', '子集', '子集'],
            show: false
        }]
      }
    },
    methods:{
      search (value){
        console.log(value.trim())
      },
      changeli(item, ind) {
          // 先循环数据中的show将其全部置为false,此时模板里的v-if判断生效关闭全部二级菜单,并移除样式
          this.headerData.forEach((value,i) => {
              this.$('.checkbox-btn>li').eq(i).find('i')[0].style.transform = 'rotate(0deg)'
              // 判断如果数据中的headerData[i]的show属性不等于当前数据的show属性那么headerData[i]等于false
              if (value.show != this.headerData[ind].show) {
                  value.show = false;
              };
          });
          if(item.show){
             this.$('.checkbox-btn>li').eq(ind).find('i')[0].style.transform = 'rotate(0deg)'
             item.show = false
          }else{
             this.$('.checkbox-btn>li').eq(ind).find('i')[0].style.transform = 'rotate(90deg)'
             item.show = true
          }
      }
    },
    mounted(){
      this.$(".checkbox-btn").on('click','i',function(){
         if(this.style.color == 'rgb(41, 177, 230)'){
           this.style.color = '#c8cdcc'
         }else{
           this.style.color = '#29b1e6'
         }
       })
    },
    components: {
      ContentTop
    }
  }

</script>
<style lang="less" scoped>
@import '../../assets/style/vars.less';
.account-select {
background-color: #fff;
padding: 14px 26px 16px;
.select-top {
    .display-flex();
    .align-item();
    .flex-wrap();
    p {
    width: 30.3%;
    .display-flex();
    .align-item();
    padding-top: 4px;
    padding-bottom: 4px;
    box-sizing: border-box;
    background-color: #eaf2f2;
    .justify-content();
    margin-right: 3%;
    margin-bottom: 9px;
    img {
        width: .27rem;
    }
    span {
        color: @blue-text-color;
        padding-left: 3px;
    }
    }
}
.select-btn{
    .btnp();
        height:.36rem;
        line-height:.36rem;
    }
}
.accountSearch{
    .display-flex();
    .align-item();
    .space-between();
    height: .35rem;
    padding-left:.25rem;
    padding-right:.25rem;
    margin-top:15px;
    padding-bottom:15px;
    input{
      .input();
    }
    button{
      .button();
    }
}
.checkbox-btn{
  li{
    .toggle-title{
        padding:0 .4rem;
        background:#fff;
        position:relative;
        height:.3rem;
        line-height:.3rem;
        color:@blue-text-color;
        margin-bottom:5px;
        cursor: pointer;
        i{
            position:absolute;
            right:.34rem;
            top: 0;
            font-size: 12px;
            color:@primary-color;
        } 
    }
    .toggle-con{
        padding-bottom:6px;
        p{
            .display-flex();
            .align-item();
            margin-top:8px;
            i{
                color:#c8cdcc;
                margin-left:40px;
            }
            .active{
                color:@primary-color;
            }
            img{
                width:34px;
                height:34px;
                margin-left:36px;
            }
            b{
               color:@blue-text-color; 
               margin-left:14px;
            }
        }
    }
}
}
.collapse-enter{
    max-height: 0;
}
.collapse-enter-active {
    max-height: 10rem;
    -webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.collapse-leave {
    max-height: 10rem;
}
.collapse-leave-active {
    max-height: 0;
    -webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>
