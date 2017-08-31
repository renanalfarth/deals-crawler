#!/usr/bin/env node

//global libs
global.config  = {};
global.request = require('request');
global.cheerio = require('cheerio');

//local libs
var	bodyParser 			 = require('body-parser'),
		util 						 = require('util'),
		express 				 = require('express'),
		cors 						 = require('cors'),
		app 						 = express();

//--- app routes
global.craw  = require('./functions/craw');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));

app.options('*', cors());

app.get('/hardmob', cors({origin:'*'}), craw.hardmob);
app.get('/weather', cors({origin:'*'}), craw.weather);

var port = process.env.PORT || 8888;

app.listen(port, function(){
	console.log('#############################');
	console.log('||||||||# DEALS CRAWLER #||||||||');
	console.log('#############################');
});
