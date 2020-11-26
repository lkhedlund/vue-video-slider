<template lang="pug">
    <div v-if="loading">
        <div class="video-loading">Loading...</div>
    </div>
    <div v-else>
        <div class="video-grid">
            <Category-List v-for="category in categories" v-bind:key="category.id" v-bind:category="category"></Category-List>
            <div class="video-row row-about" id="process">
                <div class="about-col vf-col-1">
                    <video autoplay loop muted class="tile__video" :src="video"></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CategoryList from './components/CategoryList.vue';
import MetaActions from './components/MetaActions.vue';
import { mapState } from 'vuex';
import logo from "../images/vue-video-slider.png";

export default {
    name: 'App',
    data() {
        return {
            video: '',
        }
    },
    components: {
        CategoryList,
        MetaActions,
    },
    methods: {
        enlarge(event) {
            event.currentTarget.classList.add('large');
        },
    },
    created() {
    
        this.$store.dispatch('loadPosts');
        this.$store.dispatch('loadCategories');
    },
    computed: mapState([
        'posts',
        'categories',
        'loading'
    ])
}
</script>
