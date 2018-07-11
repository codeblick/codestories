<template>
  <div class="app">

    <amp-analytics type="googleanalytics">
      <script type="application/json">
      {
        "vars": {
          "account": "UA-45823613-14"
        },
        "triggers": {
          "trackPageview": {
            "on": "visible",
            "request": "pageview"
          }
        }
      }
      </script>
    </amp-analytics>

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
      <a class="footer__link" href="https://www.codeblick.de">company</a>
      <a class="footer__link" href="https://www.codeblick.de/impressum">contact</a>
      <a class="footer__link" href="https://www.codeblick.de/datenschutz">privacy</a>
    </footer>
  </div>
</template>
