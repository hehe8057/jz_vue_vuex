import {get,post, post_array} from '../http/axios'
import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "http://xiaomiao.club:6677";
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [(date) => {
    return qs.stringify(date);
}]

// 状态机vuex
export default {
    // 命名空间
    namespaced:true,
    state:{
        addresses:[], //后台数据
        customers:[],
        visible:false,// 控制模态框的显示和关闭
        title:"添加地址信息"
    },
    mutations:{ // 同步操作(模态框的显示和关闭 、刷新数据) /唯一改变state的方法
        showModal(state){
            state.visible = true;
        },
        closeModal(state){
            state.visible = false;
        },
        setTitle(state,title){
            state.title = title;
        },
        refreshAddresses(state,addresses){
            state.addresses = addresses;      
            // state.customers = addresses.map(item => {return item.customer})           
        },
        refreshCustomers(state,customers){
            state.customers = customers;      
        },
    },
    actions:{ 
        // 异步操作的同步化(增删改查) / 提交突变
        // 处理函数总是接受 context 作为第一个参数，payload 作为第二个参数（可选）
        
        // 查询地址
        async findAllAddresses(context) {
            // 1.ajax查询 
            let response = await axios.get("/address/findAll");
            // 2.将查询结果设置到state.addresses中
            // console.log(response);
            context.commit("refreshAddresses",response.data);
        },
        // 查询顾客
        async findAllCustomers(context) {
            // 1.ajax查询 
            let response = await axios.get("/customer/findAll");
            // 2.将查询结果设置到state.addresses中
            context.commit("refreshCustomers",response.data);
        },
        // 删除
        async deleteAddressById({dispatch},id){
            // 1.发送请求
            let response = await axios.get("/address/deleteById",{params:{id}});
            // 2.刷新 
            dispatch("findAllAddresses");
            // 3.提示
            return response;
        },
        // 批量删除
        async batchDeleteAddresses({dispatch},ids){
            // 1.发送ajax
            let response = await axios.post("/address/batchDelete?ids="+ids);
            // 2.刷新
            dispatch("findAllAddresses");
            // 3.提示
            return response;
        },
        // 更新
        async saveOrUpdateAddress({commit,dispatch},address){
            // 1.提交请求
            let response = await axios.post("/address/saveOrUpdate",address);
            // 2.关闭模态框
            commit("closeModal");
            // 3.刷新页面
            dispatch("findAllAddresses");
            // 4.提示
            return response;
        },
        // 根据顾客id查询地址信息
        async findByCustomerId({commit,dispatch},id){
            if(id){
                let response = await axios.get("/address/findByCustomerId?id="+id);
                // console.log(response);
                commit("refreshAddresses",response.data);
            } else {
                dispatch("findAllAddresses");
            }              
        }

    }
}