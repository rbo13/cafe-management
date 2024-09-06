'use strict';

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
  require('./dist')
} else {
  require('nodemon')({ script: 'dev.js' })
}