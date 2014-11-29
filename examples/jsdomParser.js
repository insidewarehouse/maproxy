var _ = require("lodash"),
	jsdom = require("jsdom");

module.exports = function (parser) {
	return function (url, payload, cb) {

		jsdom.env(payload.toString(), function (err, window) {
			if (err) {
				return cb(err);
			}

			// clean out non-text content tags
			_(["script", "link", "img", "style", "meta", "iframe", "noscript"]) // iframe inside noscript??
				.map(function (t) {
					return _.toArray(window.document.body.getElementsByTagName(t))
				})
				.flatten()
				.forEach(function (el) {
					el.parentNode.removeChild(el);
				});

			parser(url, window.document, cb);

		});

	}
};
