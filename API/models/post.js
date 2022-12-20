const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
  //id: { type: String, required: true }, //Généré par mongoose?
  userId: { type: String, required: true },
  description: { type: String, required: true },
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
  date: {type: Date, default: Date.now, required: true},
});

module.exports = mongoose.model("Post", postSchema);
