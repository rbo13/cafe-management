CREATE TABLE IF NOT EXISTS employees (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  email_address VARCHAR(100) NOT NULL UNIQUE,
  phone_number CHAR(8) NOT NULL UNIQUE,
  gender ENUM('Male', 'Female') NOT NULL,
  CHECK (phone_number REGEXP '^[89][0-9]{7}$'),
  INDEX idx_employee_name (name)
);

CREATE TABLE IF NOT EXISTS cafes (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  logo BLOB,
  location VARCHAR(255) NOT NULL,
  INDEX idx_cafe_location (location),
  INDEX idx_cafe_name (name)
);

CREATE TABLE IF NOT EXISTS employee_cafes (
  employee_id VARCHAR(10),
  cafe_id CHAR(36),
  start_date DATE NOT NULL,
  PRIMARY KEY (employee_id, cafe_id),
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (cafe_id) REFERENCES cafes(id),
  UNIQUE (employee_id)
);