<template>
    <div id="Order">
        <div class="logo">
            <h2>订单管理</h2>
        </div>

        <div class="tab">
            <el-tabs v-model="activeName">
                <el-tab-pane label="服务状态" name="first">
                    <div class="first">
                        <div class="table">
                            <!-- 表格 -->
                            <div class="pd_table">
                                <el-table :data="fw_data" height="500">
                                    <el-table-column type="selection"></el-table-column>
                                    <el-table-column label="顾客姓名" prop="customer.realname"></el-table-column>
                                    <el-table-column label="订单总数" prop="total"></el-table-column>
                                    <el-table-column label="订单时间" prop="orderTime"></el-table-column>
                                    <el-table-column label="顾客地址">
                                        <el-table-column label="省份" prop="address.province"></el-table-column>
                                        <el-table-column label="市区" prop="address.city"></el-table-column>
                                        <el-table-column label="具体位置" prop="address.area"></el-table-column>
                                    </el-table-column>
                                    
                                    <el-table-column label="服务状态" prop="status"></el-table-column>
                                    <el-table-column label="操作">
                                        <template #default="record">
                                            <el-button type="primary" circle class="el-icon-edit" @click.prevent="changeYfwStatus(record.row.id)"></el-button>
                                            <el-button type="danger" circle class="el-icon-delete" @click.prevent="changefwstatus(record.row.id)"></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- /表格 -->
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="派单状态" name="second">
                    <div class="second">
                        <!-- 表格 -->
                        <div class="pd_table" >
                            <el-table :data="pd_data" height="500">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column label="顾客姓名" prop="customer.realname"></el-table-column>
                                <el-table-column label="订单总数" prop="total"></el-table-column>
                                <el-table-column label="订单时间" prop="orderTime"></el-table-column>
                                <el-table-column label="顾客地址">
                                    <el-table-column label="省份" prop="address.province"></el-table-column>
                                    <el-table-column label="市区" prop="address.city"></el-table-column>
                                    <el-table-column label="具体位置" prop="address.area"></el-table-column>
                                </el-table-column>
                                
                                <el-table-column label="服务状态" prop="status"></el-table-column>
                                <el-table-column label="操作">
                                    <template #default="record">
                                        <el-button type="primary" circle class="el-icon-edit" @click.prevent="changeStatus(record.row.id)"></el-button>
                                        <el-button type="danger" circle class="el-icon-delete" @click.prevent="changeWStatus(record.row.id)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- /表格 -->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="接单状态" name="third">
                    <div class="third">
                        <!-- 表格 -->
                        <div class="jd_table" >
                            <el-table :data="jd_data" height="500">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column label="顾客姓名" prop="customer.realname"></el-table-column>
                                <el-table-column label="订单总数" prop="total"></el-table-column>
                                <el-table-column label="订单时间" prop="orderTime"></el-table-column>
                                <el-table-column label="顾客地址">
                                    <el-table-column label="省份" prop="address.province"></el-table-column>
                                    <el-table-column label="市区" prop="address.city"></el-table-column>
                                    <el-table-column label="具体位置" prop="address.area"></el-table-column>
                                </el-table-column>
                                
                                <el-table-column label="服务状态" prop="status"></el-table-column>
                                <el-table-column label="操作">
                                    <template #default="record">
                                        <el-button type="primary" circle class="el-icon-edit" @click.prevent="changeYjd(record.row.id)"></el-button>
                                        <el-button type="danger" circle class="el-icon-delete" @click.prevent="changeWjd(record.row.id)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- /表格 -->
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="未完成" name="fourth">未完成</el-tab-pane> -->
            </el-tabs>
        </div>
    </div>

    
</template>

<script>
import {mapState,mapActions,mapMutations} from 'Vuex'
export default {
    data(){
        return {
            activeName:'first',
            pd_params:{
                customerId:"",
                waiterId:""
            },
        }
    },
    computed:{
        ...mapState("Order",["pd_data","fw_data","jd_data"])
    },
    methods:{
        ...mapMutations("Order",["addDateToPdTable","changePdStatus","changeWpdStatus","changeFwSatus","changeWfwStatus","addDateToJdTable","changeYjdStatus","changeWjdStatus"]),
        ...mapActions("Order",["initPdDate","initFwDate","initJdDate"]),
        changeStatus(id){
            this.changePdStatus(id);
        },
        changeWStatus(id){
            this.changeWpdStatus(id);
        },
        changeYfwStatus(id){
            this.changeFwSatus(id)
        },
        changefwstatus(id){
            this.changeWfwStatus(id)
        },
        changeYjd(id){
            this.changeYjdStatus(id)
        },
        changeWjd(id){
            this.changeWjdStatus(id)
        }
    },
    created(){
        // 初始化数据
        this.initPdDate(this.pd_params);
        this.initFwDate(this.pd_params);
        this.initJdDate(this.pd_params)
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

    .tab{
        padding-left: 5px;
        margin-top: 10px;
    }
</style>