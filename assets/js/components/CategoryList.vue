<template>
    <section class="video-row" :class="containerClass" :id="containerId">
        <h3>{{ this.$props.category.name }}</h3>
        <div class="video-list">
            <Video-Slider :initial-posts="posts" :position="category.id" :category="category" />
        </div>
            <Video-Modal :position="category.id"></Video-Modal>
    </section>
</template>

<script>
    import VideoSlider from './VideoSlider.vue';
    import VideoModal from './VideoModal.vue';
    import { mapState } from 'vuex';

    export default {
        name: 'Video-List',
        props: ['category'],
        components: {
            VideoModal,
            VideoSlider
        },
        data() {
            return {
                ishover: false,
            }
        },
        computed: {
            containerClass: function () {
                if(this.$store.getters.filterPostsByCategoryId(this.$props.category.id).length === 0) {
                    return 'no-post'
                } else {
                    return 'row-' + this.$props.category.slug;
                }      
            },
            containerId: function () {
                return this.$props.category.slug;
            },
            posts: function () {
                return this.$store.getters.filterPostsByCategoryId(this.$props.category.id);
            },
        },
        methods: {
            myEventHandler(e) {
                return this.swiperOption.width = e.path[0].outerWidth;
            }
        },
    };
</script>