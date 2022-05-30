import { mount } from '@vue/test-utils'
import Login from '@/pages/login.vue'

describe('Login page test', () => {
  test('is a vue instance', () => {
    const wrapper = mount(Login, {
        stubs: ['nuxt-link'],
    })
    expect(wrapper.vm).toBeTruthy()
  })
})