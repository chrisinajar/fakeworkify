var test = require('tape');
var Fakeworkify = require('./');

test('fake workify', function (t) {
  t.plan(6);

  var w = Fakeworkify(WorkerMethod);
  t.ok(w, 'returns truthy object');
  t.ok(typeof w.addEventListener === 'function', 'outer should have browser style event API');
  t.ok(typeof w.postMessage === 'function', 'outer should have postMessage method');

  w.addEventListener('message', function (ev) {
    t.equal(ev.data, 'indeed');
  });
  w.postMessage('indeed');

  function WorkerMethod (self) {
    t.ok(typeof self.addEventListener === 'function', 'inner should have browser style event API');
    t.ok(typeof self.postMessage === 'function', 'inner should have postMessage method');
    self.addEventListener('message', function (ev) {
      self.postMessage(ev.data);
    });
  }
});
