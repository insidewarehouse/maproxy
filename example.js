require("./")
	.create({
		port: 3128,
		cache: {
			expiresIn: 10 * 1000
		}
	})
	.start();
