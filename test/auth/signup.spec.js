import { mount } from '@vue/test-utils'
import Signup from '@/pages/signup.vue'

describe('signup page test', () => {
  test('is a vue instance', () => {
    const wrapper = mount(Signup, {
        stubs: ['nuxt-link'],
    })
    expect(wrapper.vm).toBeTruthy()
  })
})