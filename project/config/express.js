var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'), // not sure if this line is necessary
    methodOverride = require('method-override'),
    session = require('express-session');

module.exports = function(){
    var app = express();
    
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    app.set('views', __dirname + '/../app/views'); //was stuck here for a while because app.set, unlike require(), 
                                                   //needs the WHOLE file path. __dirname gets you to the current folder.
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.routes.js')(app);
    
    app.use(express.static(__dirname + '/../public'));
    
    return app;
};