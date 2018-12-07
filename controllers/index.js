const express = require("express");
const router = express.Router();
const db = require("../models");
const cheerio = require("cheerio");
const request = require("request");


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
	request("https://techcrunch.com/", (error, response, html) => {
		const $ = cheerio.load(html);
		$("div.post-block").each((i, element)=>{
			var title = $(element).find("a.post-block__title__link").text().trim();
      		var link = $(element).find("a.post-block__title__link").attr("href");
      		var sum = $(element).children(".post-block__content").text().trim();
      		db.Article.create({
      			title: title,
      			body: sum,
      			link: link
      		},(error, data) =>{

      		});
      		if(i>=10) {

      			return false;
      		}
		});
		res.redirect("/");
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
			

			
      		
      		
