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
    CREATE TABLE IF NOT EXISTS employee_cafes (
        employee_id VARCHAR(10),
        cafe_id CHAR(36),
        start_date DATE NOT NULL,
        PRIMARY KEY (employee_id, cafe_id),
        FOREIGN KEY (employee_id) REFERENCES employees(id),
        FOREIGN KEY (cafe_id) REFERENCES cafes(id),
        UNIQUE (employee_id)
    );
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DROP TABLE IF EXISTS employee_cafes;
  `);
};

exports._meta = {
  "version": 1
};
