<template>
    <div class="meta-actions">
        <a data-fancybox class="button vf-btn-play vf-btn-play-modal" :href="$props.video"><i class="fas fa-play"></i> Play</a>
        <a class="button vf-btn-contact" href="#contact"><i class="far fa-envelope"></i> Contact</a>
    </div>
</template>

<script>
    // import axios from 'axios';

    export default {
        name: 'Meta-Actions',
        props: ['video'],
        data() {
        
            return {
                // modal: {},
            }
        },
    };
</script>