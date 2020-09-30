// __tests__/vehicles.specs.js

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Vehicles from '../index.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Vehicles page should contain vehicles table', () => {
  // Render a checkbox with label in the document
  const vehicles = shallow(<Vehicles/>);

  // It should contain the vehicles table
  expect(vehicles.find('table .ui celled inverted structured table')).toBeTruthy();
});
