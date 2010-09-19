
// Increment a basic logging module, it has no features, but it does everything
// you need if you want more DIAF.

var sys = require('sys');

exports.levels = {
    'trace': 0,
    'debug': 1,
    'info': 2,
    'warn': 3,
    'error': 4,
    'except': 5,
    'crit': 6,
    'nuke': 7
}

level_names = {}
for(level in exports.levels) {
    level_names[exports.levels[level]] = level;
}

exports.emitters = [];

 var emitLog = function(name, level, msg, args) {
    if (exports.emitters.length === 0) {
        exports.putsEmitter(exports.levels.debug, /.*/)(name, level, msg, args);
    } else {
        exports.emitters.forEach(
            function(emitter) {
                emitter(name, level, msg, args);
            }
        )
    }
}       

exports.getLogger = function(name) {
    var log = function() {
        args = []
        for (pos = 0; pos < arguments.length; pos++) {
            args[pos] = arguments[pos];
        }
        level = args[0];
        if (typeof(level) != 'number') {
            level = exports.levels.nuke;
        }
        msg = args[1];
        args = args.slice(2);
        emitLog(name, level, msg, args)
    }
    return {
        log: log,
        trace: function() {
            log(exports.levels.trace, arguments);
        },
        debug: function() {
            log(exports.levels.debug, arguments);
        },
        info: function() {
            log(exports.levels.info, arguments);
        },
        warn: function() {
            log(exports.levels.warn, arguments);
        },
        error: function() {
            log(exports.levels.error, arguments);
        },
        except: function() {
            log(exports.levels.except, arguments);
        },
        crit: function() {
            log(exports.levels.crit, arguments);
        },
        nuke: function() {
            log(exports.levels.nuke, arguments);
        }
    }
}

exports.addEmitter = function(emitter) {
    return exports.emitters.push(emitter);
}

exports.putsEmitter = function(base_level, name_regex) {
    return function(name, level, msg, args) {
        if(level < base_level) {
            return;
        }
        if(! name_regex.test(name)) {
            return;
        }
        sys.puts(Date() + ' - ' + level_names[level] + ' - ' + msg + ' ' + args);
    }
}
        