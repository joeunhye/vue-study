import { createStore } from 'vuex';

const store = createStore({
    state () {
        return {
            name: 'Cho',
            age: 30,
            likes: 0
        }
    },
    mutations: {
        changeName(state) {
            state.name = 'Kim'
        },
        changeAge(state, payload) {
            state.age += payload;
        },
        likes(state) {
            
        }
    }
})

export default store;