const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		require: true
	},
	body: String,
	link: String
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;