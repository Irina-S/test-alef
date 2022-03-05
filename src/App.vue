<template>
  <div id="app" class="app">
    <header class="header">
      <div class="container container--header">
        <div class="header__content">
          <img src="@/assets/logo.svg" alt="logo" />

          <nav class="nav header__nav">
            <router-link to="/" class="nav__link">Форма</router-link>
            <router-link to="/preview" class="nav__link">Превью</router-link>
          </nav>
        </div>
      </div>
    </header>

    <div class="content">
      <div class="container">
        <router-view />
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <span class="copy">all rights reserved</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<style lang="scss">
#app {
}
</style>
