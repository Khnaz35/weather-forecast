import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Welcome from '../components/welcome-message';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Welcome component', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<Welcome />);
    const welcome = <h3 className='welcome'>Check the real-time weather forecast anywhere in the world!</h3>;
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});
