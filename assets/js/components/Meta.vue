<template>
    <div class="video-meta">
        <img v-if="$props.brand" :src="$props.brand" class="brand__img">
        <a v-if="!$props.actions" data-fancybox class="button vf-btn-play vf-btn-play-card" :href="$props.video"><i class="fas fa-play fa-2x"></i></a>
        <h2 v-html="$props.title"></h2>
        <div class="entry-meta">
            <time v-if="filteredDate" :datetime="date" itemprop="datePublished" class="entry_time">{{ filteredDate }}</time>
            <ul id="entry-categories">
                <li :key="category.id" v-for="category in categories">
                    {{ category.slug }}
                </li>
            </ul>
        </div>
        <Meta-Actions v-if="$props.actions" :video="$props.video" />
        <div v-if="$props.content" v-html="$props.content" class="entry-body has-content"></div>
    </div>
</template>

<script>
    // import axios from 'axios';
    import MetaActions from './MetaActions.vue';

    export default {
        name: 'Meta',
        props: ['title', 'date', 'cat_ids', 'content', 'video', 'actions', 'brand'],
        components: {
            MetaActions,
        },
        data() {
            return {
                // modal: {},
                play: window.location.href + '/dist/play-icon.png'
            }
        },
        computed: {
            categories: function() {
                const keys = this.$props.cat_ids;

                return this.$store.getters.getCategorySlugs(keys);
            },
            filteredDate: function() {
                let dateObj = new Date(this.$props.date);
                return dateObj.getFullYear();
            }
        },
    };
</script>