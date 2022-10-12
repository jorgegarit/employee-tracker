INSERT INTO departments (name)
    VALUES
    ('Products'),
    ('Development'),
    ('Ops'),
    ('Sales'),
    ('Finance');

INSERT INTO roles (title, salary, departments_id)
    VALUES
    ('UX/UI Developer','70000','1'),
    ('Product Development Engineer','80000','1'),
    ('Sr. Product Development Engineer','100000','1'),
    ('Products Manager','120000','1'),
    ('Front-End Developer','70000','2'),
    ('Back-End Developer','75000','2'),
    ('Full-Stack Lead Developer','90000','2'),
    ('Customer Support Rep','40000','3'),
    ('Technical Support Rep','45000','3'),
    ('Customer Support Lead','48000','3'),
    ('Technical Support Lead','53000','3'),
    ('Operations Manager','80000','3'),
    ('Sales Development Rep','50000','4'),
    ('Sales Development Lead','60000','4'),
    ('Payment Consultant','70000','4'),
    ('Lead Payment Consultant','90000','4'),
    ('Junior Financial Analyst','50000','5'),
    ('Financial Analyst','70000','5'),
    ('Finance Manager','90000','5');

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
    VALUES
    ('Jordin', 'King', 4, NULL), 
    ('Ahmad', 'Liu', 3, 1),
    ('Leandro', 'Erickson', 2, 1),
    ('Paityn', 'Small', 1, 1),
    ('Paris', 'Kim', 1, 1),
    ('Alanna', 'Calderon', 7, NULL),
    ('Braxton', 'Hendrix', 6, 6),
    ('Harrison', 'Ibarra', 6, 6),
    ('Dangelo', 'Perkins', 5, 6),
    ('Dakota', 'Mejia', 12, NULL),
    ('Reece', 'Adkins', 11, 10), 
    ('Dawson', 'Morrison', 10, 10),
    ('Amira', 'Stanley', 9, 11),
    ('Julianna', 'Diaz', 9, 11),
    ('Leonardo', 'Owens', 8, 12),
    ('Dulce', 'Meadows', 8, 12),
    ('Madilynn', 'Fuentes', 8, 12),
    ('Amir', 'Schaefer', 16, NULL),
    ('Raina', 'Dalton', 15, 18),
    ('Yuliana', 'Farmer', 15, 18),
    ('Xander', 'Heath', 14, 18), 
    ('Jaliyah', 'Henry', 13, 21),
    ('Trevor', 'Weaver', 13, 21),
    ('Khloe', 'Fry', 13, 21),
    ('Walter', 'White', 19, NULL),
    ('Saul', 'Villegas', 18, 25),
    ('Dominick', 'Perkins', 18, 25),
    ('Benjamin', 'Baley', 17, 25),
    ('Cameron', 'Mullen', 17, 25),
    ('Mauricio', 'Gaines', 17, 25);


