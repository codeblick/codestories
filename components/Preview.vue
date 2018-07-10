<template>
  <article class="preview">
    <div v-if="!hideThumbnail">
      <amp-img :src="data.thumbnail" width="750" height="422" layout="responsive"></amp-img>
    </div>
    <h2 class="title">{{ data.title }}</h2>
    <time :datetime="data.timestamp">{{ data.timestamp | date }}</time>
    <section class="preview__text" :class="{ 'preview__text--small': hideThumbnail }">{{ data.description }}</section>
    <router-link :to="data.permalink" class="button">Continue Reading</router-link>
  </article>
</template>

<script>
export default {
  name: 'c-preview',
  props: {
    hideThumbnail: Boolean,
    data: Object
  }
}
</script>
