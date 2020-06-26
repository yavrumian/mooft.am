const {mongoose} = require('./dbconfig'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    sess = require('express-session'),
    MongoStore = require('connect-mongo')(sess),

    port = process.env.PORT,
    app = express(),

    session = sess({
		secret:process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection, collection: 'userSessions' })
	})

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session)

app.use(require('./routers/Router'))


app.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server running on port: ${port}`);
})
