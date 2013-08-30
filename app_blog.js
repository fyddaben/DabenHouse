
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3005);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.bodyParser({ keepExtensions: true, uploadDir:'/usr/local/public/images/' }));
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/blog_back',routes.blog_back);
app.get("/back/:artid",routes.backArtQuery);
app.get("/article",routes.query);
app.get("/html/:name",routes.staticPage);
app.get("/tags/:tagname",routes.queryBytag);
app.get("/tags",routes.queryAllTag);
app.get("/article/:artid",routes.queryByArtid);


app.post('/back/article',routes.articleAdd);
app.post('/back/update',routes.articleUpdate);
app.post('/fileupload',routes.upload);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
