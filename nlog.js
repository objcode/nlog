
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

var argsToList = function(args) {
    ret = []
    for(pos = 0; pos < args.length; pos++) {
        ret[pos] = args[pos]
    }
    return ret;
}


exports.getLogger = function(name) {
    var log = function() {
        args = argsToList(arguments)
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
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
        },
        debug: function() {
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
        },
        info: function() {
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
        },
        warn: function() {
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
        },
        error: function() {
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
        },
        except: function() {
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
        },
        crit: function() {
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
        },
        nuke: function() {
            args = [name, exports.levels.debug].concat(argsToList(arguments));
            log.apply(this, args);
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
        