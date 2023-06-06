CREATE DATABASE gestmed;

USE gestmed;

CREATE TABLE endereco(
idEndereco INT auto_increment primary key, 
cep CHAR(9),
logradouro VARCHAR(100),
numero INT,
bairro VARCHAR(45), 
cidade VARCHAR(45),
estado VARCHAR(45),
complemento VARCHAR(45)
);

CREATE TABLE empresa (
idEmpresa INT auto_increment primary key,
nomeEmpresa VARCHAR(45),
cnpj CHAR(18),
telefone BIGINT,
emailEmpresa VARCHAR(100),
fkEndereco INT,
CONSTRAINT fkEnd FOREIGN KEY (fkEndereco)
REFERENCES endereco(idEndereco)
);

CREATE TABLE funcionario(
idFuncionario INT,
fkEmpresa INT,
nome VARCHAR(45),
sobrenome VARCHAR (50),
cargo VARCHAR(10),
email VARCHAR(45),
senha VARCHAR(16),
CONSTRAINT fkEmp FOREIGN KEY (fkEmpresa)
REFERENCES empresa (idEmpresa),
CONSTRAINT chkCar CHECK (cargo in ('ADM','CMM')),
CONSTRAINT pkCompostaEmp PRIMARY KEY (idFuncionario, fkEmpresa)
);

CREATE TABLE setor(
idSetor INT auto_increment primary key,
fkEmpresaSetor INT,
nomeSetor VARCHAR(45),
armazenaTermolabeis BOOLEAN,
CONSTRAINT fkEmpS FOREIGN KEY (fkEmpresaSetor)
REFERENCES empresa (idEmpresa)
);

CREATE TABLE sensor (
idSensor VARCHAR(45),
fkSetor INT,
fkEmpresaE INT,
status VARCHAR(20),
CONSTRAINT chckStatus CHECK (status IN('Ativo', 'Inativo', 'Em manutenção')),
CONSTRAINT fkEmpE FOREIGN KEY (fkEmpresaE)
REFERENCES empresa (idEmpresa),
CONSTRAINT fkSetor FOREIGN KEY (fkSetor)
REFERENCES setor (idSetor),
CONSTRAINT pkCompostaSensor PRIMARY KEY (idSensor, fkSetor)
);



CREATE TABLE dados (
idDados INT AUTO_INCREMENT,
fkSensor VARCHAR(45),
temperatura DECIMAL (4,2),
umidade DECIMAL (4,2),
dataColeta DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fkSen FOREIGN KEY (fkSensor)
REFERENCES sensor(idSensor),
CONSTRAINT pkCompostaDados PRIMARY KEY (idDados, fkSensor)
); 
   
SELECT * FROM dados;
SELECT * FROM setor;
SELECT * FROM funcionario;

SELECT nomeSetor, dataColeta, temperatura, umidade, 
(CASE WHEN armazenaTermolabeis = TRUE THEN 7 ELSE 29 END) AS temperaturaMaxima,
(CASE WHEN armazenaTermolabeis = TRUE THEN 9 ELSE 32 END) AS temperaturaAlertaMaxima,
(CASE WHEN armazenaTermolabeis = TRUE THEN 1 ELSE 15 END) AS temperaturaAlertaMinima,
(CASE WHEN armazenaTermolabeis = TRUE THEN 3 ELSE 16 END) AS temperaturaMinima FROM dados
JOIN sensor ON fkSensor = idSensor
JOIN setor ON fkSetor = idSetor
JOIN empresa ON idEmpresa = fkEmpresaE;

SELECT nomeSetor, dataColeta, temperatura, umidade,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 7 ELSE 29 END) AS temperaturaMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 9 ELSE 32 END) AS temperaturaAlertaMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 1 ELSE 15 END) AS temperaturaAlertaMinima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 3 ELSE 16 END) AS temperaturaMinima FROM empresa
        JOIN setor ON setor.fkEmpresaSetor = empresa.idEmpresa JOIN sensor ON sensor.fkSetor = setor.idSetor
        JOIN dados ON dados.fkSensor = sensor.idSensor
        WHERE empresa.idEmpresa = 1;

INSERT INTO endereco VALUES
	(null, '06543-306', 'Viela da Esperança', 160, 'Cidade Antônio Estevão de Carvalho', 'São Paulo', 'SP', null),
    (null, '04368-010', 'Rua Manuel Queiroz', 40, 'Vila Santa Catarina', 'São Paulo', 'SP', null);

