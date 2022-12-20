<template>
  <div>
    <HeaderView />
  </div>
  <div class="container">

    <PostComponent 
      v-for="post in posts" :key="post._id"
      :post="post" 
      :onModify="() => onToggleUpdate(post._id)"
      :onRefresh="onRefresh"
      :access="testRight(post.userId) ? true : false"
    />
  </div>
  
  <NewComponent :onRefresh="onRefresh" />
  <ModifyComponent
    v-if="isModify"
    :onClose="onToggleUpdate"
    :postId="toModify"
    :onRefresh="onRefresh"
   />
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import ModifyComponent from '@/components/ModifyComponent.vue';
import VueRouter from 'vue-router';
import PostComponent from '@/components/PostComponent.vue';
import NewComponent from '@/components/NewComponent.vue';

export default {

  components: {
    HeaderView,
    ModifyComponent,
    PostComponent,
    NewComponent,
  },
  data(){
    return{
     isNew: false,
     isModify: false,
     toModify: 0,
     posts: [],
     description: '',
     image: '',
     file: '',
    }
  },
  methods: {
    onToggleUpdate: function(id) {
      this.toModify = id
      this.isModify = !this.isModify
    },
    onRefresh: function() {
      fetch('http://localhost:3000/api/posts')
      .then(res => res.json())
      .then(data => {
        this.posts = data
      })
      .catch(err => console.log(err.message))
    },

    onFileChange: function( event ){
      this.file = event.target.files[0];
    },
    testRight: function(userId) {
      let userConnected = JSON.parse(localStorage.getItem('userId'))
      let userRank = JSON.parse(localStorage.getItem('rank'))

      if(userId === userConnected || userRank === 1) {
        return true
      } else {
        return false
      }
    }
    
  },

  mounted(){
    this.onRefresh()
  },
}

</script>

<style scoped>

.container{
    display: flex;
    flex-direction: column-reverse;
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
}

.post_head p{
  color: white;
  padding: 8px;
  padding-left: 24px;
}

.post_body{
  padding: 8px;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post_body img{
  width: 400px;
}

.post_body p{
  font-size: 16px;
}

.post_footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  padding-left: 24px;
}

.post_footer_review{
  display: flex;
}

.post_footer_review a{
  display: flex;
  align-items: center;
  text-decoration: none;
}

.post_footer_review i{
  font-size: 22px;
}

.post_footer_modify a{
  text-decoration: underline;
}

.like{
  color: #FFD7D7;
}

.post_footer{
  color: #FD2D01;
  font-size: 18px;
}

.post_footer p{
  padding: 6px;
}

.post_footer a{
  color: #FD2D01;
  padding: 6px;
}

.post_admin{
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-bottom: 50px;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.post_head_admin{
  background-color: #FFD7D7 ;
  display: flex;
  justify-content: space-between;
}

.post_head_admin p{
  color: #FD2D01;
  padding: 8px;
  padding-left: 24px;
}

.post_head_admin .badge p{
  background-color: #fff;
  padding: 0;
  margin-top: 8px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.new_modal{
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-bottom: 120px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 40px;
  background-color: #fff;
}

.new_modal_box_head{
  background-color: #4E5166 ;
  display: flex;
  justify-content: space-between;
}

.new_modal_box_head p{
  padding: 8px;
  padding-left: 24px;
  color: white;;
}

.new_modal_box__body{
  padding: 8px;
  margin-left: 36px;
  margin-right: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start
}

.new_modal_box__body input{
  width: 100%;
  padding-bottom: 140px;
  padding-top: 20px;
  padding-left: 20px;
}

.new_modal_box_body_image input{
  padding: 0;
}

.new_modal_box_footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  padding-left: 24px;
}

.new_modal_box_footer button{
    background-color: #FD2D01;
    border: 0;
    padding: 6px;
    margin-right: 36px;
    margin-bottom: 24px;
}

.new_modal_box_footer a{
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    text-decoration: none;
}

.new{
  height: 64px;
  width: 64px;
  font-size: 64px;
  background-color: #FD2D01;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-right: 40px;
  cursor: pointer;
}

.new a{
  color: #fff;
  margin-top: -10px;
  text-decoration: none;
}





</style>
