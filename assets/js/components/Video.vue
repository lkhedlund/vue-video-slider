<template>
    <article 
        class="video-tile"
        :class="{ 'is-active': isActive, 'is-hovered': isHovered, 'is-expanded': isExpanded }"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
    >
        <div class="tile__media">
            
            <img :src="$props.post.imageURL" class="tile__img">
            <div class="button vf-btn-more" v-on:click="addModal"><i class="fas fa-angle-down"></i></div>
        </div>
        <transition-group name="video">
            <div :key="$props.post.id" class="video-container">
                <a data-fancybox class="button vf-btn-play vf-btn-play-modal play-icon" :href="$props.post.meta.video_slider_direct_url" ><i class="far fa-play-circle"></i> </a>
                <div v-if="isExpanded" class="tile__expanded">
                    <div class="tile__expand-inner">
                        <h6 class="hover-title" v-html="post.title.rendered"></h6>
                        <video 
                            class="tile__video"
                            autoplay muted loop
                            :poster="$props.post.imageURL" :src="$props.post.meta.video_slider_preview_url"
                        ></video>
                        
                        <div class="button vf-btn-more" v-on:click="addModal"><i class="fas fa-angle-down"></i></div>
                    </div>
                </div>
            </div>
        </transition-group>
    </article>
</template>

<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';
    import Meta from './Meta.vue';

    export default {
        name: 'Video',
        props: ['post', 'position', 'open', 'category'],
        components: {
            Meta,
        },
        data() {
            return {
                isHovered: true,
                isExpanded: false,
                plus: window.location.href + '/dist/plus.png',
                play: window.location.href +'/dist/play.png'
            }
        },
        computed: {
            modal: function () {
                return this.$store.getters.getModal;
            },
            isCurrentPos: function() {
                return this.modal.position === this.$props.position;
            },
            isActive: function () {
                let isCurrentPost = this.modal.postData.id === this.$props.post.id;
                return isCurrentPost && this.modal.display && this.isCurrentPos;
            },
        },
        methods: {
            addModal: function () {
                let id = this.$props.post.id;
                let position = this.$props.position;
                this.$store.dispatch('getModal', { id, position });
                this.isExpanded = false;
                window.location.href = window.location.href + '#' + this.$props.category.slug
                
            },
            mouseOver: function (status) {
                let modalOpen = this.modal.display && !this.isCurrentPos;

                if (!this.modal.display || modalOpen) {
                    this.isExpanded = status;
                }

                
            },
            mouseEnter: function() {
                this.mouseOver(true);
            },
            mouseLeave: function() {
                this.mouseOver(false);
            }
        },
    };
</script>