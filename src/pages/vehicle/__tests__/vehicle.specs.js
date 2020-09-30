// __tests__/vehicle.specs.js

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Vehicle from '../index.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Vehicles page should contain vehicle Form', () => {
  // Render a checkbox with label in the document
  const vehicles = shallow(<Vehicle/>);

  // It should contain the vehicle div
  expect(vehicles.find('.vehicle')).toBeTruthy();
  // It should contain the input form for creating the vehicle
  expect(vehicles.find('Form')).toBeTruthy();
});
