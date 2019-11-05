import {get,post} from '../http/axios'
import axios from "axios"
export default {
    namespaced:true,
    state:{
        visible:false,
        waiters:[],
        addresies:[],
        title:"添加顾客信息",

    },
    getters:{
    
    },
    mutations:{
        refreshWaiters(state,waiters){
            state.waiters = waiters;
        },
        refreshAddresies(state,addresies){
            state.addresies = addresies;
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
        //查询信息
        async initData(context,params){
            let response = await axios.post("/waiter/query",params);
            context.commit("refreshWaiters",response.data)
        },
        async loadaddressData(context){
            let response = await axios.get("/address/findAll")
            context.commit("refreshAddresies",response.data)
         },
        //删除信息
        async deleteWaiterById(context,id){
            let response = await axios.get("/waiter/deleteById?id="+id);
            return response;
        },
        //添加信息
        async saveOrUpdateWaiter(context,form){
            let response = await axios.post("/waiter/saveOrUpdate",form)
            console.log(response)
            context.commit("closeModal");
            return response;

        },
        //批量删除
        async batchDeleteWaiters(context,ids){
            let response = await axios.post("/waiter/batchDelete?ids="+ids);
            return response;
        },
    }
}