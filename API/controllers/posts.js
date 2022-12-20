const Post = require("../models/post");
const fs = require('fs');
const functions = require("./functions");

exports.createPost = (req, res, next) => {
  const image = typeof req.file != "undefined" ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ''

  const post = new Post({
    userId: req.body.userId,
    description: req.body.post,
    imageUrl: image,
    nom: req.body.nom,
    prenom: req.body.prenom
  });
  post.save()
  .then(() => res.status(201).json({ message: 'Post créer avec succès !'}))
  .catch((error) => {
    res.status(404).json({error: error,});
    res.status(401).json({error: error + 'Vous ne possédez pas les autorisations nécessaire !',});
  });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyPost = (req, res, next) => {

  const image = typeof req.file != "undefined" ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ''

  Post.findOne({ _id: req.params.id })
  .then(post => {
    console.log(post.userId)
    console.log(req.body.userId)
    if(post.userId === req.body.userId){

      if(image == '') {

        Post.updateOne({ _id: req.params.id }, { description: req.body.post })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      } else {

        const updatePost = () => {
          Post.updateOne({ _id: req.params.id }, { description: req.body.post, imageUrl: image })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
        }

        if(post.imageUrl != '') {
          fs.unlink(`./images/${post.imageUrl.split('/images/')[1]}`, (error => {
            if (error){
              res.status(500).json({error})
            } else {
              updatePost()
            }
          }))} else {
            updatePost()
          }
        }

    } else {
      res.status(400).json({ error: 'Vous ne pouvez pas modifier ce post' });
    }
  })

  
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {

      const deletePost = () => {
          Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      }

        if(post.imageUrl != '') {
          fs.unlink(`./images/${post.imageUrl.split('/images/')[1]}`, (error => {
            if (error){
              res.status(500).json({error})
            } else {
              deletePost()
            }
          }))
        } else {
          deletePost()
        }
        
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({error: error, });
    });
};
