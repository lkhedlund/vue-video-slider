<template>
    <section class="slider-container">
        <transition-group class="slider" tag="div">
            <div class="slide" v-for="(post, index) in groupedPosts" :key="`slide-${index}`">
                <Video
                    :post="post"
                    :position="position"
                    :key="post.id"
                    v-on:modal-open="openModal"
                    :open="open"
                    :category="category"
                ></Video>
            </div>
        </transition-group>
        <button class='slider-button is-left' @click="previous"><img :src="left" /></button>
        <button class='slider-button is-right' @click="next"><img :src="right" /></button>
    </section>
    
</template>

<script>
    import Video from './Video.vue';
    import { mapState } from 'vuex';
    import _ from 'lodash';

    export default {
        name: 'Video-Slider',
        props: ['initialPosts', 'position', 'category'],
        components: {
            Video,
        },
        data() {
            return {
                groupedPosts: [],
                open: false,
                left: window.location.href + '/dist/prev.png',
                right: window.location.href + '/dist/next.png'
            }
        },
        computed: {
            posts: function () {
                return this.$props.initialPosts;
            },
        },
        watch: {
            posts: {
                immediate: true,
                deep: false,
                handler(filtered, prefilter) {
                    // this.groupedPosts = this.chunkPosts(filtered);
                    this.groupedPosts = filtered;
                }
            }
        },
        methods: {
            onMouseover (val) {
                
            },
            openModal (val) {
                this.open = val;
            },
            next() {
                const first = this.groupedPosts.shift()
                this.groupedPosts = this.groupedPosts.concat(first)
            },
            previous () {
                const last = this.groupedPosts.pop()
                this.groupedPosts = [last].concat(this.groupedPosts)
            },
            chunkPosts (posts) {
                let size = 6;
                if (window.matchMedia('(max-width: 480px)').matches) {
                    size = 2;
                } else if (window.matchMedia('(max-width: 768px)').matches) {
                    size = 3;
                } else if (window.matchMedia('(max-width:1024px)').matches) {
                    size = 4;
                } else {
                    size = 6;
                }
                let postChunk = _.chunk(posts, size)
                console.dir(postChunk);
                return postChunk;
            }
        },
    };
</script>