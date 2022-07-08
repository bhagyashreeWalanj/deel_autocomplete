import Autocomplete from '../components/Autocomplete'
import { mount, shallow, render } from 'enzyme'

describe('Testing Autocomplete component', () => {
  const options = ['India', 'Albania', 'Bermuda', 'Portugal', 'Italy', 'Spain']

  const wrapper = shallow(<Autocomplete countries={options} />)
  const inputContainer = wrapper.find('#autocomplete_input')
  const suggestionList = wrapper.find('.options')

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should exist the suggestion list', () => {
    expect(suggestionList.exists()).toBeFalsy()
  })

  it('should render all the options as provided', () => {
    expect(suggestionList.length).toBe(0)
  })

  it('should find option in list', () => {
    inputContainer.simulate('change', { target: { value: 'Port' } })
    const filtersuggestion = wrapper.find('.options')
    expect(filtersuggestion.length).toBe(1)
    expect(filtersuggestion.html()).toContain('Port')
  })

  it('should clear the selected text from the input and show all countries', () => {
    inputContainer.simulate('change', { target: { value: 'Spain' } })
    wrapper.find('.closeButton').simulate('click')
    const filtersuggestion = wrapper.find('.options')
    expect(inputContainer.text()).toBe('')
    expect(filtersuggestion.length).toBe(6)
  })

  it('should highlight the matching text on selection', () => {
    inputContainer.simulate('change', { target: { value: 'Port' } })
    const filtersuggestion = wrapper.find('.options')
    expect(filtersuggestion.find('span').html()).toContain(
      '<strong>Port</strong>ugal',
    )
  })
})
