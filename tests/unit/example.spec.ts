import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import About from '@/pages/About.vue'
import Vuex, { Store } from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('About.vue', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store({
      state: { bgmiVersion: 'bgmi-version' },
      actions: {}
    })
  })

  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(About, {
      store, localVue
    })
    expect(wrapper.text()).to.include('bgmi-version')
  })
  it('Build Version', () => {
    const msg = 'new message'
    const wrapper = shallowMount(About, {
      store, localVue
    })
    expect(wrapper.text()).to.include(process.env.VUE_APP_VERSION)
  })
})
