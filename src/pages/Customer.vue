<template>
    <div id="Customer">
        <div class="logo">
            <h2>顾客管理</h2>
        </div>
        <div class="buttons">
            <el-button type="primary" @click.prevent="toadd">添加</el-button>
            <el-button type="danger" @click.prevent="batchDelete">批量删除</el-button>
            <el-button  class="search" @click.prevent="initDate_Customer">搜索</el-button>
            <el-input placeholder="请输入要搜索顾客的姓名" class="input_search" v-model="params.realname"></el-input>
        </div>

        <!-- 表格 -->
        <div class="table">
            <el-table :data="Customers.list" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="姓名" prop="realname"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="电话号码" prop="telephone"></el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="操作">
                    <template #default="record">
                        <el-button type="primary" icon="el-icon-edit" circle @click.prevent="editData(record.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click.prevent="deleteByIdHandler(record.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- /表格 -->

        <!-- 模态框 -->
        <div class="model">
            <el-dialog title="收货地址" :visible.sync="dialogTableVisible" @close="clearDialog" >
                <el-form :rules="rules" ref="customerForm" :model="form">
                    <el-form-item label="姓名：" :label-width="formLabelWidth" prop="realname">
                        <el-input v-model="form.realname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码：" :label-width="formLabelWidth" prop="telephone">
                        <el-input v-model="form.telephone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="toclose">取 消</el-button>
                    <el-button type="primary" @click.prevent="submitForm">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- /模态框 -->
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
            return{
                params:{
                    page:0,
                    pageSize:5,
                    realname:''
                },
                form:{},
                ids:[],
                rules:{
                    realname:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
                    telephone:[{ required: true, message: '请输入电话号码', trigger: 'blur' }]
                }
            }
        },
        computed:{
            ...mapState("Customer",["Customers","formLabelWidth","dialogTableVisible"]),
        },
        methods:{
            // 引用函数
            ...mapActions("Customer",["initDate","deleteByIdCustomer","saveOrUpdate","batchDeleteData"]),
            ...mapMutations("Customer",["refreshDate","toAdd","toClose"]),

            // 普通函数

            // 初始化数据
            initDate_Customer(){
                this.initDate(this.params);
            },
            // 换页
            changePage(curentPage){
                this.params.page = curentPage - 1;
                this.initDate_Customer()
            },
            // 删除数据
            deleteByIdHandler(id){
                this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.deleteByIdCustomer(id)
                    .then((response) => {
                        this.initDate_Customer();
                    })
                    
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });              
            },
            // 打开模态框
            toadd(){
                this.toAdd();
            },
            // 关闭模态框
            toclose(){
                this.toClose();
            },
            // 存储数据
            AddData(data){
                
            },
            submitForm() {
                this.$refs.customerForm.validate((valid) => {
                if (valid) {
                    this.saveOrUpdate(this.form)
                    .then(() => {
                        this.initDate_Customer();
                        this.$message({
                            type:"success",
                            message:"添加成功"
                        });
                        this.toclose();
                    })           
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            // 更新数据
            editData(data){
                this.form = data;
                this.toadd();
            },
            // 关闭模态框清除数据
            clearDialog(){
                this.form = {};
            },
            // 获取ids
            handleSelectionChange(item){
                this.ids = item.map((item) => {
                    return item.id;
                })
                
            },
            // 批量删除
            batchDelete(){
                this.$confirm('此操作将永久删除这些用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {  
                    this.batchDeleteData(this.ids)
                    .then((response) => {
                        this.initDate_Customer();
                    })
                    this.$message({
                        type: 'success',
                        message: '批量删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });     
            },
           
        },
        created(){
            this.initDate_Customer();
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

    .buttons{
    margin-top: 15px;
    margin-left: 10px;
    margin-bottom: 10px;
}

.input_search{
    width: 250px;
    float: right;
    margin-right: -5px;
}

.search{
    float: right;
    margin-right: 20px;
    margin-left: 0;
}
</style>