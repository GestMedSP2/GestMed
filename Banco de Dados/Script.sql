CREATE DATABASE gestMed;

USE gestMed;

CREATE TABLE usuario(
id INT PRIMARY KEY NOT NULL, 
cargo CHAR(3) NOT NULL,
nome_completo VARCHAR(150) NOT NULL,
email VARCHAR(150) NOT NULL,
senha VARCHAR(100) NOT NULL,
CONSTRAINT chkCargo CHECK (cargo in('ADM', 'CMM'))
);

DESC usuario;

INSERT INTO usuario values
('0123111', 'CMM', 'José Pereira Pinto da silva', 'josepereira243@gmail.com', 'josé123'),
('0123222', 'ADM', 'Maria Soares da Silva', 'mari.soares@outlook.com', 'M@riajojo2543'),
('0123333', 'CMM', 'Tadeu Bartolomeu Silva de Nogueira', 'tadeu.bartolomeu@sptech.school', '487236'),
('0123444', 'CMM', 'Jacinto Oliveira de Ramos', 'jacinto.oliveira@hotmail.com.br', '19912003');

DESC usuario;

SELECT * FROM usuario;

CREATE TABLE dados_sensor (
	codigoSensor VARCHAR(50) PRIMARY KEY,
    sttSensor VARCHAR(20) CONSTRAINT chkStatus CHECK (sttSensor IN('Ativo', 'Inativo', 'Em manutenção')),
    temperaturaMin DECIMAL(4, 2), 
    temperaturaMax DECIMAL(4, 2),
    umidadeMin TINYINT, 
    umidadeMax TINYINT
);

DESC dados_sensor;

INSERT INTO dados_sensor VALUES
('0223', 'Ativo', '6', '20', '50', '80'),
('0224', 'Inativo', '6', '20', '50', '80'),
('0225', 'Em manutenção', '6', '20', '50', '80');

SELECT * FROM dados_sensor;
SELECT * FROM dados_sensor WHERE codigoSensor = '0223';

CREATE TABLE controle (
id INT PRIMARY KEY AUTO_INCREMENT,
dtColeta DATETIME DEFAULT CURRENT_TIMESTAMP, 
temperatura DECIMAL(4,2),
umidade TINYINT,
codigoSensor VARCHAR (50) 
);

DESC controle;

INSERT INTO controle (codigoSensor, temperatura, umidade) VALUES
('0223', '20', '60'),
('0224', '15', '55'),
('0223', '18', '70');

SELECT * FROM controle;
SELECT * FROM controle WHERE codigoSensor = '0223';
