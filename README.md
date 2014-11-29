# maproxy

A caching proxy with result parsing.

## Usage

This is not documentation of how it works. This is the idea of how it might work in the future:

```js
var Maproxy = require("maproxy");

var server = Maproxy.create({
	port: 3128,
	cache: {
		expiresIn: 10 * 1000
	},
	cacheStrategy: require("catbox-redis")
});

server.registerParser("google.com", function (url, payload, callback) {
	if (false) {
		callback(new Error("Not implemented");
	} else {
		callback(null, { title: "Google", "anything": "something" });
	}
});

server.start();
```

And then just `http_proxy=http://127.0.0.1:3128 curl -v http://www.google.com`

## Todo
* [ ] SSL
* [ ] Error handling
* [ ] HTTP error handling
* [ ] Tests
* [ ] Docs
