exports.changeSettings = function(req, res){
  console.log(req['body']);

  articleProvider.save({
        name: req['body']['name'],
        password: req['body']['password'],
        sendlang: req['body']['sendlang'],
        receivelang: req['body']['receivelang']
    }, function( error, docs) {
        res.redirect('/chat')
    });
};