
import Vuex from 'Vuex'
import { shallowMount,createLocalVue} from '@vue/test-utils'
import Food from '@/components/measure/food.vue'

// const localVue = createLocalVue()
// localVue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//    food:'beef'
//   }
// })
// describe('Food', () => {

//   it('render data from store', () => {
//     const wrapper = shallowMount(Food, {
//       store, 
//       localVue 
//     })
//     // expect(wrapper.vm).toBeTruthy()

//     expect(wrapper.find('state').toEqual('beef'))
//   })
// })