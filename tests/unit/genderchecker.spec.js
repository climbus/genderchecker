import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'

import flushPromises from 'flush-promises'

import GenderChecker from '@/components/GenderChecker.vue'

describe('GederChecker.vue', () => {
  it('shows form', () => {
    const wrapper = shallowMount(GenderChecker, {})
    expect(wrapper.html()).toContain('input')
    expect(wrapper.html()).toContain('button')
  })

  it('sholud translate gender to polish', () => {
    const wrapper = shallowMount(GenderChecker, {
      data: function () {
        return { gender: 'female' }
      }
    })
    expect(wrapper.vm.polishGender).toMatch('kobieta')
    expect(wrapper.find('h3').text()).toMatch('kobieta')
  })

  it('sholud check gender', async () => {
    fetch.mockResponseOnce(JSON.stringify({ gender: 'female' }))
    const wrapper = shallowMount(GenderChecker, {})
    wrapper.find('input').setValue('ala')
    wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.find('h3').text()).toMatch('kobieta')
  })
})