INSERT INTO empresa VALUES
	(null, 'Cimed', '02.814.497/0001-07', '1122062010', 'cimed@hotmail.com', 1),
    (null, 'Cimegripe', '98.971.928/0001-18', '1100010012', 'cimegripe@hotmail.com', 2);
    
INSERT INTO funcionario VALUES
	('12345', 1, 'Marcos', 'Augusto', 'ADM', 'marcos.augusto@outlook.com', 'acessoGM'),
	('23456', 1, 'Ana', 'Silva', 'CMM', 'ana.silva@gmail.com', 'acessoRH'),
	('34567', 1, 'Pedro', 'Santos', 'CMM', 'pedro.santos@hotmail.com', 'acessoTI'),
	('45678', 1, 'Carolina', 'Ferreira', 'CMM', 'carolina.ferreira@gmail.com', 'acessoVendas'),
	('56789', 1, 'Lucas', 'Souza', 'CMM', 'lucas.souza@outlook.com', 'acessoFinanceiro'),
	('67890', 1, 'Camila', 'Almeida', 'CMM', 'camila.almeida@gmail.com', 'acessoMarketing'),
	('78901', 1, 'Rafael', 'Oliveira', 'CMM', 'rafael.oliveira@hotmail.com', 'acessoProducao'),
	('89012', 1, 'Larissa', 'Pereira', 'CMM', 'larissa.pereira@gmail.com', 'acessoLogistica'),
	('90123', 1, 'Guilherme', 'Ramos', 'CMM', 'guilherme.ramos@outlook.com', 'acessoCompras'),
	('90123', 2, 'Manoela', 'Anjos', 'ADM', 'manoela.anjos@outlook.com', 'acessoCompras');

INSERT INTO setor VALUES 
	(null, 1, 'Loratadina', false),
    (null, 1, 'Insulina', true),
    (null, 1, 'Cimegripe', false),
    (null, 1, 'Nimesulida', false),
    (null, 1, 'Loratamed', false);

INSERT INTO sensor VALUES
	('012311', 1, 1, 'Ativo'),
	('012322', 1, 1, 'Ativo'),
	('012333', 1, 1, 'Ativo'),
	('012344', 1, 1, 'Ativo'),
	('012355', 1, 1, 'Ativo'),
	('012366', 1, 1, 'Ativo'),
	('012377', 1, 1, 'Ativo'),
	('012388', 1, 1, 'Ativo'),
	('012399', 1, 1, 'Ativo'),
	('012300', 1, 1, 'Ativo');

INSERT INTO dados VALUES
	(null, '012311', 25.2, 45, '2023-05-30'),
	(null, '012322', 22.6, 50, '2023-05-31'),
	(null, '012333', 20.8, 65, '2023-06-01'),
	(null, '012344', 28.2, 70, '2023-06-02'),
	(null, '012366', 24.8, 75, '2023-06-03'),
	(null, '012399', 22.6, 75, '2023-06-04'),
	(null, '012300', 23.7, 60, '2023-06-05');
    
INSERT INTO dados VALUES
	(null, '012388', 25.2, 50, '2023-06-06 09:00:00'),
	(null, '012388', 25.3, 51, '2023-06-06 08:00:00'),
	(null, '012388', 25.4, 52, '2023-06-06 07:00:00'),
	(null, '012388', 25.5, 50, '2023-06-06 06:00:00'),
	(null, '012388', 25.6, 52, '2023-06-06 05:00:00'),
	(null, '012388', 25.1, 51, '2023-06-06 04:00:00'),
	(null, '012388', 25.2, 48, '2023-06-06 03:00:00'),
	(null, '012388', 25.5, 49, '2023-06-06 02:00:00'),
	(null, '012388', 25.3, 46, '2023-06-06 01:00:00'),
	(null, '012388', 26, 50, '2023-06-06 00:00:00'),
	(null, '012388', 25.8, 55, '2023-06-05 23:00:00'),
	(null, '012388', 25.7, 60, '2023-06-05 22:00:00');
    
INSERT INTO sensor VALUES
	('012311', 2, 1, 'Em manutenção'),
    ('012312', 2, 1, 'Ativo'),
	('012313', 2, 1, 'Ativo'),
	('012314', 2, 1, 'Ativo'),
	('012315', 2, 1, 'Ativo'),
	('012316', 2, 1, 'Ativo'),
	('012317', 2, 1, 'Ativo'),
	('012318', 2, 1, 'Ativo'),
	('012319', 2, 1, 'Ativo'),
	('012300', 2, 1, 'Ativo'),
	('012321', 2, 1, 'Ativo'),
	('012322', 2, 1, 'Inativo');
    
