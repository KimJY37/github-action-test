const winston = require('winston')
const winstonDaily = require('winston-daily-rotate-file')


const logDir = './logs';  // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf, label } = winston.format

// Define log format
const logFormat = printf(info => {
  return `[${info.timestamp}] [${info.level}] ${info.label}: ${info.message}`
})

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const getLogger = (path) => {
  const logger = winston.createLogger({
    format: combine(
      label({ label: path }), 
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    transports: [
      // info 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%.log`,
        maxFiles: 30,  // 30일치 로그 파일 저장
        zippedArchive: true, 
      }),
      // error 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
    ],
  }
  )
  logger.add(new winston.transports.Console({
      level: 'debug',
      format: combine(
        label({ label: path }), 
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      )
  }))
  return logger
};


module.exports = getLogger