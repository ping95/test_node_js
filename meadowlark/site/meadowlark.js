var fortunes = [
	"Concure youre fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant suprise.",
	"Whenever possible, keep it simple.",
	];
var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
		.create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('defaultLayout', __dirname+'/views/layouts/');
//app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	var randomFortune = 
		fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about', {fortune:randomFortune });
});

app.use(express.static(__dirname+'/public'));

app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(__dirname);
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
		app.get('port') + ';\npress Ctrl-C to terminat.' );
});


