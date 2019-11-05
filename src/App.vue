<template>
  <div id="app">
    <div class="top">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><i class="el-icon-s-operation icon"></i></el-col>
        <el-col :span="6"><p class="text">PROCTER & GAMBLE PLATFORM</p></el-col>
        <el-col :span="6" style="text-align:right">
          <el-autocomplete
            class="input_search"
            placeholder="请输入内容">
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix">
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr">{{ item.address }}</span>
            </template>
          </el-autocomplete>
        </el-col>
      </el-row>
    </div>

    <div class="buttom">
      <div class="left">
        <ul>
          <li>MAIN</li>
          <li :class="changeStyle('Customer')" @click="changePageHandler('Customer')"><i class="el-icon-s-home"></i>顾客管理</li>
          <li :class="changeStyle('Product')"  @click="changePageHandler('Product')"><i class="el-icon-s-shop"></i>产品管理</li>
          <li :class="changeStyle('Category')" @click="changePageHandler('Category')"><i class="el-icon-s-cooperation"></i>栏目管理</li>
          <li :class="changeStyle('Address')" @click="changePageHandler('Address')"><i class="el-icon-s-promotion"></i>地址管理</li>
          <li :class="changeStyle('Order')" @click="changePageHandler('Order')"><i class="el-icon-s-order"></i>订单管理</li>
          <li :class="changeStyle('Waiter')" @click="changePageHandler('Waiter')"><i class="el-icon-s-custom"></i>服务员管理</li>
          <li :class="changeStyle('Comment')" @click="changePageHandler('Comment')"><i class="el-icon-s-comment"></i>评论管理</li>
        </ul>
      </div>

      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'app',
  data(){
    return {
      currentPage:'Customer'
    }
  },
  methods:{
    changeStyle(style){
      if(style === this.currentPage){
        return 'current_style';
      }else{
        return '';
      }
    },
    changePageHandler(item){
      this.$router.push(item);
      this.currentPage = item;
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none
}

#app{
  overflow: hidden
}

body,html,#app{
  height: 100%;
}

.top{
  height: 80x;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  line-height: 80px;
}

.icon{
  font-size: 26px;
  font-weight: bold;
  margin-left: 20px;
}

.text{
  color: blueviolet;
  letter-spacing: 4px;
  font-weight: bold;
  font-size: 16px;
}

.input_search{
  margin-right: 20px;
}

.left{
  position: absolute;
  top: 80px;
  bottom: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 240px;
}

.right{
  margin-left: 242px;
}

ul{
  padding-top: 20px;
}

ul > li{
  height: 70px;
  font-size: 18px;
  line-height: 70px;
  border-bottom: 1px solid #ededee;
}

.current_style{
  background-color: blueviolet;
  color: #fff;
}

.left > ul > li:first-child{
  font-size: 16px;
  color: lightgrey
}

.left > ul > li{
  padding-left: 15px;
  cursor: pointer;
}

.left > ul > li > i{
  margin-right: 20px;
  font-size: 20px;
}

#wrapper{
  overflow: auto;
}





</style>