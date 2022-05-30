import { mount } from '@vue/test-utils'
import forgetPassword from '@/pages/forgetpassword.vue'

describe('forgetPassword page test', () => {
  test('is a vue instance', () => {
    const wrapper = mount(forgetPassword, {
        stubs: ['nuxt-link'],
    })
    expect(wrapper.vm).toBeTruthy()
  })
})