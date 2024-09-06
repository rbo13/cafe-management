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
    INSERT INTO cafes (id, name, description, location)
    VALUES
      ('11111111-2222-3333-4444-555555555555', 'Cafe Mocha', 'A cozy cafe serving the best mocha in town.', '123 Main St'),
      ('66666666-7777-8888-9999-000000000000', 'The Beanery', 'An artisanal coffee shop with a variety of beans.', '456 Oak Ave'),
      ('55555555-6666-8888-7777-111111111111', 'Mochachino', '', '382 Java Ave');
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DELETE FROM cafes WHERE name IN ('Cafe Mocha', 'The Beanery', 'Mochachino');
  `);
};

exports._meta = {
  "version": 1
};
