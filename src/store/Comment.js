import {get,post,post_array} from '../http/axios'
import axios from "axios"
import qs from "qs";
axios.defaults.baseURL = "http://xiaomiao.club:6677";
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [(date) => {
    return qs.stringify(date);
}]
export default{
    namespaced:true,
    state:{
        visible:false,
        comments:[],
        orders:{},
        title:"添加评论信息"
    },
    getters:{

    },
    mutations:{
        refreshComments(state,comments){
            state.comments = comments
        },
        refreshOrders(state,orders){
            state.orders = orders
        },
        showModal(state){
            state.visible = true;
        },
        closeModal(state){
            state.visible = false;
        },
        setTitle(state,title){
            state.title = title;
        }
    },
    actions:{
        async findAllComment({commit},params){
            // 查询所有评论信息
            let response = await axios.post("/comment/query",params);
            // 将查询到的数据放到state中，借助mutation中的refreshComment
            commit("refreshComments",response.data);
        },
        async findAllOrder({commit}){
            let response = await get("/order/findAll");
            commit("refreshOrders",response.data)
        },
        async saveOrUpdateComments({dispatch,commit},comments){
            // 提交或保存
            let response = await axios.post("/comment/saveOrUpdate",comments)
            // 关闭模态框
            commit("closeModal")
            // 刷新数据
            // dispatch("findAllComment")
            return response;
        },
        async deleteComment({dispatch},id){
            let response = await get("/comment/deleteById?id="+id)
            // dispatch("findAllComment")
            return response;
        },
        async batchDeleteComment({dispatch},ids){
            let response = await axios.post("/comment/batchDelete?ids="+ids)
            // dispatch("findAllComment")
            return response;
        }
    }
}