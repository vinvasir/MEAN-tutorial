//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
//var express = require('express');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./project/config/express');

var app = express();
app.listen(process.env.PORT, process.env.IP);
module.exports = app;