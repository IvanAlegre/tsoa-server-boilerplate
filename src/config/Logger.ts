import * as logger from 'winston'

logger.configure({
  level: 'info',
  transports: [
    new logger.transports.Console({ handleExceptions: true })
  ],
  exitOnError: false
})

export = logger
