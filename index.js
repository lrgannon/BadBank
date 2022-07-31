var express = require('express'); 
var app = express();
var cors = require('cors');
var dal     = require('./dal.js');

app.use(express.static('public'));
app.use(cors());

app.get('/account/create/:name/:email/:password', function (req, res) {

                dal.find(req.params.email)
                        .then((users) => {
                                if(users.length > 0) {
                                        console.log('User already exists');
                                        res.send('User already exists');
                                }
                                else {                
                        dal.create (req.params.name, req.params.email, req.params.password)
                                 .then((user) => {
                                          console.log(user);
                                          res.send(user);
                        });      
                }
        });
});
        
app.get('/account/all', function (req, res) {
                dal.all()
                        .then((docs) => {
                                console.log(docs);
                                res.send(docs);
                        });
                });

app.get('/account/login/:email/:password', function(req, res){
        dal.find(req.params.email)
        .then((user) => {
                if(user.length > 0) {
                        if (user[0].password === req.params.password){
                        res.send(user[0]);
                }
                else {  
                        res.send('Login Failed: Invalid Password')
                }
                }
                else{
                      res.send('Login Failed: User Not Found');
                }
   });
});

app.get('/account/find/:email', function(req, res){
        dal.find(req.params.email)
        .then((user) => {
                console.log(user);
                res.send(user);
        
        });
});

app.get('/account/findOne/:email', function(req, res){
        dal.findOne(req.params.email)
        .then((user) => {
                console.log(user);
                res.send(user);
        
        });
});

app.get('/account/update/:email/:amount', function(req, res){
        let amount = Number(req.params.amount);
        dal.update(req.params.email, amount)
                .then((response) => {
                        console.log(response);
                        res.send(response);
});
});

var port = process.env.PORT || 3001;
app.listen(port);
console.log('Running on port: ' + port);