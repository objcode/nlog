Noded logging supporting multiple emitters.  By using the emitters chain, you can support things like sending different log lines to different endpoints.

    var log = require('nlog').getLogger('logger_name');
    log.debug('A message goes here.');

By default, debug+ messages will be emitted to stdout.  When you add the first emitter, it will take precedence, you can use this to supress messages.

All registered emitters are called for every log message.  If you want to emit different messages to different files, etc, simply make a logger that does the appropriate logic.

This is version -0.1.  Still missing tons of functionality, and not well coded javascript.  You'll probably need to fix bugs if you try to use it now.