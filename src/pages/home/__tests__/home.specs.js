import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import Home from '../index.jsx';

it('can render all the components in the home page', () => {
  const testRenderer = TestRenderer.create(<BrowserRouter><Home/></BrowserRouter>);
  const testInstance = testRenderer.root;
  const HomeComponent = testInstance.findByType(Home);
  expect(HomeComponent).toBeTruthy();

  const homeSegments = testInstance.findAllByType(Segment);
  expect(homeSegments).toBeTruthy();

  const homeContainer = testInstance.findByType(Container);
  expect(homeContainer).toBeTruthy();

  const homeHeaders = testInstance.findAllByType(Header);
  expect(homeHeaders).toBeTruthy();

  const homeButtons = testInstance.findAllByType(Button);
  expect(homeButtons).toBeTruthy();
});
