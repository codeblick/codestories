<template>
  <div class="app">
    <header class="header">
      <h1 class="brand">
        <router-link to="/">
          codestories
        </router-link>
      </h1>
    </header>
    <main>
      <nuxt/>
    </main>
    <footer class="footer">
      <a class="footer__link" href="#">twitter</a>
      <router-link class="footer__link" to="/contact">contact</router-link>
      <a class="footer__link" href="#">instragram</a>
    </footer>
  </div>
</template>

<style lang="scss">
  @import '~assets/scss/variables';
  .app {
    padding: 32px 16px;
    max-width: 750px;
    margin: auto;
  }
  /* <header> */
  .header {
    text-align: center;
    border-bottom: 1px solid $grey;
    margin-bottom: 32px;
  }
  .brand a {
    font-family: $font-family-secondary;
    font-weight: $font-weight-normal;
    font-size: $font-size-1;
    margin-bottom: 8px;
    color: $black;

    &:hover {
      text-decoration: none;
    }
  }
  /* <footer> */
  .footer {
    border-top: 1px solid $grey;
    padding-top: 4px;

    &__link {
      text-align: center;
      display: inline-block;
      width: 33.33%
    }
  }
</style>
