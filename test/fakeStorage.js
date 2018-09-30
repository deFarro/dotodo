'use strict';

const fakeStorage = {
  dispatch() {},
  subscribe() {},
  getState() {
    return {user: this.user, todos: this.todos}
  },
  user: {username: 'ali', id: '777'},
  todos: [
    {"id":"5757e6e41b0a244b256ac1d5","title":"Todo title 1","description":"todo description","status":"upcomig","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d1","title":"Todo title 2","description":"todo description","status":"upcomig","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d2","title":"Todo title 3","description":"todo description","status":"upcomig","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d3","title":"Todo title 4","description":"todo description","status":"upcomig","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d4","title":"Todo title 5","description":"todo description","status":"completed","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d9","title":"Todo title 6","description":"todo description","status":"completed","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d6","title":"Todo title 7","description":"todo description","status":"completed","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d7","title":"Todo title 8","description":"todo description","status":"completed","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}},
    {"id":"5757e6e41b0a244b256ac1d8","title":"Todo title 9","description":"todo description","status":"completed","author":{"id":"5757e6e41b0a244b256ac1d5", "username":"tom"}}
  ]
}

export default fakeStorage;
