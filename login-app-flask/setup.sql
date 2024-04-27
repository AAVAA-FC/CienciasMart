create database cienciasmart;

create user 'aavaa'@'localhost' identified by 'aavaa';

grant all privileges on cienciasmart.* to 'aavaa'@'localhost' with grant option;

use cienciasmart;

CREATE TABLE buyer (
    buyer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    last_name_father VARCHAR(20) NOT NULL,
    last_name_mother VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    cellphone CHAR(10) NOT NULL UNIQUE,
    CONSTRAINT chk_cellphone_length_buyer CHECK (LENGTH(cellphone) = 10)
);

CREATE TABLE seller (
    seller_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    last_name_father VARCHAR(20) NOT NULL,
    last_name_mother VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    cellphone CHAR(10) NOT NULL UNIQUE,
    CONSTRAINT chk_cellphone_length_seller CHECK (LENGTH(cellphone) = 10)
);
