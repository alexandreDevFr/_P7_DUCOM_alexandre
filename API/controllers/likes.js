const Post = require("../models/post");

exports.addLikeOrDislike = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {

  if (req.body.like == 0) {
      if (post.usersLiked.find(user => user === req.body.userId)) {  // on cherche si l'utilisateur est déjà dans le tableau usersLiked
          Post.updateOne({ _id: req.params.id }, {         // si oui, on va mettre à jour la post avec le _id présent dans la requête
            $inc: { likes: -1 },                            // on décrémente la valeur des likes de 1 (soit -1)
            $pull: { usersLiked: req.body.userId }          // on retire l'utilisateur du tableau.
            })
              .then(() => { res.status(201).json({ message: "L'utilisateur communique son avis neutre"}); }) //code 201: created
              .catch((error) => { res.status(400).json({error}); });
        } else if (post.usersDisliked.find(user => user === req.body.userId)) {  //mêmes principes que précédemment avec le tableau usersDisliked
          Post.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            })
              .then(() => { res.status(201).json({ message: "L'utilisateur communique son avis neutre" }); })
              .catch((error) => { res.status(400).json({error}); });
            } else {
              res.status(403).json({error: "L'utilisateur a déjà un avis neutre"})
            }
  } else if (req.body.like == 1) {
    if(post.usersDisliked.find(user => user === req.body.userId)){
      Post.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: -1 },      
        $pull: { usersDisliked: req.body.userId }                            
      })
      .then(() => console.log('dislike enlevé'))
      .catch(err => console.log(err))
    }
    if (!post.usersLiked.find(user => user === req.body.userId)) {
      Post.updateOne({ _id: req.params.id }, {                // on recherche la post avec le _id présent dans la requête
          $inc: { likes: 1 },                                   // incrémentaton de la valeur de likes par 1.
          $push: { usersLiked: req.body.userId }             // on ajoute l'utilisateur dans le array usersLiked.
        })
        .then(() => res.status(200).json({ message: "L'utilisateur like avec succès" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(403).json({error: `L'utilisateur a déjà liké le post`})
    }
  } else if (req.body.like == -1) {
    if(post.usersLiked.find(user => user === req.body.userId)){
      Post.updateOne({ _id: req.params.id }, {
        $inc: { likes: -1 },
        $pull: { usersLiked: req.body.userId }
      })
      .then(() => console.log('Like enlevé'))
      .catch(err => console.log(err))
    }
    if (!post.usersDisliked.find(user => user === req.body.userId)) {
      Post.updateOne({ _id: req.params.id }, {                 // on recherche la post avec le _id présent dans la requête
          $inc: { dislikes: 1 },                                // on décremente de 1 la valeur de dislikes.
          $push: { usersDisliked: req.body.userId }             // on rajoute l'utilisateur à l'array usersDiliked.
        })
        .then(() => res.status(200).json({ message: "L'utilisateur dislike avec succès" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(403).json({error: `L'utilisateur a déjà disliké le post`})
    }
  } else {
    res.status(403).json({error: `Veuillez communiquez une action valide`})
  }
})
.catch((error) => { res.status(404).json({error}); });
};
