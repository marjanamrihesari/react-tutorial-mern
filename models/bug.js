
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bugSchema = Schema({
    priority: {type:String, default:'P1'},
    status: {type:String, default:'New'},
    owner: { type: String, required: true },
    title: { type: String, required: true }
});
module.exports = mongoose.model('Bug', bugSchema);