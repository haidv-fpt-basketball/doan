import { authAxios } from '@/apis/api'
import { getUserInfo } from '@/utils/auth/index.js'
export default {
  namespaced: true,
  state: { warehouses: [], selectedWarehouse: {} },
  getters: {},
  mutations: {
    setWarehouses (state, warehouses) {
      state.warehouses = warehouses
    },

    setSelectedWarehouse (state, selectedWarehouse) {
      state.selectedWarehouse = selectedWarehouse
    }
  },
  actions: {
    addWarehouse: async (context, payload) => {
      payload.createdBy = getUserInfo().userId
      payload.updatedBy = getUserInfo().userId
      if (payload.addedQuantity) payload.quantity = Number(payload.quantity) + Number(payload.addedQuantity)
      const res = await authAxios.post('/warehouse', payload)
      context.dispatch('getWarehouses', payload.productId)
      return res
    },

    getWarehouses: async (context, params) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get(`/warehouse/${params}`)
          .then((res) => {
            context.commit('setWarehouses', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    }
  }
}
