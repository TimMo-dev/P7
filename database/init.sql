CREATE TYPE types AS ENUM ('int', 'string','double','collection','none');

CREATE TABLE IF NOT EXISTS programming_task(
    title VARCHAR(50),
    description TEXT, 
    taskid SERIAL PRIMARY KEY,
);
 
CREATE TABLE IF NOT EXISTS Tests (
    test_case_id PRIMARY KEY
    taskid references programming_task
);

CREATE TABLE IF NOT EXISTS Test_Output (
    output_id PRIMARY KEY 
    test_case_id REFERENCES Tests    
    output_description VARCHAR(50)
    expected_output VARCHAR(50)
)

INSERT INTO programming_task (title, description) VALUES
    ('Addition', 'Return the sum of two numbers.'),
    ('String Length', 'Calculate the length of a given string.'),
    ('Prime Check', 'Determine if a number is a prime.'),
    ('Fibonacci Sequence', 'Return the nth Fibonacci number.');

INSERT INTO Tests (test_case_id, taskid) VALUES
    (1, 1),  
    (2, 1),  
    (3, 2), 
    (4, 3),  
    (5, 3),  
    (6, 4);   

INSERT INTO Test_Output (test_case_id, output_description, expected_output) VALUES
    (1, 'Sum of 5 and 7', '12'),
    (2, 'Sum of -3 and 9', '6'),
    (3, 'Length of ''hello''', '5'),
    (4, 'Prime check for 17', 'True'),
    (5, 'Prime check for 18', 'False'),
    (6, '6th Fibonacci number', '8');
