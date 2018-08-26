// Libs
import React from 'react';
import { shallow } from 'enzyme';

// Component
import LogoutButton from '../src/js/components/LogoutButton';

describe('LogoutButton Component', () => {
  it('should call logout function on click', () => {
    const mockHandle = {
      logout() {}
    };
    spyOn(mockHandle, 'logout');
    const wrapper = shallow(<LogoutButton logout={mockHandle.logout} />);
    wrapper.find('button').simulate('click');
    expect(mockHandle.logout).toHaveBeenCalled();
  });
});
