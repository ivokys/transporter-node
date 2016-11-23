'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('transporter:emitter');

var Emitter = (function () {
    function Emitter() {
        _classCallCheck(this, Emitter);

        this._pre = [];
        this._post = [];
    }

    _createClass(Emitter, [{
        key: 'send',
        value: function send(channel, payload) {
            var meta = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var context, msg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, hook, resp, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2;

            return _regeneratorRuntime.async(function send$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context = {};
                        msg = {
                            channel: channel,
                            payload: payload,
                            meta: meta
                        };
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        context$2$0.prev = 5;
                        _iterator = _getIterator(this._pre);

                    case 7:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            context$2$0.next = 14;
                            break;
                        }

                        hook = _step.value;
                        context$2$0.next = 11;
                        return _regeneratorRuntime.awrap(hook(msg, context));

                    case 11:
                        _iteratorNormalCompletion = true;
                        context$2$0.next = 7;
                        break;

                    case 14:
                        context$2$0.next = 20;
                        break;

                    case 16:
                        context$2$0.prev = 16;
                        context$2$0.t0 = context$2$0['catch'](5);
                        _didIteratorError = true;
                        _iteratorError = context$2$0.t0;

                    case 20:
                        context$2$0.prev = 20;
                        context$2$0.prev = 21;

                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }

                    case 23:
                        context$2$0.prev = 23;

                        if (!_didIteratorError) {
                            context$2$0.next = 26;
                            break;
                        }

                        throw _iteratorError;

                    case 26:
                        return context$2$0.finish(23);

                    case 27:
                        return context$2$0.finish(20);

                    case 28:
                        debug('Sending', channel);
                        context$2$0.next = 31;
                        return _regeneratorRuntime.awrap(this._send(msg));

                    case 31:
                        resp = context$2$0.sent;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        context$2$0.prev = 35;
                        _iterator2 = _getIterator(this._post);

                    case 37:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            context$2$0.next = 44;
                            break;
                        }

                        hook = _step2.value;
                        context$2$0.next = 41;
                        return _regeneratorRuntime.awrap(hook(resp, msg, context));

                    case 41:
                        _iteratorNormalCompletion2 = true;
                        context$2$0.next = 37;
                        break;

                    case 44:
                        context$2$0.next = 50;
                        break;

                    case 46:
                        context$2$0.prev = 46;
                        context$2$0.t1 = context$2$0['catch'](35);
                        _didIteratorError2 = true;
                        _iteratorError2 = context$2$0.t1;

                    case 50:
                        context$2$0.prev = 50;
                        context$2$0.prev = 51;

                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }

                    case 53:
                        context$2$0.prev = 53;

                        if (!_didIteratorError2) {
                            context$2$0.next = 56;
                            break;
                        }

                        throw _iteratorError2;

                    case 56:
                        return context$2$0.finish(53);

                    case 57:
                        return context$2$0.finish(50);

                    case 58:
                        if (resp.success) {
                            context$2$0.next = 60;
                            break;
                        }

                        throw resp.error;

                    case 60:
                        return context$2$0.abrupt('return', resp.result);

                    case 61:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[5, 16, 20, 28], [21,, 23, 27], [35, 46, 50, 58], [51,, 53, 57]]);
        }
    }, {
        key: 'pre',
        value: function pre(callback) {
            this._pre.push(callback);
        }
    }, {
        key: 'post',
        value: function post(callback) {
            this._post.push(callback);
        }
    }]);

    return Emitter;
})();

exports['default'] = Emitter;
module.exports = exports['default'];