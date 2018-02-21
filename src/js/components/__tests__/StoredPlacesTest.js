import React from 'react';
import ReactDOM from 'react-dom';

import SortedFoodPlacesList from '../SortedFoodPlacesList';
import {createMount} from 'material-ui/test-utils';

describe('<SortedFoodPlacesList />', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });


  it('should render without crashing', () => {
    const wrapper = mount(<SortedFoodPlacesList />);
  });
});
