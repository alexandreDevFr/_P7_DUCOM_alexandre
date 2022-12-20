<template>
  <div>
    <HeaderView />
  </div>
  <div class="container">
    <div class="post">
      <div class="post_head">
        <p>Connexion</p>
      </div>
      <!-- <div v-if="errorAlert" class="alert_error" id="alert"><a>L'utilisateur a déjà liké le post !</a></div> -->
      <div v-if="errorAlert" class="alert_error" id="alert"><a>{{ errorAlertMessage }}</a></div>
      <div v-if="errorSuccess" class="alert_succes" id="alert"><a>{{ errorSuccessMessage }}</a></div>
      <div class="post_body">
        <p>Email</p>
        <input v-model="email" type="email" placeholder="Email" required>
        <p>Mot de passe</p>
        <input v-model="password" type="password" placeholder="Mot de passe" required>
        <p class="already">Pas de compte ? Inscrivez-vous <a><router-link to="/inscription">ici</router-link></a></p>
        <button @click.prevent="logIn()">Connexion</button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';

export default {
  name: 'HelloWorld',
  data: () => ({
      email: '',
      password: '',
      errorAlert: false,
      errorAlertMessage: '',
      errorSuccess: false,
      errorSuccessMessage: '',
  }),
  methods: {
     logIn: function (){
       fetch('http://localhost:3000/api/auth/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' ,
                    'Accept': '*/*',
        },
         
         body: JSON.stringify(
           {
             email: this.email, 
             password: this.password 
           })
       })
       .then(response => response.json())
       .then(response => {
       
         console.log(response);
         console.log(response.rank);
         localStorage.setItem('token', JSON.stringify(response.token));
         localStorage.setItem('userId', JSON.stringify(response.userId));
         localStorage.setItem('rank', JSON.stringify(response.rank));
         this.errorSuccess = true
         this.errorSuccessMessage = 'Connexion réussis !'

         this.$router.push("/");
       })
       .catch(error => {
        console.log("Erreur : " + error)
        this.errorSuccess = true
        this.errorSuccessMessage = error

       });
     } 
    //  console.log("Erreur : " + error)
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
  background-color: #FFD7D7;
  padding: 12px;
  margin-top: 12px;
  text-align: center;
}

.alert_succes{
  background-color: #73a918;
  padding: 12px;
  margin-top: 12px;
  text-align: center;
}
</style>
