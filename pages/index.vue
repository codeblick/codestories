<template>
  <div>
    <c-preview v-for="(post, postKey) in posts" :key="postKey" :data="post"></c-preview>
  </div>
</template>

<script>
export default {
  head () {
    return {
      link: [
        { rel: 'canonical', href: this.$route.path }
      ]
    }
  },
  async asyncData ({app}) {
    return {
      posts: await app.$content('/posts')
        .query({exclude: ['body', 'meta', 'anchors']})
        .getAll()
    }
  }
}
</script>
