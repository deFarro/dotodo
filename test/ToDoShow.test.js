// Libs
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Component
import ToDoShow from '../src/js/components/ToDoShow';
import fakeStorage from './fakeStorage';

describe('ToDoShow Component', () => {
  const todo = fakeStorage.todos[0];
  const editMode = () => {};

  const storageWithAuthor = Object.assign({}, fakeStorage);
  storageWithAuthor.getState = () => {
    return { user: todo.author, todos: fakeStorage.todos }
  }

  it('should hide edit control if logged user is not todos author', () => {
    const wrapper = mount(<ToDoShow store={fakeStorage} todo={todo} editMode={editMode}  />);
    expect(wrapper.find('.fa-pencil').exists()).toEqual(false);
  });

  it('should hide delete control if logged user is not todos author', () => {
    const wrapper = mount(<ToDoShow store={fakeStorage} todo={todo} editMode={editMode}  />);
    expect(wrapper.find('.fa-times').exists()).toEqual(false);
  });

  it('should show promote control even if logged user is not todos author', () => {
    const wrapper = mount(<ToDoShow store={fakeStorage} todo={todo} editMode={editMode} />);
    expect(wrapper.find('.fa-arrow-right').exists()).toEqual(true);
  });

  it('should hide promote control if todos status is completed', () => {
    const completedTodo = fakeStorage.todos[4];
    const wrapper = mount(<ToDoShow store={fakeStorage} todo={completedTodo} editMode={editMode} />);
    expect(wrapper.find('.fa-times').exists()).toEqual(false);
  });

  it('should show controls if logged user is todos author', () => {
    const wrapper = mount(<ToDoShow store={storageWithAuthor} todo={todo} editMode={editMode}  />);
    expect(wrapper.find('.controls').children().length).toEqual(3);
  });

  it('should pass click events on edit button', () => {
    const mockHandle = {
      edit() {}
    };
    spyOn(mockHandle, 'edit');
    const wrapper = mount(<ToDoShow store={storageWithAuthor} todo={todo} editMode={editMode} edit={mockHandle.edit} />);
    wrapper.find('.fa-pencil').simulate('click');
    expect(mockHandle.edit).toHaveBeenCalled();
  });

  it('should pass click events on double click on todo itself', () => {
    const mockHandle = {
      edit() { }
    };
    spyOn(mockHandle, 'edit');
    const wrapper = mount(<ToDoShow store={storageWithAuthor} todo={todo} editMode={editMode} edit={mockHandle.edit} />);
    wrapper.find('.todo').simulate('dblclick');
    expect(mockHandle.edit).toHaveBeenCalled();
  });

  it('should pass click events on promote button', () => {
    const mockHandle = {
      promote() { }
    };
    spyOn(mockHandle, 'promote');
    const wrapper = mount(<ToDoShow store={storageWithAuthor} todo={todo} editMode={editMode} promote={mockHandle.promote} />);
    wrapper.find('.fa-arrow-right').simulate('click');
    expect(mockHandle.promote).toHaveBeenCalled();
  });

  it('should pass click events on delete button', () => {
    const mockHandle = {
      remove() {}
    };
    spyOn(mockHandle, 'remove');
    const wrapper = mount(<ToDoShow store={storageWithAuthor} todo={todo} editMode={editMode} remove={mockHandle.remove} />);
    wrapper.find('.fa-times').simulate('click');
    expect(mockHandle.remove).toHaveBeenCalled();
  });
});
