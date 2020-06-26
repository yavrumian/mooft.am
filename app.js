const {mongoose} = require('./dbconfig'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),

    port = process.env.PORT,
    app = express();

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routers/Router'))


app.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server running on port: ${port}`);
})
