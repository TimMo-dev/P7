-- Whole file is deprecated.

CREATE TABLE IF NOT EXISTS Programming_Task(
    title VARCHAR(50),
    description TEXT, 
    taskid SERIAL PRIMARY KEY
    fk_test_case_id INTEGER REFERENCES Test_Suite
);
 
CREATE TABLE IF NOT EXISTS Test_Suite (
    test_case_id INTEGER PRIMARY KEY,
    description TEXT,
    fk_programming_task_id INTEGER REFERENCES Programming_task
);

CREATE TABLE IF NOT EXISTS Test (
    test_id INTEGER PRIMARY KEY,
    fk_test_suite_id INTEGER REFERENCES Test_Suite,
    test_input varchar (50),
    expected_output varchar(50)
);

INSERT INTO Programming_task (title, description) VALUES
    ('Addition', 'Return the sum of two numbers.'),
    ('String Reversal', 'Reverse a given string.'),
    ('Prime Checker', 'Check if a number is prime.'),
    ('Fibonacci Sequence', 'Return the nth number in the Fibonacci series.');

INSERT INTO Tests (test_case_id, taskid) VALUES
    (1, 1),  
    (2, 1),
    (3, 2),  
    (4, 3),  
    (5, 3),  
    (6, 4);

INSERT INTO Test_Output (output_id, test_case_id, output_description, expected_output) VALUES
    (1, 1, 'Sum of 3 and 5', '8'),
    (2, 2, 'Sum of -2 and 10', '8'),
    (3, 3, 'Reverse ''hello''', 'olleh'),
    (4, 4, 'Is 17 a prime number?', 'True'),
    (5, 5, 'Is 18 a prime number?', 'False'),
    (6, 6, '5th Fibonacci number', '5');
