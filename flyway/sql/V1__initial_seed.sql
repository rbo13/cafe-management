USE cafe;

INSERT INTO employees (id, name, email_address, phone_number, gender)
    VALUES
      ('UIAA000000', 'John Doe', 'johndoe@example.com', '91234567', 'Male'),
      ('UIAA110000', 'Jane Smith', 'janesmith@example.com', '81234567', 'Female'),
      ('UIAA220000', 'Richard Burk', 'richardburk@example.com', '81234567', 'Male');

INSERT INTO cafes (id, name, description, location)
    VALUES
      ('11111111-2222-3333-4444-555555555555', 'Cafe Mocha', 'A cozy cafe serving the best mocha in town.', '123 Main St'),
      ('66666666-7777-8888-9999-000000000000', 'The Beanery', 'An artisanal coffee shop with a variety of beans.', '456 Oak Ave'),
      ('55555555-6666-8888-7777-111111111111', 'Mochachino', '', '382 Java Ave');

INSERT INTO employee_cafes (employee_id, cafe_id, start_date)
    VALUES
      ('UIAA000000', '11111111-2222-3333-4444-555555555555', '2024-01-01'),
      ('UIAA110000', '66666666-7777-8888-9999-000000000000', '2024-01-05'),
      ('UIAA220000', '55555555-6666-8888-7777-111111111111', '2024-01-05');