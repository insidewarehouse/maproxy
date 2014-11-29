module.exports = require("./jsdomParser")(function (url, document, cb) {

	var version = document.querySelector(".version");
	if (version) {
		cb(null, { version: version.textContent });
	} else {
		cb(new Error(".version not found"));
	}

});
