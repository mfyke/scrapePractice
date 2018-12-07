const express = require("express");
const router = express.Router();
const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");


router.get("/", (req,res) => {
	db.Article.find({}, (error, data)=>{
		const hbsObj = {
			articles: data
		}
		res.render("index", hbsObj);
	});
});

router.get("/notes/article/:id", (req,res) =>{
	const articleID = req.params.id;
	db.Note.find({article: articleID}, (error,data) =>{
		res.json(data);
	});
});

router.get("/scrape", (req,res) => {
	axios.get("https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen").then((response) => {
		console.log(response);
	});
});

router.post("/notes/article/:id", (req,res) => {
	const articleID = req.params.id;
	const noteBody = req.body.noteBody;
	console.log(articleID + " " + noteBody);
	db.Note.create({body: noteBody, article: articleID}, (error, data) =>{
		res.redirect("/");
	});
});

router.delete("/notes/:id", (req,res) => {
	console.log(req.params.id);
	db.Note.deleteOne({_id: req.params.id}, (err) => {
		res.redirect("/");
	});

});


module.exports=router;