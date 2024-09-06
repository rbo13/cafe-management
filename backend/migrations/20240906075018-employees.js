'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS employees (
      id VARCHAR(10) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email_address VARCHAR(100) NOT NULL UNIQUE,
      phone_number CHAR(8) NOT NULL,
      gender ENUM('Male', 'Female') NOT NULL,
      CHECK (phone_number REGEXP '^[89][0-9]{7}$'),
      INDEX idx_employee_name (name)
    );
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DROP TABLE IF EXISTS employees;
  `);
};

exports._meta = {
  "version": 1
};
