USE cafe;

INSERT INTO employees (id, name, email_address, phone_number, gender)
    VALUES
      ('UIAA000000', 'John Doe', 'johndoe@example.com', '91234567', 'Male'),
      ('UIAA110000', 'Jane Smith', 'janesmith@example.com', '81234567', 'Female'),
      ('UIAA220000', 'Bito Burk', 'bitoburk@example.com', '81234588', 'Male'),
      ('UIAA330000', 'Sam Choi', 'bhardychoi@example.com', '81234599', 'Female'),
      ('UIAA440000', 'Richard Burk', 'richardburk@example.com', '81234218', 'Male'),
      ('UIAA450000', 'Sheldon Cooper', 'sheldoncooper@example.com', '81234912', 'Male'),
      ('UIAA210000', 'Penny', 'penny@example.com', '81234991', 'Female'),
      ('UIAA000001', ' Leonard Hofstadter', 'lenny@example.com', '81234881', 'Male');

INSERT INTO cafes (id, name, description, location)
    VALUES
      ('11111111-2222-3333-4444-555555555555', 'Cafe Mocha', 'A cozy cafe serving the best mocha in town.', '123 Main St'),
      ('66666666-7777-8888-9999-000000000000', 'The Beanery', 'An artisanal coffee shop with a variety of beans.', '456 Oak Ave'),
      ('77777777-4444-7777-6666-010101010101', 'The Homebrew', 'Local brew.', '456 Oak Ave'),
      ('55555555-6666-9999-7777-111111111111', 'Mochachino', '', '382 Java Ave'),
      ('44444444-6666-2222-8888-222222222222', 'See Bee Tee El', '', '382 Java Ave'),
      ('33333333-1111-3333-5555-444444444444', 'Tightrope Coffee', '', '382 Java Ave'),
      ('22222222-5555-1111-7777-333333333333', 'StarBuks', 'Because why not?', '382 Java Ave'),
      ('55555555-6666-8888-7777-111111111111', 'Morning Drip', 'Get your daily caffeine drip.', '382 Java Ave');

INSERT INTO employee_cafes (employee_id, cafe_id, start_date)
    VALUES
      ('UIAA000000', '11111111-2222-3333-4444-555555555555', '2024-01-01'),
      ('UIAA110000', '11111111-2222-3333-4444-555555555555', '2024-01-05'),
      ('UIAA220000', '55555555-6666-8888-7777-111111111111', '2024-01-05'),
      ('UIAA440000', '22222222-5555-1111-7777-333333333333', '2024-02-06'),
      ('UIAA330000', '55555555-6666-8888-7777-111111111111', '2024-02-05'),
      ('UIAA210000', '22222222-5555-1111-7777-333333333333', '2024-02-05'),
      ('UIAA000001', '44444444-6666-2222-8888-222222222222', '2024-02-08'),
      ('UIAA450000', '55555555-6666-8888-7777-111111111111', '2024-03-05');