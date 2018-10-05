import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../components/header';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Header component', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<Header />);
    const welcome = <h1 className='header'>5-Day Weather Forecast</h1>;
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});
