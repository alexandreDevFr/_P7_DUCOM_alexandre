<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <nav>
    <!-- <router-link to="/">Accueil</router-link>
    <router-link to="/ConnexionView">Connexion</router-link>
    <router-link to="/PokeMon">Pokemon</router-link> -->
  </nav>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  

}
</script>

<style>
@import url('./style/style.css');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
</style>
