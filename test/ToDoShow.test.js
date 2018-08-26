// Libs
import React from 'react';
import { shallow } from 'enzyme';

// Component
import ToDoShow from '../src/js/components/ToDoShow';
import fakeStorage from './fakeStorage';

describe('ToDoShow Component', () => {
  const todo = fakeStorage.todos[0];
  const user = fakeStorage.user;
  const editMode = () => {};
  const remove = () => {};

  it('should hide controls if logged user is not todos author', () => {
    const wrapper = shallow(<ToDoShow todo={todo} editMode={editMode} remove={remove} user={user} />);
    expect(wrapper.find('.controls').exists()).toEqual(false);
  });

  it('should show controls if logged user is todos author', () => {
    const author = todo.author;
    const wrapper = shallow(<ToDoShow todo={todo} editMode={editMode} remove={remove} user={author} />);
    expect(wrapper.find('.controls').exists()).toEqual(true);
  });

  it('should pass click events on edit button', () => {
    const author = todo.author;
    const mockHandle = {
      editMode() {}
    };
    spyOn(mockHandle, 'editMode');
    const wrapper = shallow(<ToDoShow todo={todo} editMode={mockHandle.editMode} remove={remove} user={author} />);
    wrapper.find('.fa-pencil').simulate('click');
    expect(mockHandle.editMode).toHaveBeenCalled();
  });

  it('should pass click events on delete button', () => {
    const author = todo.author;
    const mockHandle = {
      remove() {}
    };
    spyOn(mockHandle, 'remove');
    const wrapper = shallow(<ToDoShow todo={todo} editMode={editMode} remove={mockHandle.remove} user={author} />);
    wrapper.find('.fa-times').simulate('click');
    expect(mockHandle.remove).toHaveBeenCalled();
  });
});
