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
    INSERT INTO employees (id, name, email_address, phone_number, gender)
    VALUES
      ('UIAA000000', 'John Doe', 'johndoe@example.com', '91234567', 'Male'),
      ('UIAA110000', 'Jane Smith', 'janesmith@example.com', '81234567', 'Female'),
      ('UIAA220000', 'Richard Burk', 'richardburk@example.com', '81234567', 'Male');
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DELETE FROM employees WHERE id IN ('UIAA000000', 'UIAA110000', 'UIAA220000');
  `);
};

exports._meta = {
  "version": 1
};
