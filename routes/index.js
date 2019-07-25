var Caver = require('caver-js');
var caver = new Caver('https://api.baobab.klaytn.net:8651/');

module.exports = function(app, User)
{
    app.get('/users/all', function(req, res){
        User.find(function(err, users){
            if(err) 
                return res.status(500).send({error: 'database failure'});
            
            res.json(users);
        })
    });

    app.get('/users/id', function(req, res){
        res.end();
    });

    app.get('/users/password', function(req, res){
        res.end();
    });

    app.get('/users/privatekey', function(req, res){
        res.end();
    });


    app.post('/users/find', function(req,res) {
  
        User.findOne({email: req.body.email}, {_id: 0, password: 1, privatekey: 1}, function(err, user){
          if(err) return res.status(500).json({error: err});
          if(user.length === 0 ) return res.status(404).json({error: 'user not found'});
          if(user.password != req.body.password) return res.status(404).json({error: 'password not equal'});
      
          res.json(user.privatekey);
            
        })


    });

    app.post('/users/create', function(req,res) {
        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.published_date = new Date(req.body.published_date);
        
        var account = caver.klay.accounts.create();

        user.privatekey = account.privateKey;

        user.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
             
                return;
            }

            res.json({result: 1});
        });
    });

    app.delete('/users/delete/:id', function(req, res){
        res.end();
    });
}