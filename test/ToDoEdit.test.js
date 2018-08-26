// Libs
import React from 'react';
import { shallow, mount } from 'enzyme';

// Component
import ToDoEdit from '../src/js/components/ToDoEdit';
import fakeStorage from './fakeStorage';

describe('ToDoEdit Component', () => {
  const todo = fakeStorage.todos[0];
  const user = todo.author;
  const add = () => {};
  const edit = () => {};
  const remove = () => {};
  const showMode = () => {};
  const mission = '';

  it('should show plus button if mission is to add new todo', () => {
    const addNew = 'addNew';
    const emptyTodo = {title: '', description: ''};
    const wrapper = shallow(<ToDoEdit store={fakeStorage} todo={emptyTodo}
      showMode={showMode} remove={remove} add={add} edit={edit}
      user={user} mission={addNew} />);
    expect(wrapper.find('.fa-plus').exists()).toEqual(true);
  });

  it('should hide delete button if mission is to add new todo', () => {
    const addNew = 'addNew';
    const emptyTodo = {title: '', description: ''};
    const wrapper = shallow(<ToDoEdit store={fakeStorage} todo={todo}
      showMode={showMode} remove={remove} add={add} edit={edit}
      user={user} mission={addNew} />);
    expect(wrapper.find('.fa-times').exists()).toEqual(false);
  });

  it('should initiate "add" action on click on plus button', () => {
    const addNew = 'addNew';
    const filldeTodo = {title: 'Todo 1', description: 'Do something'};
    const mockHandle = {
      add() {}
    };
    spyOn(mockHandle, 'add');
    const wrapper = mount(<ToDoEdit store={fakeStorage} todo={filldeTodo}
      showMode={showMode} remove={remove} add={mockHandle.add} edit={edit}
      user={user} mission={addNew} />);
    wrapper.find('.fa-plus').simulate('click');
    expect(mockHandle.add).toHaveBeenCalled();
  });

  it('should initiate "edit" action on click', () => {
    const mockHandle = {
      edit() {}
    };
    spyOn(mockHandle, 'edit');
    const wrapper = shallow(<ToDoEdit store={fakeStorage} todo={todo}
      showMode={showMode} remove={remove} add={add} edit={mockHandle.edit}
      user={user} mission={mission} />);
    wrapper.find('.fa-check').simulate('click');
    expect(mockHandle.edit).toHaveBeenCalled();
  });

  it('should initiate "remove" action on click', () => {
    const mockHandle = {
      remove() {}
    };
    spyOn(mockHandle, 'remove');
    const wrapper = shallow(<ToDoEdit store={fakeStorage} todo={todo}
      showMode={showMode} remove={mockHandle.remove} add={add} edit={edit}
      user={user} mission={mission} />);
    wrapper.find('.fa-times').simulate('click');
    expect(mockHandle.remove).toHaveBeenCalled();
  });

  it('should change view to show mode on confirming edit', () => {
    const mockHandle = {
      showMode() {}
    };
    spyOn(mockHandle, 'showMode');
    const wrapper = shallow(<ToDoEdit store={fakeStorage} todo={todo}
      showMode={mockHandle.showMode} remove={remove} add={add} edit={edit}
      user={user} mission={mission} />);
    wrapper.find('.fa-check').simulate('click');
    expect(mockHandle.showMode).toHaveBeenCalled();
  });
});
