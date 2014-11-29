var Hapi = require("hapi"),
	Nipple = require("nipple"),
	Url = require("url");

function reflectParser(url, payload, cb) {
	cb(null, payload);
}

module.exports.create = function (options) {

	var defaultParser, registeredParsers = {};

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

				var domain = Url.parse(url).hostname;

				var parse = registeredParsers[domain] || defaultParser || reflectParser;

				parse(url, payload, function (err, parsed) {
					reply(err || parsed);
				});

			});
		}
	});

	var maProxy = {
		hapiServer: server,
		start: server.start.bind(server),
		registerParser: function (domain, parserFn) {
			if (domain) {
				registeredParsers[domain] = parserFn;
			} else {
				defaultParser = parserFn;
			}
			return maProxy;
		}
	};

	return maProxy;

};
