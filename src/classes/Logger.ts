import winston from 'winston'
import 'winston-daily-rotate-file'

import {asyncLocalStorage} from '@classes/requestIdCreaterMiddleware'

import process from 'node:process'


const levels = {

    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    admin: 5
}

const level = () => {
    const env = process.env.NODE_ENV || 'DEV'
    return env ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'bold cyan',
    admin: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    winston.format.colorize({all: true}),
    winston.format.printf(
        (info) =>
        {
            const store = asyncLocalStorage.getStore()
            const requestId = store?.get('requestId') || ''

            return`${info.timestamp} ${requestId || ''} ${info.level}: ${info.message}`
        }
    )
)



const transports = [

    new winston.transports.Console({
        level: 'http'
    }),

    new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%_ERROR.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error'
    }),

    new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%_OUT.log',
        datePattern: 'YYYY-MM-DD',
        level: 'http'
    }),

    new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%_ALL.log',
        datePattern: 'YYYY-MM-DD'
    })
]

if (process.env.NODE_ENV === 'DEV') transports[0].level = 'debug'

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
})

export default Logger
