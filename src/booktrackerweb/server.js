var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var path = require('path');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var router = express.Router();

router.get('/status', function(req, res) {
    res.json({ status: 200});
});

router.get('/book', function(req, res) {
    var data = fs.readFileSync(path.resolve(__dirname, 'data/data.json'));
    var books = JSON.parse(data);
    res.setHeader('X-Total-Count', books.length);
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.json(books);
});

router.get('/book/:id', function(req, res) {
    var data = fs.readFileSync(path.resolve(__dirname, 'data/data.json'));
    var books = JSON.parse(data);
    var book = {};
    var found = false;
    for(var i = 0; i < books.length; i++) {
        if(books[i].id == req.params.id) {
            book = books[i];
            found = true;
            break;
        }
    }
    if(found) {
        res.json(book);
    }
    else {
        res.status(404)
            .send('Not found');
    }
});

app.use('/api', router);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("Example app listening on port " + port);
  console.log("Current dir " + path.resolve(__dirname, 'data/data.json'));
});