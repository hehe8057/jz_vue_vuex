import {get,post, post_array} from '../http/axios'
import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "http://xiaomiao.club:6677";
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [(date) => {
    return qs.stringify(date);
}]
export default {
    namespaced: true,
    state:{
        visible:false,
        categories:[],
        title:"添加栏目信息"
    },
    getters:{
        countCategories(state){
            return state.categories.length;
        },
        // 需要为获取器传递参数的写法
        categoryStatusFilter(state){
            return function(status){
                if(status){
                    return this.categories.filter(item=>item.status===status)
                } else {
                    return this.categories;
                }
            }
        }
    },
    mutations:{
        showModal(state){
            state.visible = true;
        },
        closeModal(state){
            state.visible = false;
        },
        setTitle(state,title){
            state.title = title;
        },
        // 需要接受一个参数，这个参数就是categories
        refreshCategories(state,categories){
            console.log('state->',state);
            state.categories = categories;
        }
    },
    actions:{
        async batchDeleteCategories(context,ids){
            let response =await axios.post("/category/batchDelete?ids="+ids);
            context.dispatch("findAllCategories")
            return response;
        },
        // async findAllCategories({commit,dispatch,getters,state}){
        async findAllCategories(context,params){
            console.log("context->",context);
            // 1. 查询所有栏目信息
            console.log("params",params)
            let response = await axios.post("/category/query",params)
            // 2. 将栏目信息设置到state.categories中
            context.commit("refreshCategories",response.data)   
        },
        async deleteCustomerById({dispatch},id){
            // 1. 删除栏目信息
            let response = await axios.get("/category/deleteById?id="+id);
            // 2. 刷新
            dispatch("findAllCategories")
            // 3. 提示成功
            return response;
        },
        async saveOrUpdateCustomer({dispatch,commit},category){
            // 1. 提交请求
            let response =  await axios.post("/category/saveOrUpdate",category)
            // 2. 关闭模态
            commit("closeModal");
            // 3. 刷新页面
            dispatch("findAllCategories");
            // 4. 提示成功 react
            return response;
        }
    }
}