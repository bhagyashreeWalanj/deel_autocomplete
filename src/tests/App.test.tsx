import App from '../App'
import Autocomplete from '../components/Autocomplete'
import { shallow } from 'enzyme'

describe('render all components', () => {
  const app = shallow(<App />)

  it('should match the snapshot', () => {
    expect(app).toMatchSnapshot()
  })
  it('App Component contains Autocomplete component', () => {
    expect(app.contains(<Autocomplete countries={[]} />)).toBe(true)
  })
})
