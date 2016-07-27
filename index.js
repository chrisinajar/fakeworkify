var partial = require('ap').partial;
var EventEmitter = require('events').EventEmitter;

module.exports = fakeWorkify;

function fakeWorkify (fn) {
  var outerEmitter = new EventEmitter();
  var innerEmitter = new EventEmitter();
  var w = {
    addEventListener: outerEmitter.on.bind(outerEmitter),
    postMessage: partial(sendMessage, innerEmitter)
  };
  var self = {
    addEventListener: innerEmitter.on.bind(innerEmitter),
    postMessage: partial(sendMessage, outerEmitter)
  };

  fn(self);

  return w;

  function sendMessage (emitter, message) {
    emitter.emit('message', {
      data: message
    });
  }
}
