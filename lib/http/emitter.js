'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _emitter = require('../emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var HTTPEmitter = (function (_Emitter) {
    _inherits(HTTPEmitter, _Emitter);

    function HTTPEmitter(config) {
        var _this = this;

        _classCallCheck(this, HTTPEmitter);

        _get(Object.getPrototypeOf(HTTPEmitter.prototype), 'constructor', this).call(this);
        this._config = _extends({
            'default': 'localhost'
        }, config);
        this._router = function (channel) {
            var url = _this._config[channel] || _this._config['default'];
            return url;
        };
    }

    _createClass(HTTPEmitter, [{
        key: '_send',
        value: function _send(msg) {
            var url = this._router(msg.channel);
            return (0, _isomorphicFetch2['default'])('http://' + url, {
                method: 'post',
                body: JSON.stringify(msg),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            });
        }
    }, {
        key: 'router',
        value: function router(f) {
            this._router = f;
        }
    }]);

    return HTTPEmitter;
})(_emitter2['default']);

exports['default'] = HTTPEmitter;
module.exports = exports['default'];