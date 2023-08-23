var express = require('express');
var router = express.Router();
const uploadfile=require('../middleware/upload.middleware');
 
 
/* GET home page. */
router.get('/', (req, res) => {
  res.send("Hello Route1");
})

// Link other routes here.
router.get('/route1', function (req, res, next) {
  res.send("Hello Route1");
});
module.exports = router;
