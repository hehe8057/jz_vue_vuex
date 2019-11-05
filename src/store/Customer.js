import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "http://xiaomiao.club:6677";
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [(date) => {
    return qs.stringify(date);
}]

export default {
    namespaced:true,
    state:{
        Customers:[],
        formLabelWidth: '120px',
        dialogTableVisible:false
    },
    mutations:{
        // 刷新数据
        refreshDate(state,Customers){
            state.Customers = Customers;
        },
        // 点击添加弹出模态框
        toAdd(state){
            state.dialogTableVisible = true;
        },
        // 关闭模态框
        toClose(state){
            state.dialogTableVisible = false;
        }
    },
    actions:{
        // 获取数据
        async initDate({commit},params){
            let response = await axios.post("/customer/query",params);
            commit("refreshDate",response.data);
        },
        // 删除数据
        async deleteByIdCustomer({dispatch},id){
            let response = await axios.get("/customer/deleteById?id=" + id);
            return response;
        },
        // 存储数据
        async saveOrUpdate({dispatch},data){
            await axios.post("/customer/saveOrUpdate",data);
        },
        // 批量删除数据
        async batchDeleteData(context,ids){
            let response = await axios.post("/customer/batchDelete?ids="+ids);
            return response;
        }
    }
}