var Bug = require('../models/bug');
exports.bug_save_post = function (req, res, next) {
	var newBug = new Bug(req.body);
	console.log('injam' + newBug)
	newBug.save(function (err, savedBug) {
		if (err) return console.error(err);
		res.json(savedBug);
	});
};
exports.bug_select_get = function (req, res, next) {
	let filter = {};
	if (req.query.priority)
		filter.priority = req.query.priority;
	if (req.query.status)
		filter.status = req.query.status;

	Bug.find(filter, (err, bugsData) => {
		if (err) {
			console.error(err);
		}
		res.json(bugsData);
	})
};
exports.bug_find_get = function(req,res,next){
	Bug.findById(req.params.id,(err,bug)=>{
		if (err) {
			console.error(err);
		}
		res.json(bug);
	})
};
exports.bug_update_put = function(req,res,next){
	var bug = req.body;
	Bug.findByIdAndUpdate(req.params.id,bug,{},function (err,theBug) {
		if (err) { return next(err); }
		console.log("Modifying bug:", req.params.id, theBug);
		res.json(theBug);
	});
};