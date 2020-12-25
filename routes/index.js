var express = require('express');
var router = express.Router();
var data = require("../bin/data/data")
/* GET home page. */
router.get('/', function(req, res, next) {
  let d;
  data.forEach(element =>{
    if(req.query.name.toLowerCase() === element.name.toLocaleLowerCase())
      d = element;
  })
  res.render('index', { title: d.name, da: JSON.stringify(d)});
  console.log(d);
});

module.exports = router;
