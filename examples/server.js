require("../")
	.create({
		port: 3128,
		cache: {
			expiresIn: 10 * 1000
		}
	})
	.registerParser(null, require("./bodyTextParser"))
	.start();
