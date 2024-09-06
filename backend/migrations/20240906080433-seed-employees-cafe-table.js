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
    INSERT INTO employee_cafes (employee_id, cafe_id, start_date)
    VALUES
      ('UIAA000000', '11111111-2222-3333-4444-555555555555', '2024-01-01'),
      ('UIAA110000', '66666666-7777-8888-9999-000000000000', '2024-01-05'),
      ('UIAA220000', '55555555-6666-8888-7777-111111111111', '2024-01-05');
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DELETE FROM employee_cafes
    WHERE employee_id IN ('E001', 'E002');
  `);
};

exports._meta = {
  "version": 1
};
