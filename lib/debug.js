'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _httpListener = require('./http/listener');

var _httpListener2 = _interopRequireDefault(_httpListener);

var result = new _httpListener2['default']();

result.on('internal.echo', function (msg) {
	var payload = msg.payload;

	if (!payload) throw { message: 'Did not contain a payload', code: 2000 };
	return payload;
});

result.start();