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

-- Inserts antigos
INSERT INTO dados VALUES
	(NULL, '012344', (0.29 * 25.30) - 1.54, (0.88 * 70) - 3.92, '2023-05-29 10:15:00'), -- Simulando temperatura de medicamento termolabel com a equação (0,29 * x - 1,54) e umidade (0,88 * x - 3,92)
    (NULL, '012358', 20.20, (0.88 * 80) - 3.92, '2023-05-29 10:20:00'),
    (NULL, '012348', 27.40, (0.88 * 65) - 3.92, '2023-05-29 10:25:00'),
    (NULL, '012357', 22.10, (0.88 * 75) - 3.92, '2023-05-29 10:30:00');
    
INSERT INTO dados VALUES
	(NULL, '012357', 21.10, (0.88 * 75) - 3.82, '2023-05-29 10:30:50');
    
INSERT INTO dados VALUES
	(NULL, '012357', 31, (0.88 * 75) - 3.82, '2023-05-29 10:45:50');
    
	INSERT INTO sensor VALUES 
	('012344', 1, 1, 'Ativo'),
	('012358', 1, 1, 'Inativo'),
	('012348', 2, 2, 'Em manutenção'),
	('012357', 2, 2, 'Ativo');

INSERT INTO setor VALUES
	(null, 1, 'Produção de Paracetamol', true),
	(null, 1, 'Controle de Qualidade de Aspirina', false),
	(null, 2, 'Pesquisa e Desenvolvimento de Insulina', false),
	(null, 2, 'Comercialização de Amoxicilina', false);

INSERT INTO endereco VALUES
	(null, '01234-567', 'Rua da Consolação', 123, 'Consolação', 'São Paulo', 'SP', 'Apt 101'),
    (null, '04567-890', 'Avenida Faria Lima', 2000, 'Itaim Bibi', 'São Paulo', 'SP', 'Sala 301');

INSERT INTO empresa VALUES
	 (null, 'Empresa A', '11.111.111/0001-01', 11999990000, 'empresaA@example.com', 1),
     (null, 'Empresa B', '22.222.222/0001-02', 21999990000, 'empresaB@example.com', 2);

INSERT INTO funcionario VALUES	
	('12345789', 1, 'Gest', 'Med', 'ADM', 'gestmed.official@outlook.com', 'acessoGM');