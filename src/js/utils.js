// Function to test methods with Karma
export const testCall = func => {
    if (!func) {
        return false;
    }
    func();

    return true;
}
