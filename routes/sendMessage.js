exports.send = function(req, res){
  console.log(req['body']);

  translate(req, res);
};

exports.translate = function(req, res) {
	console.log("WHHI");
}