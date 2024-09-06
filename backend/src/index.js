import logger from 'loglevel'
import { startApp } from './app'

const isTest = process.env.NODE_ENV === 'test'
const logLevel = process.env.LOG_LEVEL || (isTest ? 'warn' : 'info')

logger.setLevel(logLevel)

startApp()