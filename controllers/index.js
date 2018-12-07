const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", (req,res) => {
	db.Article.find({}, (error, data)=>{
		console.log(data);
		const hbsObj = {
			articles: data
		}
		res.render("index", hbsObj);
	})
});

router.get("/notes/article/:id", (req,res) =>{
	const articleID = req.params.id;
	db.Note.find({article: articleID}, (error,data) =>{
		res.json(data);
	});
});

router.post("/notes/article/:id", (req,res) => {
	const articleID = req.params.id;
	const noteBody = req.body.noteBody;
	console.log(articleID + " " + noteBody);
	db.Note.create({body: noteBody, article: articleID}, (error, data) =>{
		res.redirect("/");
	})
})


module.exports=router;