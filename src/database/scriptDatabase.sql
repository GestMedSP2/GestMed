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

INSERT INTO endereco VALUES
	(null, '01234-567', 'Rua da Consolação', 123, 'Consolação', 'São Paulo', 'SP', 'Apt 101'),
    (null, '04567-890', 'Avenida Faria Lima', 2000, 'Itaim Bibi', 'São Paulo', 'SP', 'Sala 301');

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

INSERT INTO empresa VALUES
	 (null, 'Empresa A', '11.111.111/0001-01', 11999990000, 'empresaA@example.com', 1),
     (null, 'Empresa B', '22.222.222/0001-02', 21999990000, 'empresaB@example.com', 2);

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

INSERT INTO funcionario VALUES	
	('12345789', 1, 'Gest', 'Med', 'ADM', 'gestmed.official@outlook.com', 'acessoGM');

CREATE TABLE setor(
idSetor INT auto_increment primary key,
fkEmpresaSetor INT,
nomeSetor VARCHAR(45),
armazenaTermolabeis BOOLEAN,
CONSTRAINT fkEmpS FOREIGN KEY (fkEmpresaSetor)
REFERENCES empresa (idEmpresa)
);

INSERT INTO setor VALUES
	(null, 1, 'Produção de Paracetamol', true),
	(null, 1, 'Controle de Qualidade de Aspirina', false),
	(null, 2, 'Pesquisa e Desenvolvimento de Insulina', false),
	(null, 2, 'Comercialização de Amoxicilina', false);

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

INSERT INTO sensor VALUES 
	('012344', 1, 1, 'Ativo'),
	('012358', 1, 1, 'Inativo'),
	('012348', 2, 2, 'Em manutenção'),
	('012357', 2, 2, 'Ativo');

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

INSERT INTO dados VALUES
	(NULL, '012344', (0.29 * 25.30) - 1.54, (0.88 * 70) - 3.92, '2023-04-15 10:15:00'), -- Simulando temperatura de medicamento termolabel com a equação (0,29 * x - 1,54) e umidade (0,88 * x - 3,92)
    (NULL, '012358', 20.20, (0.88 * 80) - 3.92, '2023-04-15 10:20:00'),
    (NULL, '012348', 27.40, (0.88 * 65) - 3.92, '2023-04-15 10:25:00'),
    (NULL, '012357', 22.10, (0.88 * 75) - 3.92, '2023-04-15 10:30:00');
    
INSERT INTO dados VALUES
	(NULL, '012357', 21.10, (0.88 * 75) - 3.82, '2023-04-15 10:30:50');
   
SELECT * FROM dados;
SELECT * FROM setor;
SELECT * FROM funcionario;