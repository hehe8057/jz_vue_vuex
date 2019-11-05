<template>
    <div id="product">
        <div class="logo">
            <h2>产品管理</h2>
            <!-- 按钮 -->
            <el-button size="small" type="info" plain @click="toAddHandler">添加</el-button>
            <el-button size="small" type="danger" plain @click="batchDeleteHandler">批量删除</el-button>
            <!-- / 按钮 -->
            <el-form :inline="true" class="demo-form-inline" style="height:50px">
                <el-form-item>
                    <el-input clearable v-model="params.name" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input clearable v-model="params.description" placeholder="请输入产品描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input clearable v-model="params.price" placeholder="请输入产品价格"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input clearable v-model="params.status" placeholder="请输入产品状态"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格 -->
            <!-- {{products.total}} -->
            <el-table
                :data="products.list"
                @selection-change="idsChangeHandler"
                style="width: 100%">
                <el-table-column type="selection"></el-table-column>
                <el-table-column
                    prop="name"
                    label="产品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="描述"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="categoryId"
                    label="栏目编号">
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <a href="" class="el-icon-delete" @click.prevent="deleteCommentHandler(scope.row.id)"></a>&nbsp;
                        <a href="" class="el-icon-edit" @click.prevent="editCommentHandler(scope.row)"></a>
                    </template>
                </el-table-column>
            </el-table>
            <!-- / 表格 -->
            <!-- 模态框 -->
            <el-dialog :title="title" :visible="visible" @close="dialogCloseHandler">
                <el-form :model="form" :rules="rules" ref="productForm">
                    <!-- {{form}} -->
                    <el-form-item label="产品名称" label-width="100px" prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" label-width="100px" prop="description">
                        <el-input v-model="form.description" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" label-width="100px" prop="price">
                        <el-input v-model.number="form.price" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="100px" prop="status">
                        <el-input v-model="form.status" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="栏目编号" label-width="100px" prop="categoryId">
                        <el-select v-model="form.categoryId">
                            <el-option v-for="c in categories" :value="c.id" :key="c.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="submitHandler">确 定</el-button>
                </div>
            </el-dialog>
            <!-- / 模态框 -->
            <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="changePageHandler"
                :current-page="params.page+1"
                :page-size="products.pageSize"
                :total="products.total">
            </el-pagination>
            <!-- / 分页 -->
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'

export default {
    data(){
        return{
            form:[],
            ids:[],
            params:{
                page:0,
                pageSize:5
            },
            rules:{
                name: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入产品描述', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入产品描述', trigger: 'blur' },
                    { type: 'number', message: '价格必须为数字', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
            this.findALlProducts(this.params);
            this.findAllCategories();
    },
    computed: {
        ...mapState("Product",["products","title","categories","visible"]),
    },
    methods:{
        ...mapMutations("Product",["refreshProducts","showModal","closeModal","setTitle"]),
        ...mapActions("Product",["findALlProducts","findAllCategories","saveOrUpdateProduct","DeleteProduct","batchDeleteProducts","ProductCascadeCategory"]),
        // 还原
        onRecover(){
            // alert(1)
            this.findALlProducts(this.params)
        },
        // 查询
        onSubmit(){
            // alert(1)
            this.ProductCascadeCategory(this.params)
        },
        // 改变页码，重新加载数据
        changePageHandler(currentPage){
            this.params.page = currentPage - 1;
            this.findALlProducts(this.params)
        },
        // 添加
        toAddHandler(){
            this.form = {}
            this.showModal();
            this.setTitle("添加产品信息")
        },
        // 获取ids
        idsChangeHandler(val){
            this.ids = val.map(item => item.id)
        },
        // 批量删除
        batchDeleteHandler(){
            this.batchDeleteProducts(this.ids)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText})
                this.findALlProducts(this.params)
            })
        },
        // 关闭模态框，清空表单验证信息
        dialogCloseHandler(){

        },
        // 删除
        deleteCommentHandler(id){
            this.DeleteProduct(id)
            // alert(id)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText})
                this.findALlProducts(this.params)
            })
        },
        // 修改
        editCommentHandler(row){
            this.setTitle("修改产品信息")
            this.showModal();
            this.form = row;
        },
        submitHandler(){
            // 表单验证
            this.$refs.productForm.validate((valid)=>{
                if(valid){
                    // 提交表单
                    this.saveOrUpdateProduct(this.form)
                    .then((response)=>{
                        this.$message({type:"success",message:response.statusText})
                        this.findALlProducts(this.params)
                    })
                }
            })
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
</style>