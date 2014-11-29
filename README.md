# maproxy

A caching proxy with result parsing.

## Usage

This is not documentation of how it works. This is the idea of how it might work in the future:

```js
var Maproxy = require("maproxy");

var server = Maproxy.create({
	port: 3128,
	cacheStrategy: require("catbox-redis")
});

server.registerParser("google.com", function (response, callback) {
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
* [ ] Parser registrar
* [ ] SSL
* [ ] Docs
* [ ] Tests
* [ ] Error handling
