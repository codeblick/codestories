<template>
  <div>
    <article class="post">
      <div>
        <amp-img :src="post.thumbnail" width="750" height="422" layout="responsive"></amp-img>
      </div>
      <h2 class="title">{{ post.title }}</h2>
      <time :datetime="post.date">{{ post.date | date }}</time>
      <section class="post__intro">{{ post.description }}</section>
      <section v-html="post.body"></section>
    </article>
    <section class="col col--border suggestion" v-if="suggestions.length === 2">
      <c-preview v-for="(suggestion, suggestionKey) in suggestions" :key="suggestionKey" :data="suggestion" hideThumbnail></c-preview>
    </section>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description }
      ],
      link: [
        { rel: 'canonical', href: this.$route.path.replace(/^\/amp/g, '') }
      ]
    }
  },
  async asyncData ({app, route}) {
    return {
      post: await app.$content('/posts').get(route.path.replace(/^\/amp/g, ''))
    }
  }
}
</script>
