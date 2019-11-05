<template>
    <div id="Customer">
        <div class="logo">
            <h2>服务员管理</h2>
        </div>
        <!-- 功能区 -->
        <div class="btns">
           <el-row type="flex" class="row-bg" justify="space-between">
               <!-- 搜索框 -->
               <el-col :span="6">
                    <el-input v-model="params.telephone" placeholder="请输入手机号或姓名"  clearable>
                  </el-input>
               </el-col>
               <el-col :span="6" style="text-align: left">
                   <el-button type="primary" @click="onserach" plain>搜索</el-button>
                </el-col>
               <el-col :span="6"><div></div></el-col>
               <!-- 按钮 -->
               <el-col :span="6" style="text-align: right">
                    <el-button-group>
                        <el-button type="primary"  @click="toAddHandler" round>添加</el-button>
                        <el-button type="danger" @click="batchDeleteHandler" round>批量删除</el-button>
                    </el-button-group>
               </el-col>
           </el-row>
        </div>
        <!-- /功能区 -->
        <!-- 表格 -->
        <el-table :data="waiters.list" size="small" @selection-change="idsChangeHandeler"  highlight-current-row>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="realname" label="名字"></el-table-column>
            <el-table-column prop="telephone" label="联系方式"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="registerTime" label="注册时间"></el-table-column>
            <el-table-column prop="addressId" label="地址Id"></el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                    <a href="" class="el-icon-delete" @click.prevent="deleteHandler(record.row.id)"></a> &nbsp;
                    <a href="" class="el-icon-edit-outline" @click.prevent="editHandler(record.row)"></a>
                </template>
            </el-table-column>
        </el-table>
        <!-- /表格 -->
        <!-- 分页 -->
        <el-pagination 
        @current-change="pageChangeHandler"
        layout="prev,pager,next"
        background
        :current-page="params.page+1"
        :page-size="waiters.pageSize"
        :total="waiters.total">
        </el-pagination>
        <!-- /分页 -->
        <!-- 表单 -->
        <el-dialog :title="title" :visible="visible"  @close="dialogCloseHandler">
                <el-form :model="form" :rules="rules" ref="waiterForm">
                    <el-form-item label="姓名" label-width="100px" prop="realname">
                        <el-input v-model="form.realname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" label-width="100px" prop="telephone">
                        <el-input v-model="form.telephone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px" prop="gender">
                        <el-radio v-model="form.gender" label="男" border>男</el-radio>
                        <el-radio v-model="form.gender" label="女" border>女</el-radio>
                    </el-form-item>
                    <el-form-item label="注册时间" label-width="100px" prop="registerTime">
                        <el-input  v-model="form.registerTime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地址Id" label-width="100px" prop="addressId">                     
                        <el-row  type="flex">   
                            <el-col :span="8">
                                <el-select v-model="form.addressId" placeholder="请选择省份"> 
                                    <el-option v-for="c in addresies" :label="c.province" :value="c.id"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select v-model="form.addressId" placeholder="请选择城市"> 
                                    <el-option v-for="c in addresies" :label="c.city" :value="c.id"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select v-model="form.addressId" placeholder="请选择地区"> 
                                    <el-option v-for="c in addresies" :label="c.area" :value="c.id"></el-option>
                                </el-select>    
                            </el-col>
                        </el-row> 
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button  size="small" @click="closeModal">取 消</el-button>
                  <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>
                </div>
              </el-dialog>
        <!-- /表单 -->
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            pg:0,
            params:{
                page:0,
                pageSize:5,
            },
            form:{},
            ids:[],
            rules:{
                realname: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                ],
                telephone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '手机号为11位', trigger: 'blur' }
                ],
                registerTime:[
                    {required:true,message:'请输入注册时间',trigger:'blur'},
                    {min:8,max:8,message:'格式为"20180501"',trigger:'blur'}
                ]
            }
        }
    },
    created(){
        this.initData(this.params);
        this.loadaddressData();
    },
    computed:{
        ...mapState("Waiter",["waiters","addresies","title","visible"]),
    },
    methods:{
        ...mapActions("Waiter",["initData","deleteWaiterById","saveOrUpdateWaiter","loadaddressData","batchDeleteWaiters"]),
        ...mapMutations("Waiter",["showModal","closeModal","setTitle"]),
        onserach(){
           this.initData(this.params);
        },
        pageChangeHandler(currentPage){
            this.pg = currentPage;
            this.params.page = currentPage-1;
            this.initData(this.params);
        },
        idsChangeHandeler(val){
            this.ids = val.map(item =>item.id);
        },
        dialogCloseHandler(){
            this.closeModal();
            this.$refs.waiterForm.clearValidate();
        },
        batchDeleteHandler(){
            this.batchDeleteWaiters(this.ids)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText});
                this.initData(this.params);
            })
        },
        deleteHandler(id){
            this.deleteWaiterById(id)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText});
                if(this.pg != 0){
                    this.params = {
                        page:0,
                        pageSize:5
                    }
                    this.initData(this.params);
                }
            });
            
            
        },
        submitHandler(){
            //1.表单验证
            this.$refs.waiterForm.validate((valid)=>{
                if(valid){
                // 2.提交表单
                this.saveOrUpdateWaiter(this.form)
                .then((response)=>{
                    this.$message({type:"success",message:response.statusText});
                    this.initData(this.params);
                })
                } else {
                    return false;
                }
                
            });
        },
        toAddHandler(){
            this.form = {};
            this.setTitle("添加顾客信息")
            this.showModal();
        },
        editHandler(row){
            this.form = row;
            this.setTitle("修改顾客信息")
            this.showModal();
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
    .btns{
        margin-top: 5px;
    }
</style>