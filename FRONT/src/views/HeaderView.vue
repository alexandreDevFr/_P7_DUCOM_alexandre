<template>
<header>
  <!-- <router-link to="/">Accueil</router-link>
    <router-link to="/ConnexionView">Connexion</router-link>
    <router-link to="/PokeMon">Pokemon</router-link> -->
  <router-link to="/">Groupomania</router-link>
  <button v-if="(token === null || token === 'undefined')"><router-link to="Connexion">Connexion</router-link></button>
  <button v-if="(token !== null)" @click.prevent="logout()"><a>Déconnexion</a></button>
  <router-view />
</header>
</template>

<script>

export default {
  name: 'HelloWorld',
  data: () => ({
      error: false,
      token: localStorage.getItem('token'),
  }),
  methods: {
    logout: function (){
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('nom')
      localStorage.removeItem('prenom')
      localStorage.removeItem('rank')
      this.$router.push('/Connexion');
    }
  },
  components: {
    
  },
  created: function() {
    
  }
}

</script>


<style scoped>
#app{ 

}

header{
  background-color: #FFD7D7;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 4%;
  padding-right: 4%;
}

header a{
  font-size: 30px;
}

ul{
  display: flex;
  list-style-type: none;
}

a{
  color: #FD2D01;
  text-decoration: none;
  font-size: 22px;
}

button{
  background-color: #FD2D01;
  border: 0;
  padding: 6px;
}

button a{
  color: white;
  text-transform: uppercase;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>