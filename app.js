
const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true})

const artschema = {

  title: String,
  content:String
}

const article = mongoose.model("article",artschema)

// app.get("/articles",function(req,res){
//
// article.find({},function(err,foundArticles){
//
// if(err){
//   res,send(err);
// }
// else{
//   res.send(foundArticles);
// }
//
// })
//
// })
//
// app.post("/articles",function(req,res){
//
// const art1 = article({
//
//   title:req.body.title,
//   content: req.body.content
// })
//
// art1.save(function(err){
//
//   if(err){
//     res.send(err)
//   }
//   else{
//     res.send("Article saved successfully")
//   }
// });
//
//   console.log(req.body.title);
//   console.log(req.body.content);
// })
//
//
//
// app.delete("/articles",function(req,res){
//
// article.deleteMany(function(err){
//
//   if(err){
//     res.send(err)
//   }
//   else{
//
//   res.send("All articles have been Deleted successfully")
//   }
// })
// })

app.route("/articles")
.get(function(req,res){

article.find({},function(err,foundArticles){

if(err){
  res,send(err);
}
else{
  res.send(foundArticles);
}

})

})
.post(function(req,res){

const art1 = article({

  title:req.body.title,
  content: req.body.content
})

art1.save(function(err){

  if(err){
    res.send(err)
  }
  else{
    res.send("Article saved successfully")
  }
});

  console.log(req.body.title);
  console.log(req.body.content);
})

.delete(function(req,res){

article.deleteMany(function(err){

  if(err){
    res.send(err)
  }
  else{

  res.send("All articles have been Deleted successfully")
  }
})
})

app.route("/articles/:articleTitle")

.get(function(req,res){

  article.findOne({title:req.params.articleTitle},function(err,result){

  if(err){
    res.send(err)
  }
  else{
    if(!result){
      res.send("No Result Found")
    }
    else{
  res.send(result)
}
}
  })
})

.put(function(req,res){

  article.update({title:req.params.articleTitle},{title:req.body.title,content:req.body.content},{overwrite:true},function(err,result){

    if(err){
      res.send(err)
    }
    else{
      if(!result){

        res.send("Result not found")
      }
      else{
        res.send("Updated")
      }
    }
  })
})

.patch(function(req,res){

article.updateOne({title:req.params.articleTitle},{$set:req.body},function(err,result){

  if(err){
    res.send(err)
  }
  else{
    if(!result){

      res.send("Result not found")
    }
    else{
      res.send("Updated")
    }
  }
})
})

.delete(function(req,res){

  article.deleteOne({title:req.params.articleTitle},function(err,result){

    if(err){
      res.send(err)
    }
    else{
      if(!result){

        res.send("Result not found")
      }
      else{
        res.send("Deleted")
      }
    }
  })
})


app.listen(3000,function(req,res){

console.log("Server is listening at PORT 3000");
})
