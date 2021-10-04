import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// top level test to ensure title screen renders expected text
describe('renders splash screen', () => {
  it('should display the title of the app', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find("#splash-screen-title").text()).toEqual("go figure");
  });
});