INSERT INTO dados VALUES
	(null, '012313', 5.2, 45, '2023-05-30'),
	(null, '012315', 3.6, 50, '2023-05-31'),
	(null, '012333', 4.8, 65, '2023-06-01'),
	(null, '012318', 5.2, 70, '2023-06-02'),
	(null, '012318', 4.8, 75, '2023-06-03'),
	(null, '012315', 5.6, 75, '2023-06-04'),
	(null, '012321', 6.7, 60, '2023-06-05');
    
INSERT INTO dados VALUES
	(null, '012319', 5.2, 50, '2023-06-06 09:00:00'),
	(null, '012319', 5.3, 51, '2023-06-06 08:00:00'),
	(null, '012319', 5.4, 52, '2023-06-06 07:00:00'),
	(null, '012319', 5.5, 50, '2023-06-06 06:00:00'),
	(null, '012319', 5.6, 52, '2023-06-06 05:00:00'),
	(null, '012319', 5.1, 51, '2023-06-06 04:00:00'),
	(null, '012319', 5.2, 48, '2023-06-06 03:00:00'),
	(null, '012319', 5.5, 49, '2023-06-06 02:00:00'),
	(null, '012319', 5.3, 46, '2023-06-06 01:00:00'),
	(null, '012319', 6, 50, '2023-06-06 00:00:00'),
	(null, '012319', 5.8, 55, '2023-06-05 23:00:00'),
	(null, '012319', 5.7, 60, '2023-06-05 22:00:00');
    
INSERT INTO sensor VALUES
	('012323', 3, 1, 'Em manutenção'),
    ('012324', 3, 1, 'Ativo'),
	('012325', 3, 1, 'Ativo'),
	('012326', 3, 1, 'Ativo'),
	('012327', 3, 1, 'Ativo'),
	('012328', 3, 1, 'Ativo'),
	('012329', 3, 1, 'Ativo'),
	('012330', 3, 1, 'Ativo'),
	('012331', 3, 1, 'Ativo'),
	('012332', 3, 1, 'Ativo'),
	('012333', 3, 1, 'Ativo'),
	('012335', 3, 1, 'Ativo'),
	('012336', 3, 1, 'Ativo'),
	('012337', 3, 1, 'Ativo'),
	('012334', 3, 1, 'Em manutenção');
    
INSERT INTO dados VALUES
	(null, '012324', 24, 60, '2023-05-30'),
	(null, '012323', 23.8, 55, '2023-05-31'),
	(null, '012326', 22.9, 70, '2023-06-01'),
	(null, '012330', 23.5, 63, '2023-06-02'),
	(null, '012333', 21.2, 70, '2023-06-03'),
	(null, '012329', 15, 68, '2023-06-04'),
	(null, '012337', 26.5, 65, '2023-06-05');
    
INSERT INTO dados VALUES
	(null, '012329', 25.2, 50, '2023-06-06 09:00:00'),
	(null, '012329', 25.3, 51, '2023-06-06 08:00:00'),
	(null, '012329', 25.4, 52, '2023-06-06 07:00:00'),
	(null, '012329', 25.5, 50, '2023-06-06 06:00:00'),
	(null, '012329', 25.6, 52, '2023-06-06 05:00:00'),
	(null, '012329', 25.1, 51, '2023-06-06 04:00:00'),
	(null, '012329', 25.2, 48, '2023-06-06 03:00:00'),
	(null, '012329', 25.5, 49, '2023-06-06 02:00:00'),
	(null, '012329', 25.3, 46, '2023-06-06 01:00:00'),
	(null, '012329', 26, 50, '2023-06-06 00:00:00'),
	(null, '012329', 25.8, 55, '2023-06-05 23:00:00'),
	(null, '012329', 25.7, 60, '2023-06-05 22:00:00');

INSERT INTO sensor VALUES
	('012338', 4, 1, 'Em manutenção'),
    ('012339', 4, 1, 'Ativo'),
	('012340', 4, 1, 'Ativo'),
	('012341', 4, 1, 'Ativo'),
	('012342', 4, 1, 'Ativo'),
	('012343', 4, 1, 'Ativo'),
	('012344', 4, 1, 'Ativo'),
	('012345', 4, 1, 'Ativo'),
	('012346', 4, 1, 'Ativo'),
	('012347', 4, 1, 'Ativo'),
	('012348', 4, 1, 'Ativo'),
	('012349', 4, 1, 'Ativo'),
	('012350', 4, 1, 'Ativo'),
	('012351', 4, 1, 'Ativo'),
	('012353', 4, 1, 'Ativo'),
	('012354', 4, 1, 'Ativo'),
	('012355', 4, 1, 'Ativo'),
	('012356', 4, 1, 'Ativo'),
	('012357', 4, 1, 'Ativo'),
	('012358', 4, 1, 'Ativo'),
	('012359', 4, 1, 'Ativo'),
	('012352', 4, 1, 'Inativo');
    
