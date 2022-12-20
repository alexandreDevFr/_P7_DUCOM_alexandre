<template>
    <section @click.self="onClose()">
          <div class="modify_modal" >
            <div class="modify_modal_box">
                <div class="modify_modal_box_head">
                    <p>Modifier Message</p>
                </div>
                <div class="modify_modal_box__body">
                  <input v-model="description" type="text" placeholder="Écrire un message..."><br>
                    <div class="modify_modal_box_body_image">
                      <input @change="onFileChange( $event )" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
                    </div>
                </div>
                <div class="modify_modal_box_footer">
                    <button><a @click.prevent="modifPost()">Envoyer</a></button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { object } from 'webidl-conversions';


export default {
    name: 'ModifyComponent',
    props: ['onClose', 'postId', 'onRefresh'],
    data(){
    return{
     isNew: false,
     isModify: false,
     description: '',
     image: '',
     imageTest : '',
     file: '',
    }
  },
    methods: {
      onToggleUpdate: function(id) {
      this.toModify = id
      this.isModify = !this.isModify
    },
    modifPost: function (_id) {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const token = JSON.parse(localStorage.getItem("token"));
      
      let formData = new FormData();
      formData.append('userId', userId);
      formData.append('post',this.description);
      formData.append('image',this.file);
      console.log('---->1', userId); // Log du Token
      fetch('http://localhost:3000/api/posts/'+ `${this.postId}`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${token}`,
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        this.onRefresh()
        this.onClose()
        console.log(data)
      })
      .catch(error => console.log(error))
    },
    onFileChange: function( event ){
      this.file = event.target.files[0];
    },
    },

    mounted(){
      const token = JSON.parse(localStorage.getItem("token"));

      fetch(`http://localhost:3000/api/posts/${this.postId}`,{
        headers: {
              'Authorization': 'Bearer ' + `${token}`,
              'Accept': 'application/json; charset=utf-8',
              'Content-Type': 'application/json',
          },
        })
      .then(res => res.json())
      .then(data => {
        this.description = data.description
      })
      .catch(err => console.log(err.message))
  },
}
</script>

<style scoped>

section {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: crosshair;
}

.modify_modal{
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: fixed;
  background-color: #fff;
}

.modify_modal_box_head{
  background-color: #4E5166 ;
  display: flex;
  justify-content: space-between;
}

.modify_modal_box_head p{
  padding: 8px;
  padding-left: 24px;
  color: white;;
}

.modify_modal_box__body{
  padding: 8px;
  margin-left: 36px;
  margin-right: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start
}

.modify_modal_box__body input{
  width: 100%;
  padding-bottom: 140px;
  padding-top: 20px;
  padding-left: 20px;
}

.modify_modal_box_body_image input{
  padding: 0;
}

.modify_modal_box_footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  padding-left: 24px;
}

.modify_modal_box_footer button{
    background-color: #FD2D01;
    border: 0;
    padding: 6px;
    margin-right: 36px;
    margin-bottom: 24px;
}

.modify_modal_box_footer a{
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    text-decoration: none;
}

</style>