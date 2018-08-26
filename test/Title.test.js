// Libs
import React from 'react';
import { shallow } from 'enzyme';

// Components
import Title from '../src/js/components/Title';

describe('Title Component', () => {
  it('should render passed children', () => {
    const wrapper = shallow(<Title><div>test</div></Title>);
    expect(wrapper.contains(<div>test</div>)).toBe(true);
  });
});
