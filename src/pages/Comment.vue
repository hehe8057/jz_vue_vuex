<template>
    <div id="comment">
        <div class="logo">
            <h2>评论管理</h2>
        </div>
        <!-- 按钮 -->
        <div class="btns">
            <el-button size="small" type="primary" plain @click="toAddHandler">添加</el-button>
            <el-button size="small" type="danger" plain @click="batchDeleteHandler">批量删除</el-button>
        </div>
        <!-- / 按钮 -->
        <!-- {{orders}} -->
        <!-- {{comments}} -->
        <!-- {{ids}} -->
        <!-- {{params}} -->
        <!-- 表格 -->
        <el-table :data="comments.list" @selection-change="idsChangeHandler">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="content" label="评论内容"></el-table-column>
            <el-table-column prop="commentTime" label="评论时间"></el-table-column>
            <el-table-column prop="orderId" label="订单编号"></el-table-column>
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
            <!-- {{form}} -->
            <el-form :model="form" :rules="rules" ref="commentForm">
                <el-form-item label="评论内容" label-width="100px" prop="content">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="评论时间" label-width="100px" prop="commentTime">
                    <el-input v-model="form.commentTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单编号" label-width="100px" prop="orderId">
                    <el-select v-model="form.orderId">
                        <el-option v-for="c in orders" :value="c.id" :key="c.id"></el-option>
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
            @current-change="changepageHandler"
            :current-page="params.page+1"
            :page-size="comments.pageSize"
            :total="comments.total">
        </el-pagination>
        <!-- / 分页 -->
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    data(){
        return{
            // store,
            form:[],
            ids:[],
            content:"",
            rules:{
                content: [
                    { required: true, message: '请输入评论内容', trigger: 'blur' },
                    { min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur' }
                ],
            },
            params:{
                page:0,
                pageSize:5
            }
        }
    },
    computed: {
        ...mapState("Comment",["comments","orders","title","visible"])
    },
    created(){
        // 初始化数据
        this.findAllComment(this.params);
        this.findAllOrder();
    },
    methods:{
        ...mapActions("Comment",["findAllComment","findAllOrder","deleteComment","saveOrUpdateComments","batchDeleteComment"]),
        ...mapMutations("Comment",["refreshComments","showModal","closeModal","setTitle"]),
        // 添加
        toAddHandler(){
            this.form = {};
            this.showModal();
            this.setTitle("添加评论信息")
        },
        // 批量删除
        batchDeleteHandler(){
            this.batchDeleteComment(this.ids)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText})
                this.findAllComment(this.params);
            })
        },
        // 获取ids
        idsChangeHandler(val){
            this.ids = val.map(item => item.id)
        },
        dialogCloseHandler(){
            // 关闭模态框的时候，清空表单验证内容
            this.$refs.commentForm.clearValidate();
            // 关闭模态框
            this.closeModal();
        },
        // 删除
        deleteCommentHandler(id){
            this.deleteComment(id)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText});
                this.findAllComment(this.params);
            });
            
        },
        // 修改
        editCommentHandler(row){
            this.setTitle("修改评论内容");
            this.form = row;
            this.showModal();
        },
        // 保存数据
        submitHandler(){
            // 表单验证
            this.$refs.commentForm.validate((valid)=>{
                if(valid){
                    // 提交表单
                    this.saveOrUpdateComments(this.form)
                    .then((response)=>{
                        this.$message({type:"success",message:response.statusText})
                        this.findAllComment(this.params);
                    })
                }
            })
        },
        // 改变页码
        changepageHandler(currentPage){
            this.params.page = currentPage - 1;
            this.findAllComment(this.params);
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
        margin: 1.5em;
    }
</style>