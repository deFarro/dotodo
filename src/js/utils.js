// Function to test methods with Karma
export const testCall = func => {
    if (!func) {
        return false;
    }
    func();

    return true;
}

// Function to find todos in nested object structures
export const findNestedTodo = (todo, todos) => {
    for (let key in todos) {
        const index = todos[key].findIndex(item => item.id === todo.id);

        if (index !== -1) {
            return [key, index];
        }
    }

    return [null, -1];
}
