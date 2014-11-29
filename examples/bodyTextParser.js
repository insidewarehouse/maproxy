module.exports = require("./jsdomParser")(function (url, document, cb) {
	cb(null, {
		url: url,
		title: document.title,
		text: document.body.textContent.replace(/\s+/g, " ").trim()
	});
});
