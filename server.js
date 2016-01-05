var fs = require('fs');
var rwebsocket = require('./rwebsocket.js');

function _log(msg) {
	console.log.apply(console, arguments);
	console.log('');
}

var commands = {
	_open: function() {
		_log(this.data);

		this.sendCmd('welcome', {id: this.data.id});

		setTimeout(function(client) {
			client.sendCmd('foo', {ass: Math.random()});
		}, 2000, this);

		this.withAllOtherClients(function(client) {
			client.sendCmd('join', {id: this.data.id});
		});
	},
	insert: function(data) {
		this.withAllOtherClients(function(client) {
			client.sendCmd('msg', {msg: this.data.id + ' INSERTED "' + data.title + '"'});
		});
	},
	_close: function() {
		this.withAllOtherClients(function(client) {
			client.sendCmd('leave', {id: this.data.id});
		});
	}
};

var ssl = {
	key: fs.readFileSync('/etc/apache2/https/home.hotblocks.nl.key'),
	cert: fs.readFileSync('/etc/apache2/https/home.hotblocks.nl-bundle.crt'),
};
var options = {
	port: 8086,
	ssl : ssl,
	commands: commands,
};
var rws = rwebsocket(options);
