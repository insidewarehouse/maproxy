var _ = require("lodash"),
	jsdom = require("jsdom");

module.exports = function (url, payload, cb) {

	jsdom.env(payload.toString(), function (e, win) {
		if (e) {
			return cb(e);
		}

		// clean out non-text content tags
		_(["script", "link", "img", "style", "meta", "iframe", "noscript"]) // iframe inside noscript??
			.map(function (t) {
				return _.toArray(win.document.body.getElementsByTagName(t))
			})
			.flatten()
			.forEach(function (el) {
				el.parentNode.removeChild(el);
			});

		cb(e, {
			url: url,
			title: win.document.title,
			text: win.document.body.textContent.replace(/\s+/g, " ").trim()
		});
	});

};
