var _ = require("lodash"),
	Hapi = require("hapi"),
	Nipple = require("nipple"),
	jsdom = require("jsdom"),
	Url = require("url");

function parse(url, payload, cb) {
	cb(null, payload);
}

module.exports.create = function (options) {

	var server = new Hapi.Server({});

	server.connection({port: options.port});

	server.method("getUrl", function (url, cb) {
		Nipple.get(url, function (err, res, payload) {
			cb(err, payload);
		});
	}, {
		cache: options.cache
	});

	server.route({
		method: '*',
		path: '/{p*}',
		handler: function (req, reply) {
			var url = req.url.href;
			req.server.methods.getUrl(url, function (err, payload) {
				if (err) {
					return reply(err);
				}

				parse(url, payload, function (err, parsed) {
					reply(err || parsed);
				});

			});
		}
	});

	return server;

};
