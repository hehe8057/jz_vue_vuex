import {get,post} from '../http/axios'
export default {
    namespaced:true,
    state:{
        pd_data:[],
        fw_data:[],
        jd_data:[]
    },
    mutations:{
        // 向派单数据填数据
        addDateToPdTable(state,data){
            state.pd_data = data
        },

        // 改变派单状态为已派单
        changePdStatus(state,id){
            let response =  state.pd_data.filter((item) => {
                if(item.id == id){
                    item.status = "已派单"
                }
            });
        },

        // 改变派单状态为未派单
        changeWpdStatus(state,id){
            let response =  state.pd_data.filter((item) => {
                if(item.id == id){
                    item.status = "待派单"
                }
            });
        },
        // 向服务数据填数据
        addDateToFwTable(state,data){
            state.fw_data = data
        },
        // 改变服务状态为已服务
        changeFwSatus(state,id){
            let response = state.fw_data.filter((item) => {
                if(item.id == id){
                    item.status = "已服务"
                }
            })
        },
        // 改变服务状态为未服务
        changeWfwStatus(state,id){
            let response = state.fw_data.filter((item) => {
                if(item.id == id){
                    item.status = "未服务"
                }
            })
        },
        // 向接单数据填数据
        addDateToJdTable(state,data){
            state.jd_data = data
        },
        // 改变接单状态为已接单
        changeYjdStatus(state,id){
            let response = state.jd_data.filter((item) => {
                if(item.id == id){
                    item.status = "已接单"
                }
            })
        },
        // 改变接单状态为未接单
        changeWjdStatus(state,id){
            let response = state.jd_data.filter((item) => {
                if(item.id == id){
                    item.status = "未接单"
                }
            })
        }
    },
    actions:{
        // 获取派单表格数据
        async initPdDate({commit},params){
            let response = await get("/order/query",{params:{params}});
            let data = response.data.filter((item) => {
                return item.status = "待派单"
            })
            commit("addDateToPdTable",data)
        },
        // 获取服务表格数据
        async initFwDate({commit},params){
            let response = await get("/order/query",{params:{params}});
            let data = response.data.filter((item) => {
                return item.status = "未服务"
            })
            commit("addDateToFwTable",data);
        },
        // 获取接单表格数据
        async initJdDate({commit},params){
            let response = await get("/order/query",{params:{params}});
            let data = response.data.filter((item) => {
                return item.status = "未接单"
            })
            commit("addDateToJdTable",data);
        }
    }
}