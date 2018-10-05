import { expect } from 'chai';
import { setInitialForecast, setValue } from '../utils';

describe('setInitialForecast', () => {
  const date = 'October 5th, 2018';
  const forecast = {
    weather: [{
      description: 'it\'s hot',
      icon: 'sunny image'
    }],
    wind: {
      speed: 8
    },
    main: {
      humidity: 80
    }
  }

  let initialForecast;
  beforeEach(() => {
    initialForecast = setInitialForecast(date, forecast);
  })

  it('return an object', () => {
    expect(initialForecast).to.be.an('object');
  })
  it('includes the appropriate properties', () => {
    expect(initialForecast).to.have.all.keys('date', 'description', 'icon', 'wind', 'humidity');
  })
})

describe('setValue', () => {
  const input = 'brooklyn';
  let noSelectedAddress,
    withSelectedAddress,
    isUpdated;
  beforeEach(() => {
    noSelectedAddress = setValue(input, '', false);
    withSelectedAddress = setValue(input, 'Brooklyn, NY', true);
    isUpdated = setValue(input, 'Brooklyn, NY', false);
  })

  it('returns a string in all cases', () => {
    expect(noSelectedAddress).to.be.a('string');
    expect(withSelectedAddress).to.be.a('string');
    expect(isUpdated).to.be.a('string');
  })
  it('returns the input when there is no selectedAddress', () => {
    expect(noSelectedAddress).to.equal(input);
  })
  it('returns the input when there is selectedAddress but after the update occurs', () => {
    expect(withSelectedAddress).to.equal(input);
  })
  it('returns the selectedAddress before the update occurs', () => {
    expect(isUpdated).to.equal('Brooklyn, NY');
  })

})
