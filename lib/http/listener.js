'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _listener = require('../listener');

var _listener2 = _interopRequireDefault(_listener);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('transporter:http-listener');

var HTTPListener = (function (_Listener) {
    _inherits(HTTPListener, _Listener);

    function HTTPListener() {
        var _this = this;

        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, HTTPListener);

        _get(Object.getPrototypeOf(HTTPListener.prototype), 'constructor', this).call(this);

        this._handle = function callee$2$0(req, res) {
            var headers, msg, result;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        debug(req.method, req.url);

                        if (!(req.method == 'OPTIONS')) {
                            context$3$0.next = 6;
                            break;
                        }

                        headers = {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
                            'Access-Control-Allow-Credentials': false,
                            'Access-Control-Max-Age': '86400',
                            'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
                        };

                        res.writeHead(200, headers);
                        res.end();
                        return context$3$0.abrupt('return');

                    case 6:
                        if (!(req.method != 'POST')) {
                            context$3$0.next = 9;
                            break;
                        }

                        this._send(res, 500, {
                            success: false,
                            error: {
                                message: 'Expected POST request'
                            }
                        });
                        return context$3$0.abrupt('return');

                    case 9:
                        context$3$0.next = 11;
                        return _regeneratorRuntime.awrap(body(req));

                    case 11:
                        msg = context$3$0.sent;
                        context$3$0.next = 14;
                        return _regeneratorRuntime.awrap(this._process(msg));

                    case 14:
                        result = context$3$0.sent;

                        this._send(res, result.error ? 500 : 200, result);

                    case 16:
                    case 'end':
                        return context$3$0.stop();
                }
            }, null, _this);
        };

        this._send = function (res, code, data) {
            res.writeHead(code, _extends({
                'Content-Type': 'application/json'
            }, _this._config.headers));
            var result = JSON.stringify(data);
            debug('Sending', result);
            res.end(result);
        };

        this._config = _extends({
            port: 3001,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }, config);
        this._server = _http2['default'].createServer(this._handle);
    }

    _createClass(HTTPListener, [{
        key: '_start',
        value: function _start() {
            var _this2 = this;

            debug('Starting HTTP server on port', this._config.port);
            return new _Promise(function (resolve) {
                _this2._server.listen(_this2._config.port, function () {
                    debug('HTTP server start');
                    resolve();
                });
            });
        }
    }]);

    return HTTPListener;
})(_listener2['default']);

exports['default'] = HTTPListener;

function body(req) {
    return new _Promise(function (resolve, reject) {
        var b = '';
        req.on('data', function (data) {
            return b += data;
        });
        req.on('end', function () {
            try {
                var parsed = JSON.parse(b);
                debug('Received', parsed);
                resolve(parsed);
            } catch (e) {
                reject(e);
            }
        });
    });
}
module.exports = exports['default'];