// Libs
import React from 'react';
import { mount } from 'enzyme';

// Component
import ToDo from '../src/js/components/ToDo';

import fakeStorage from './fakeStorage';

describe('ToDo Component', () => {
  it('should render todos in show mode by default', () => {
    const wrapper = mount(<ToDo store={fakeStorage} todo={fakeStorage.todos[0]} user={fakeStorage.user} />);
    expect(wrapper.find('.show').exists()).toBe(true);
  });

  it('should render todos in edit if roper mission passed', () => {
    const wrapper = mount(<ToDo store={fakeStorage} todo={fakeStorage.todos[0]} user={fakeStorage.user} mission="addNew"/>);
    expect(wrapper.find('.edit').exists()).toBe(true);
  });
});
