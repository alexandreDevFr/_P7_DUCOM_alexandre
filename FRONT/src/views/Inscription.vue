<template>
  <div>
    <HeaderView />
  </div>
  
  <div class="container">
    <div class="post">
      <div class="post_head">
        <p>Inscription</p>
      </div>
      <div v-if="error" class="alert_error" id="alert">test</div>
      <div class="post_body">
        <p>Nom</p>
        <input v-model="nom" type="text" placeholder="Nom" required>
        <p>Prenom</p>
        <input v-model="prenom" type="text" placeholder="Prenom" required>
        <p>Email</p>
        <input v-model="email" type="email" placeholder="Email" required>
        <p>Mot de passe</p>
        <input v-model="password" type="password" placeholder="Mot de passe" required>
        <p>Confirmation mot de passe</p>
        <input v-model="password_confirm" type="password" placeholder="Mot de passe" required>
        <p class="already">Déjà un compte ? Connectez-vous <a href="Inscription"><router-link to="/connexion">ici</router-link></a></p>
        <button @click.prevent="createAccount()">Inscription</button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';


export default {
  name: 'InscriptionPage',
  data: () => ({
    userExists: false,
    email: '',
    prenom: 'John',
    nom: 'Doe',
    password: '',
    password_confirm: '',
    error: false,
  }),
  methods: {
    createAccount() {
      if (this.valid()) {
        this.$store.dispatch('REGISTER', {
          prenom: this.prenom,
          email: this.email,
          nom: this.nom,
          password: this.password
        })
        this.$router.push('/Connexion');
      }
    },
    valid() {
      return this.password === this.password_confirm;
    }
  },

  components: {
    HeaderView
  },
}
</script>


<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

.post{
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-bottom: 50px;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.post_head{
  background-color: #4E5166 ;
  text-align: center;
}

.post_head p{
  color: white;
  padding: 8px;
  padding-left: 24px;
}

.post_body{
  padding: 8px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post_body input{
  width: 100%;
  margin: 12px;
  padding: 6px;
}

.post_body button{
  background-color: #FD2D01;
  border: 0;
  padding: 6px;
}

.post_body button a{
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}

.post_body .already{
  padding: 8px;
}

.post_body .already a{
  color: #FD2D01;
}

.alert_error{
  margin-top: 12px;
  padding: 12px;
  text-align: center;
  background-color: #FFD7D7;
}
</style>
