import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    posts: [],
    categories: [],
    loading: true,
    modal: {
        display: false,
        postData: [],
        position: null,
    },
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    SET_POSTS (state, posts) {
        state.posts = posts
    },
    SET_CATEGORIES (state, categories) {
        state.categories = categories
    },
    doneLoading (state) {
        state.loading = false
    },
    addModal (state, modal) {
        state.modal = modal
    },
    closeModal (state, modal) {
        state.modal.display = false
        state.modal.position = null
    }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
    loadCategories ({ commit }) {
        axios
            .get(window.location.href + '/api/v2/video_category?orderby=description&order=asc&per_page=10')
            .then(r => r.data)
            .then(categories => {
                commit('SET_CATEGORIES', categories);
                commit('doneLoading');
            });
    },
    loadPosts ({ commit }) {
        axios
            .get(window.location.href + '/api/v2/video/?per_page=100')
            .then(r => r.data)
            .then(posts => {
                commit('SET_POSTS', posts);
            });
    },
    getModal ({ commit }, { id, position }) {
        let post = state.posts.find(post => post.id === id)

        commit('addModal', {
            display: true,
            postData: post,
            position: position,
        })
    }
}

// getters are functions
const getters = {
    // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
    getPostById: (state) => (id) => {
        return state.posts.find(post => post.id === id)
    },
    filterPostsByCategoryId: (state) => (id) => {
        return state.posts.filter((post) => post.video_category.indexOf(id) > -1)
    },
    getCategorySlugs: (state) => (keys) => {
        return state.categories.filter((cat) => keys.indexOf(cat.id) > -1)
    },
    getModal: (state) => {
        return state.modal;
    }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})