CREATE TABLE pessoa (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	ativo BOOLEAN NOT NULL,
	logradouro VARCHAR(50),
	numero VARCHAR(10),
	complemento VARCHAR(50),
	bairro VARCHAR(30),
	cep VARCHAR(9),
	cidade VARCHAR(30),
	estado VARCHAR(20)   
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO pessoa (nome,ativo,logradouro,numero,complemento,bairro,cep,cidade,estado)
	 values ('Daverson Dantas Saldanha','1','rua Jose Augusto Mengue','324',null,'Pq dos Ypes','13160-000','Artur Nogueira','SP');
INSERT INTO pessoa (nome,ativo,logradouro,numero,complemento,bairro,cep,cidade,estado)
	 values ('Lidiane Ap Saldanha','1','rua Jose Augusto Mengue','324',null,'Pq dos Ypes','13160-000','Artur Nogueira','SP');
INSERT INTO pessoa (nome,ativo,logradouro,numero,complemento,bairro,cep,cidade,estado)
	 values ('Ebenezer Piscinas','1','rua Nicolau de Sá','348','Fabrica','Itamaraty','13160-000','Artur Nogueira','SP');
INSERT INTO pessoa (nome,ativo,logradouro,numero,complemento,bairro,cep,cidade,estado)
	 values ('João das Couves','0','rua das Orquideas','40',null,'Amoreiras','18160-354','Maceio','AL');
INSERT INTO pessoa (nome,ativo,logradouro,numero,complemento,bairro,cep,cidade,estado)
	 values ('Beatriz Oliveira','0','Av Gen Ozorio','1459','Praça das Flores','Centro','44789-565','Fortaleza','CE');