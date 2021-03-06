import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'

import flushPromises from 'flush-promises'
import mockConsole from 'jest-mock-console'

import GenderChecker from '@/components/GenderChecker.vue'

describe('GederChecker.vue', () => {

  it('shows form', () => {
    const wrapper = shallowMount(GenderChecker, {})
    expect(wrapper.html()).toContain('input')
    expect(wrapper.html()).toContain('button')
  })

  it('translates gender to polish', () => {
    const wrapper = shallowMount(GenderChecker, {
      data: function () {
        return { gender: 'female' }
      }
    })
    expect(wrapper.vm.polishGender).toMatch('kobieta')
    expect(wrapper.find('h3').text()).toMatch('kobieta')
  })

  it('shows gender with no errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({ gender: 'female' }))
    const wrapper = shallowMount(GenderChecker, {})
    wrapper.find('input').setValue('ala')
    wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.find('h3').text()).toMatch('kobieta')
    expect(wrapper.find('.err').text()).toMatch('')
  })
  
  it('clears error message on success', async () => {
    fetch.mockResponseOnce(JSON.stringify({ gender: 'female' }))
    const wrapper = shallowMount(GenderChecker, {})
    wrapper.setData({err: 'Błąd'})
    expect(wrapper.find('.err').text()).toBe('Błąd')

    wrapper.find('input').setValue('ala')
    wrapper.find('button').trigger('click')
    await flushPromises()
    
    expect(wrapper.find('.err').text()).toBe('')
  })

  it('shows error when firstname not entered', () => {
    const wrapper = shallowMount(GenderChecker, {})

    wrapper.find('button').trigger('click')

    expect(wrapper.find('.err').text()).not.toBe('')
  })

  it('shows error when servis is down', async () => {
    fetch.mockReject(new Error('fake error message'))
    const restoreConsole = mockConsole()
    const wrapper = shallowMount(GenderChecker, {})

    wrapper.find('input').setValue('ala')
    wrapper.find('button').trigger('click')
    await flushPromises()
    
    expect(wrapper.find('.err').text()).not.toBe('')
    expect(console.error).toHaveBeenCalled();
    
    restoreConsole();    
  })
})
