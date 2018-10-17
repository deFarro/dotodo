// Libs
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Component
import LoginWindow from '../src/js/components/LoginWindow';
import fakeStorage from './fakeStorage';

describe('LoginWindow Component', () => {
  it('should call login function on submit', () => {
    const mockHandle = {
      login() {}
    };
    spyOn(mockHandle, 'login');
    const wrapper = mount(<LoginWindow store={fakeStorage} login={mockHandle.login}/>);
    wrapper.find('form').simulate('submit');
    expect(mockHandle.login).toHaveBeenCalled();
  });

  it('should disables button on error and show animation', () => {
    // Constructing storage with error
    const errorStorage = Object.assign({}, fakeStorage);
    errorStorage.getState = () => {
      return {user: fakeStorage.user, todos: fakeStorage.todos, errorObj: { error: true }}
    }
    const wrapper = mount(<LoginWindow store={errorStorage} />);
    expect(wrapper.find('button').prop('disabled')).toEqual(true);
    expect(wrapper.find('button').hasClass('error')).toEqual(true);
  });

  it('should keep empty class if nothing inserted', () => {
    const wrapper = mount(<LoginWindow store={fakeStorage}/>);
    expect(wrapper.find('button').hasClass('not_active')).toEqual(true);
  });
});