INSERT INTO dados VALUES
	(null, '012347', 14, 62, '2023-05-30'),
	(null, '012356', 16.5, 65, '2023-05-31'),
	(null, '012346', 20.5, 60, '2023-06-01'),
	(null, '012350', 20.1, 62, '2023-06-02'),
	(null, '012351', 26.5, 63, '2023-06-03'),
	(null, '012343', 20, 60, '2023-06-04'),
	(null, '012359', 26, 68, '2023-06-05');
    
INSERT INTO dados VALUES
	(null, '012359', 25.2, 50, '2023-06-06 09:00:00'),
	(null, '012359', 25.3, 51, '2023-06-06 08:00:00'),
	(null, '012359', 25.4, 52, '2023-06-06 07:00:00'),
	(null, '012359', 25.5, 50, '2023-06-06 06:00:00'),
	(null, '012359', 25.6, 52, '2023-06-06 05:00:00'),
	(null, '012359', 25.1, 51, '2023-06-06 04:00:00'),
	(null, '012359', 25.2, 48, '2023-06-06 03:00:00'),
	(null, '012359', 25.5, 49, '2023-06-06 02:00:00'),
	(null, '012359', 25.3, 46, '2023-06-06 01:00:00'),
	(null, '012359', 26, 50, '2023-06-06 00:00:00'),
	(null, '012359', 25.8, 55, '2023-06-05 23:00:00'),
	(null, '012359', 25.7, 60, '2023-06-05 22:00:00');
    
INSERT INTO sensor VALUES
	('012360', 5, 1, 'Ativo'),
    ('012361', 5, 1, 'Ativo'),
	('012362', 5, 1, 'Ativo'),
	('012363', 5, 1, 'Ativo'),
	('012364', 5, 1, 'Ativo'),
	('012365', 5, 1, 'Ativo'),
	('012366', 5, 1, 'Ativo'),
	('012367', 5, 1, 'Ativo'),
	('012368', 5, 1, 'Ativo'),
	('012369', 5, 1, 'Ativo'),
	('012370', 5, 1, 'Ativo'),
	('012371', 5, 1, 'Ativo'),
	('012372', 5, 1, 'Ativo'),
	('012373', 5, 1, 'Ativo'),
	('012374', 5, 1, 'Ativo'),
	('012375', 5, 1, 'Ativo'),
	('012376', 5, 1, 'Ativo'),
	('012377', 5, 1, 'Ativo'),
	('012378', 5, 1, 'Ativo'),
	('012379', 5, 1, 'Ativo'),
	('012380', 5, 1, 'Ativo'), 
	('012381', 5, 1, 'Ativo');
    
INSERT INTO dados VALUES
	(null, '012368', 14, 62, '2023-05-30'),
	(null, '012374', 16.5, 65, '2023-05-31'),
	(null, '012371', 20.5, 60, '2023-06-01'),
	(null, '012373', 20.1, 62, '2023-06-02'),
	(null, '012373', 26.5, 63, '2023-06-03'),
	(null, '012377', 20, 60, '2023-06-04'),
	(null, '012381', 26, 68, '2023-06-05');
    
INSERT INTO dados VALUES
	(null, '012381', 25.2, 50, '2023-06-06 09:00:00'),
	(null, '012381', 25.3, 51, '2023-06-06 08:00:00'),
	(null, '012381', 25.4, 52, '2023-06-06 07:00:00'),
	(null, '012381', 25.5, 50, '2023-06-06 06:00:00'),
	(null, '012381', 25.6, 52, '2023-06-06 05:00:00'),
	(null, '012381', 25.1, 51, '2023-06-06 04:00:00'),
	(null, '012381', 25.2, 48, '2023-06-06 03:00:00'),
	(null, '012381', 25.5, 49, '2023-06-06 02:00:00'),
	(null, '012381', 25.3, 46, '2023-06-06 01:00:00'),
	(null, '012381', 26, 50, '2023-06-06 00:00:00'),
	(null, '012359', 25.8, 55, '2023-06-05 23:00:00'),
	(null, '012359', 25.7, 60, '2023-06-05 22:00:00');
