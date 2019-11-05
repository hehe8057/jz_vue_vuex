<template>
    <div id="catagory">
        <div class="logo">
            <h2>栏目管理</h2>
             <!-- 按钮 -->
            <div class="btns">
                <el-col :span="20">
                    <el-form :inline="true">
                        <el-form-item id="searchname">
                            <el-input v-model="params.name" placeholder="请输入关键栏目名称" ></el-input>
                        </el-form-item>
                        <el-form-item id="searchname">
                            <el-button @click="findAllname" >搜索</el-button>
                        </el-form-item>
                    </el-form>   
                </el-col>
                <el-col :span="4">
                    <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
                    <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
                </el-col>

            </div>
            <!-- 表单 -->
            <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
                <el-form :model="form" :rules="rules" ref="categoryForm">
                    <el-form-item label="栏目名称" label-width="80px" prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" label-width="80px" prop="num">
                        <el-input v-model="form.num" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="submitHandler">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table :data="categories.list" size="small" @selection-change="idschangeHandler">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="栏目名称"></el-table-column>
                <el-table-column prop="num" label="数量"></el-table-column>
                <el-table-column prop="icon" label="图标">
                        <template v-slot:default="socord">
                            <img :src="socord.row.icon" alt="">
                        </template>
                    </el-table-column>
                <el-table-column prop="parentId" label="父栏目id"></el-table-column>
                <el-table-column  label="操作" >
                    <template #default="record">
                        <el-button type="danger" icon="el-icon-delete" circle @click.prevent="deleteHandler(record.row.id)"></el-button>
                        <el-button type="primary" icon="el-icon-edit" circle @click.prevent="editHandler(record.row)"></el-button>
                        <!-- <el-button type="success" icon="el-icon-document" circle @click="todetail(record.row)"></el-button> -->
                    </template>
                </el-table-column>
            </el-table>
             <!-- 分页 -->
            <el-pagination
                @current-change="pageChangeHandler"
                layout="prev, pager, next"
                :currnet-page="categories.page+1"
                :page-size="categories.pageSize"
                :total="categories.total">
            </el-pagination>
    <!-- /分页 -->
        </div>
    </div>
    </template>
    
    <script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default{
        data(){
            return{
                ids:[],
                form:{},
                rules:{
                    name: [
                        { required: true, message: '请输入栏目名称', trigger: 'blur' }
                    ],
                    num:[
                        {required: true, message: '请输入数量', trigger: 'blur'}
                    ]
                },
                params:{
                    //代表第一页
                    page:0,
                    //每一页有五行数据
                    pageSize:5,
                    name:''
                }
            }
        },
        created(){
            this.findAllCategories(this.params);
        },
        computed:{
            ...mapState("Category",["categories","visible","title"]),
            ...mapGetters("Category",["countCategories","categoryStatusFilter"])
            // 普通属性
    
        },
        methods:{
            ...mapActions("Category",["batchDeleteCategories","findAllCategories","deleteCustomerById","saveOrUpdateCustomer"]),
            ...mapMutations("Category",["showModal","closeModal","setTitle"]),
            // 普通方法
            //查询栏目名称
            findAllname(){
                this.findAllCategories(this.params);
            },
            //分页
            pageChangeHandler(currentPage){
                this.params.page = currentPage-1;
                this.findAllCategories(this.params);
            },
            //批量删除
            batchDeleteHandler(){
                this.batchDeleteCategories(this.ids)
                .then((response)=>{
                    this.$message({
                        type:"success",
                        message:response.statusText
                    });
                this.findAllCategories(this.params);    
                })

            },
            //id勾选
            idschangeHandler(val){
                this.ids = val.map(item => item.id);
            },
            //监听模块框
            dialogCloseHandler(){
                this.$refs.categoryForm.clearValidate();
                this.closeModal();
            },
            //添加按钮
            toAddHandler(){
                this.form = {};
                this.setTitle("添加栏目信息")
                this.showModal();
            },
            //提交按钮
            submitHandler(){
                // 1.表单验证
                this.$refs.categoryForm.validate((valid)=>{
                    if(valid){
                        // 2.提交表单
                        this.saveOrUpdateCustomer(this.form)
                        .then((response)=>{
                            this.$message({
                                type:"success",
                                message:response.statusText
                            });
                            this.findAllCategories(this.params);
                        })
                    }else{
                        return false;
                    }
                });
            },
            //删除按钮
            deleteHandler(id){
                let promise = this.deleteCustomerById(id)
                promise.then((response)=>{
                    this.$message({
                        type:"success",
                        message:response.statusText
                    });
                    this.findAllCategories(this.params);
                })
            },
            //修改按钮
            editHandler(row){
                this.form = row;
                this.setTitle("修改栏目信息")
                this.showModal();
            },
            todetail(category){
            //跳转到顾客详情页面
            // this.$router.push({
            //     path:"/CategoryDetail",
            //     query:{category}
            //     //params:{customer}
            // })
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
    #btns{
        height: 60px;
    }
    #searchname{
        margin-top: 20px;
        height: 60px;
    }
</style>