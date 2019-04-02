<template>
  <div>
    <div class="nav-bar">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <nuxt-link
          class="btn btn-outline-primary"
          to="/elections"
          role="button"
        >Elections</nuxt-link>
      </nav>
      <!-- <nuxt-link
        class="btn btn-outline-primary"
        to="/elections"
        role="button"
      >Elections</nuxt-link>
      <nuxt-link
        class="btn btn-outline-primary"
        to="/elections/election"
        role="button"
      >Election</nuxt-link>
      <nuxt-link
        class="btn btn-outline-primary"
        to="/elections/voting"
        role="button"
      >voting</nuxt-link> -->
    </div>
    <main
      role="main"
      class="container">
      <div class="p-3 mb-2 bg-gradient-light text-dark">
        <nuxt/>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import 'assets/style.scss';
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
