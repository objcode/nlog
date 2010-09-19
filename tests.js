
var assert = function(msg, test) {
    if (!test) {
        throw msg;
    }
}

var assertEqual = function(msg, expected, actual) {
    //this is really terrible and needs a lot of work.
    var failure_msg = msg + '[expected=' + expected + ', actual=' + actual + ']';
    if (typeof(expected) === 'number' || typeof(expected) === 'string') {
        assert(failure_msg, expected === actual);
    }

    if (expected.length != actual.length) {
        throw failure_msg;
    }

    for(pos in expected) {
        if(typeof(actual[pos]) === 'object') {
            assertEqual(msg, expected[pos], actual[pos]);
        } else {
            assert(failure_msg, expected[pos] === actual[pos]);
        }
    }
}

assert('can import', require('./nlog'));

var nlog = require('./nlog');

var setup = function() {
    nlog.emitters = [];
}

tests = {
    can_add_emitter: function() {
        nlog.addEmitter(5);
        assertEqual('emitter added', [5], nlog.emitters);
    },
    emit_gets_called: function() {
        values = [];
        var emitter = function(name, level, msg, args) {
            values = [name, level, msg, args];
        }
        nlog.addEmitter(emitter);
        log = nlog.getLogger('name');
        log.log('level', 'msg', 'args');
        assertEqual('we actually called something',
                         ['name', 7, 'msg', ['args']], values);
    },
    check_puts_logger: function() {
        log = nlog.getLogger('name');
        log.log(nlog.debug, 'hello, world.', 'arg1', 'arg2');
    },
    check_puts_debug: function() {
        log = nlog.getLogger('woah');
        log.debug('hello debug');
    },
}

for(test in tests) {
    try {
        setup();
        tests[test]();
    }
    catch(err) {
        console.log("Failed test (" + test + "): " + err);
        throw err;
    }
}

