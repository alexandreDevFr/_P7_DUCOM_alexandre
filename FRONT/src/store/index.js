import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    REGISTER: ({ commit }, {prenom, nom, password, email}) => {
        return new Promise((resolve, reject) => {
          fetch(`http://localhost:3000/api/auth/signup`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({prenom, nom, password, email})
          })
          .then(({data, status}) => {
              if (status === 201) {
                resolve(true);
                console.log('Utilisateur créé !')
                return resolve
              }else{
                if (status === 401){
                  resolve(false);
                  console.error('Mot de passe trop court')
                  return status
                }else{
                  if (status === 400){
                    resolve(false);
                    console.error('Adresse email déjà utilisé')
                  }
                }
              }
          })

        });
    },

    LOGIN: ({ commit }, {email, password}) => {
      return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })
      };
      fetch('http://localhost:3000/api/auth/login', requestOptions)
      .then(async response => {
        const data = await response.json();
  
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
  
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    });
    },
  //   LOGIN: ({ commit }, {email, password}) => {
  //     return new Promise((resolve, reject) => {
  //       fetch(`http://localhost:3000/api/auth/login`, {
  //           method: "POST",
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({email, password})
  //         })
  //         .then(({data, status}) => {
  //           if (status === 200) {
  //             resolve(true)
  //               console.log('Connexion au site..')
  //               console.log(resolve)
  //               console.log(JSON.stringify(resolve)) 
  //           }else{
  //             if (status === 401){
  //               resolve(false);
  //               console.error('Nom d\'utilisateur incorrect')
  //           }
  //         }
  //     })
  //   });
  // },

},
  modules: {
  }
})



