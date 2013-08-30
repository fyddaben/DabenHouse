var util = require('./Constant');

var Db = require('mongodb').Db;

var Server = require('mongodb').Server;

var mongoose = require('mongoose');

mongoose.connect('mongodb://'+util.Db_path+':'+util.Db_port+'/'+util.Db_base);


module.exports = mongoose;