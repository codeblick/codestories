<template>
  <div>
    <article class="post">
      <div class="wrapper">
        <img :src="post.thumbnail">
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
        { rel: 'amphtml', href: '/amp' + this.$route.path }
      ]
    }
  },
  async asyncData ({app, route}) {
    const post = await app.$content('/posts').get(route.path)
    let posts = await app.$content('/posts')
      .query({exclude: ['body', 'anchors']})
      .getAll()

    return {
      post,
      suggestions: posts.filter(item => item.meta.index !== post.meta.index).slice(0, 2)
    }
  }
}
</script>
