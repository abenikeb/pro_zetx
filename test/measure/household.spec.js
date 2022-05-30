import { shallowMount,creatlocalvue } from "@vue/test-utils";
import Vuex from 'vuex'
import Household from '@/components/measure/household'
const localVue = creatlocalvue()

localVue.use(Vuex)

describe('Household', () =>{
    test('renders data from store' , ()=>{
            // const wrapper = shallowMount(Household, {
            //     mocks:{
            //         store:{
            //             state:{
                            
            //             }
            //         }
            //     }
            // })
    })
})