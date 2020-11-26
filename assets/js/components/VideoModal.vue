<template>
    <transition name="modal">
        <div v-if="display" class="video-modal">
            
            <div class="button vf-btn-close" v-on:click="closeModal"><img class="icon" :src="cross" /></div>
            <Meta
                :actions="true"
                :title="post.title.rendered"
                :date="post.date"
                :cat_ids="post.video_category"
                :content="post.content.rendered"
                :video="post.meta.video_slider_direct_url"
                :brand="post.brandURL"
            /></Meta>
            <div class="modal-background">
                <video
                    autoplay
                    loop
                    muted
                    :poster="post.imageURL"
                    :src="post.meta.video_slider_preview_url"
                />
            </div>
            <div class="overlay-cover">
            </div>
        </div>
    </transition>
</template>

<script>
    // import axios from 'axios';
    import { mapState } from 'vuex';
    import Meta from './Meta.vue';

    export default {
        name: 'Video-Modal',
        props: ['position'],
        components: {
            Meta,
        },
        data() {
            return {
                modal: {},
                cross: window.location.href + '/dist/close.png'
            }
        },
        methods: {
            closeModal: function() {
                this.$store.commit('closeModal')
            }
        },
        computed: {
            display: function() {
                return this.$store.state.modal.display && this.$store.state.modal.position === this.$props.position;
            },
            post: function() {
                return this.$store.state.modal.postData;
            },
        },
    };
</script>