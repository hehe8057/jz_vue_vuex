<template>
   <div id="address">   
      <div class="logo">
          <h2>地址管理</h2>
      <!-- 按钮 -->
      <div class="btns">
          <el-button type="primary" size="small" @click="addHandler" plain>添加</el-button>
          <el-button type="danger" size="small" v-if="multipleSelectionFlag" @click="batchDeleteHandler" plain>批量删除</el-button>
      </div>
      <!-- / 按钮 -->
      <!-- 搜索 -->
      <div class="search">
      <el-select v-model="addresses.customerId" filterable placeholder="请选择顾客编号" type="small">
        <el-option
        v-for="item in customers"
        :key="item.id"
        :label="item.id"
        :value="item.id">
        </el-option>
      </el-select>
      &nbsp;&nbsp;
      <el-button type="success" size="small" plain @click="searchByCustomerIdHandler(addresses.customerId)">搜索</el-button>
      <el-button type="warning" size="small" id="return" plain @click="backHandler">返回</el-button>
      </div>
      <!-- / 搜索 -->
      <!-- 表单 -->
      <el-dialog :title="title" :visible.sync="visible" :close="dialogCloseHandler" :before-close="msgBoxCloseHandler">
        <el-form :model="address" :rules="rules" ref="addressFrom">
            <el-form-item label="顾客编号" label-width="80px" prop="customerId">
            <el-select v-model="address.customerId" placeholder="请选择顾客编号">
                <el-option v-for="c in customers" :label="c.id" :value="c.id" :key="c.id"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="省份" label-width="80px" prop="province">
                <el-select v-model="address.province" placeholder="请选择省份">
                <el-option label="江苏省" value="江苏省"></el-option>
                <el-option label="上海" value="上海"></el-option>
                <el-option label="湖南省" value="湖南省"></el-option>
                <el-option label="广西省" value="广西省"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="省份" label-width="80px" prop="province">
                <el-input v-model="address.province" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="城市" label-width="80px" prop="city">
                <el-input v-model="address.city" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地区" label-width="80px" prop="area">
                <el-input v-model="address.area" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" label-width="80px" prop="address">
                <el-input v-model="address.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="80px" prop="telephone">
                <el-input v-model="address.telephone" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeModal">取 消</el-button>
            <el-button type="primary" size="small" @click="submitHandler">保 存</el-button>
        </div>
      </el-dialog>
      <!-- / 表单 -->
      <!-- 表格 -->
      <el-table :data="addresses" size="small" @selection-change="idsChangeHandler" >       
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="customerId" label="顾客编号"></el-table-column>
          <el-table-column prop="province" label="省份"></el-table-column>
          <el-table-column prop="city" label="城市"></el-table-column>
          <el-table-column prop="area" label="地区"></el-table-column>
          <el-table-column prop="address" label="详细地址"></el-table-column>
          <el-table-column prop="telephone" label="手机号"></el-table-column>
          <el-table-column label="操作" width="80px" align="center">
              <template #default="record">
                  <a href="" class="el-icon-delete" @click.prevent="deleteHandler(record.row.id)" ></a>&emsp;
                  <a href="" class="el-icon-edit-outline" @click.prevent="editHandler(record.row)" ></a>
              </template>
          </el-table-column>   
      </el-table>
      <!-- / 表格 -->
   </div> 
   </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return {
            multipleSelectionFlag:false,  // 一开始让批量删除按钮隐藏
            ids:[],
            address:{},
            rules:{
               customerId:[
                   { required: true, message: '请选择顾客编号', trigger: 'change'}
               ],
               province:[
                   { required: true, message: '请选择省份', trigger: 'blur' }
               ],
               city:[
                   { required: true, message: '请选择城市', trigger: 'blur' }
               ],
               area:[
                   { required: true, message: '请选择地区', trigger: 'blur' }
               ],
               address:[
                   { required: true, message: '请输入详细地址', trigger: 'blur' }
               ],
               telephone:[
                   { required: true, message: '请输入手机号', trigger: 'blur' },
                   { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
               ],
            }
        }
    },
    created(){ // 调用methods中的方法 
        // 执行查询 
        this.findAllAddresses();
        this.findAllCustomers();
    },
    computed:{ // 要拿状态机中的state，必须要使用计算属性 // 映射，将vuex state中的状态映射为vue中的属性
        // 通过辅助函数生成的计算属性 (处理数据)
        ...mapState("Address",["addresses","customers","visible","title"])
    },
    methods:{ //突变和动作都可以在methods中做映射  //将vuex action中得到的动作映射为vue中的方法(触发actions中的函数)
        // 1.辅助函数做的映射 (查询、删除、修改)  (模态框的显示和关闭)     
        ...mapActions("Address",["findAllAddresses","findAllCustomers","deleteAddressById","batchDeleteAddresses","saveOrUpdateAddress","findByCustomerId"]),
        ...mapMutations("Address",["setTitle","showModal","closeModal"]),
        // 2.普通方法
        // ×关闭模态框
        msgBoxCloseHandler(done){
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
                this.closeModal();
            })
            .catch(_ => {});
        },
        // 添加按钮事件
        addHandler(){
            this.address = {};
            this.setTitle("添加地址信息");
            this.showModal();
        },
        // 修改按钮事件
        editHandler(row){
            this.address = row;
            this.setTitle("修改地址信息");
            this.showModal();
        },
        // 删除按钮事件
        deleteHandler(id){
            this.$confirm('确认删除吗','提示',{
            // 通过点击层罩关闭提示框
            closeOnClickModal:true,
            // 通过点击ESC键关闭提示框
            closeOnPressEscape:true,
            type: "warning"
            }).then(() => {
                console.log(id);
                let promise = this.deleteAddressById(id);
                promise.then((response)=>{
                    this.$message({type:"success",message:response.statusText});
                })
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: '已取消删除'
                });          
            });
          
        },
        // 多选按钮组
        idsChangeHandler(val){
            this.ids = val.map(item => item.id);
            // 让批量删除按钮显示
            this.multipleSelectionFlag = true;
            // 当没有选中的时候批量删除按钮隐藏
            if (this.ids == ''){
                this.multipleSelectionFlag = false;
            }
        },     
        // 批量删除按钮
        batchDeleteHandler(){
            this.$confirm('确认删除吗','温馨提示',{
                closeOnClickModal:true,
                closeOnPressEscape:true,
                type:"warning"
            }).then(()=>{
                this.batchDeleteAddresses(this.ids)
                .then((response)=>{
                    this.$message({type:"success",message:response.statusText});
                }) 
            }).catch(()=>{
                this.$message({
                    type:"info",
                    message:'已取消删除'
                });
            });
            
        },
        // 保存按钮事件
        submitHandler(){
            // 1.表单验证 
            this.$refs.addressFrom.validate((valid)=>{
                if(valid){
                   // 2.提交表单
                   this.saveOrUpdateAddress(this.address)
                   .then((response)=>{
                       this.$message({type:"success",message:response.statusText});
                   })
                } else {
                    return false;
                }
            })
        
        },
        // 模态框关闭后清空校验信息
        dialogCloseHandler(){
            this.$refs.addressFrom.resetFields();
        },
        // 搜索按钮事件
        searchByCustomerIdHandler(id){
            this.findByCustomerId(id)
        },
        backHandler(){
            this.findAllAddresses();
        }

    }
}
</script>

<style scoped>
    .logo{
        height: 80px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        line-height: 80px;
        padding-left: 20px;
    }
    .btns {
        float: left;
    }
    .search {
        float: right;
    }

</style>