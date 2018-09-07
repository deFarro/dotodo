// Libs
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Component
import LogoutButton from '../src/js/components/LogoutButton';
import fakeStorage from './fakeStorage';

describe('LogoutButton Component', () => {
  it('should call logout function on click', () => {
    const mockHandle = {
      logout() {}
    };
    spyOn(mockHandle, 'logout');
    const wrapper = mount(<LogoutButton store={fakeStorage} logout={mockHandle.logout} />);
    wrapper.find('button').simulate('click');
    expect(mockHandle.logout).toHaveBeenCalled();
  });
});
