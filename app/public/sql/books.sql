CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

DROP TABLE IF EXISTS student;
CREATE TABLE student (
	id int PRIMARY KEY AUTO_INCREMENT ,
    username varchar(24) UNIQUE NOT NULL,
    name varchar(48)
);

INSERT INTO student (id, username, name) VALUES 
(1, 'tomgreg', 'Tom Gregory'),
(2, 'beth1', 'Beth Barnhart'),
(3, 'bipin', 'Prof. Prabhakar');

-- SELECT * FROM students;

DROP TABLE IF EXISTS offer;
CREATE TABLE offer (
	id int PRIMARY KEY AUTO_INCREMENT,
    studentId int NOT NULL REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
	companyName VARCHAR(24) NOT NULL DEFAULT '',
    salary int NOT NULL DEFAULT 0,
    bonus int NOT NULL DEFAULT 0,
	offerDate date NOT NULL DEFAULT(CURRENT_DATE)
);

-- Student 1 has no offers, Student 2 has 3 offers, Student 3 has one offer
INSERT INTO offer(id, studentId, companyName, salary, bonus, offerDate) VALUES
  (1, 2, 'KPMG', 95000, 7000, '2021-09-30'),
  (2, 2, 'Deloitte Digital', 94000, 12000, '2021-10-03'),
  (3, 2, 'IU, ISGP', 54000, 0, '2021-10-05'),
  (4, 3, 'Amazon', 122000, 11000, '2021-10-15')
;
DROP TABLE IF EXISTS books;
CREATE TABLE books (
	id int PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(500) NOT NULL DEFAULT '',
    title VARCHAR(48) NOT NULL DEFAULT '',
    author VARCHAR(100) NOT NULL DEFAULT '',
	yearPublished int NOT NULL DEFAULT 0000,
    pageCount int NOT NULL DEFAULT 0,
    msrp VARCHAR(10) NOT NULL DEFAULT 0.00
);
INSERT INTO books(id,image,title,author,yearPublished,pageCount,msrp) Values
(1,'https://images.gr-assets.com/books/1371652590m/15839984.jpg','Cruel Beauty','Rosamund Hodge',2014,201,'6.50'),
(2,'https://images-na.ssl-images-amazon.com/images/I/515dn0G7urL.jpg','A Beautiful Mind','Sylvia Nasar',1998,175,'12.99'),
(3,'https://images-na.ssl-images-amazon.com/images/I/51gHjDpGdvL._SX312_BO1,204,203,200_.jpg','The Voyages of Doctor Dolittle','Hugh Lofting, Michael Hague',1922,255,'13.50'),
(4,'https://images-na.ssl-images-amazon.com/images/I/71Zke+xZ+2L.jpg','Blaze','Richard Bachman, Stephen King',2007,370,'15.50'),
(5,'https://images-na.ssl-images-amazon.com/images/I/514bBOeVp4L._SX303_BO1,204,203,200_.jpg','The Portrait of a Lady','Henry James, Patricia Crick',1881,363,'11.00'),
(6,'https://m.media-amazon.com/images/I/5173hbKPVDL.jpg','The Time Paradox','Eoin Colfer',2008,426,'17.95'),
(7,'https://images-na.ssl-images-amazon.com/images/I/81LSr4CwBhL.jpg','Unnatural Exposure','Patricia Cornwell',1997,322,'14.95'),
(8,'https://images.penguinrandomhouse.com/cover/9780345539434','Cosmos','Carl Sagan',1980,220,'7.95')
;
Select * From books;

-- COMMIT;

-- CREATE USER 'msisreader'@'%' IDENTIFIED BY 'msisreadonly';
-- GRANT SELECT ON * . * TO 'msisreader'@'%';
