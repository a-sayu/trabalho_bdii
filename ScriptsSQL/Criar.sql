create database db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
use db;

create table Chapas(
	UUID varchar(36) primary key,
    Nome varchar(50) not null unique COLLATE utf8mb4_0900_ai_ci
);

create table Eventos(
	UUID varchar(36) primary key,
    Nome varchar(50) not null unique COLLATE utf8mb4_0900_ai_ci,
    Data_local datetime not null,
    Autorizado boolean not null,
    Maximo int unsigned,
    Responsavel varchar(36),
    Descricao varchar(500),
    constraint FK_UUID_responsavel_evento foreign key (Responsavel) references Pessoas(UUID)
);

create table Pessoas(
	UUID varchar(36) primary key,
    Nome varchar(50) not null unique COLLATE utf8mb4_0900_ai_ci,
    Email varchar(50) not null COLLATE utf8mb4_0900_ai_ci,
    Vinculo_UNESP varchar(50) not null COLLATE utf8mb4_0900_ai_ci
);

create table Inscritos(
	UUID_pessoa varchar(36) not null,
    UUID_evento varchar(36) not null,
    primary key(UUID_pessoa, UUID_evento),
    constraint FK_UUID_pessoa_inscritos foreign key (UUID_pessoa) references Pessoas(UUID),
    constraint FK_UUID_evento_inscritos foreign key (UUID_evento) references Eventos(UUID)
);

create table Discentes(
	RA int unsigned not null unique,
    UUID_pessoa varchar(36) not null,
    primary key(UUID_pessoa),
    constraint FK_UUID_pessoa_discentes foreign key (UUID_pessoa) references Pessoas(UUID) on delete cascade on update cascade
);

create table Disciplinas(
	UUID varchar(36) primary key,
    Nome varchar(50) not null unique COLLATE utf8mb4_0900_ai_ci,
    UUID_professor varchar(36) not null,
    constraint FK_UUID_professor_provas foreign key (UUID_professor) references Pessoas(UUID)
);

create table Certificados(
	UUID varchar(36) primary key,
    UUID_pessoa varchar(36) not null,
    UUID_evento varchar(36) not null,
    constraint FK_UUID_pessoa_certificados foreign key (UUID_pessoa) references Pessoas(UUID),
    constraint FK_UUID_evento_certificados foreign key (UUID_evento) references Eventos(UUID)
);

create table Provas(
	UUID varchar(36) primary key,
    UUID_disciplina varchar(36) not null,
    Data_local datetime not null,
    Lugar varchar(50) not null COLLATE utf8mb4_0900_ai_ci,
    Tipo varchar(50) not null,
    Conteudo varchar(500),
    Autorizado boolean not null,
    constraint FK_UUID_disciplina_provas foreign key (UUID_disciplina) references Disciplinas(UUID)
);

create table Cursando(
	RA int unsigned not null unique,
    UUID_disciplina varchar(36) not null,
	primary key(RA,UUID_disciplina),
    constraint FK_RA_cursando foreign key (RA) references Discentes(RA),
    constraint FK_UUID_disciplina_cursando foreign key (UUID_disciplina) references Disciplinas(UUID)
);

create table Membros(
	RA int unsigned not null unique,
    Cargo varchar(50) not null COLLATE utf8mb4_0900_ai_ci,
    UUID_chapa varchar(36) not null,
	primary key(RA),
    constraint FK_RA_emmebros foreign key (RA) references Discentes(RA),
    constraint FK_UUID_chapas_membros foreign key (UUID_chapa) references Chapas(UUID)
);

create table Pautas(
	UUID varchar(36) primary key,
    Nome varchar(50) not null unique COLLATE utf8mb4_0900_ai_ci,
    Descricao varchar(500) not null COLLATE utf8mb4_0900_ai_ci,
    UUID_pessoa varchar(36),
    constraint FK_UUID_pessoa_pautas foreign key (UUID_pessoa) references Pessoas(UUID)
);

create table Sugestoes(
	UUID varchar(36) primary key,
    Nome varchar(50) not null unique COLLATE utf8mb4_0900_ai_ci,
    Descricao varchar(500) not null COLLATE utf8mb4_0900_ai_ci,
    UUID_pessoa varchar(36),
    constraint FK_UUID_pessoa_sugestoes foreign key (UUID_pessoa) references Pessoas(UUID)
);

create table Votos(
	UUID_pessoa varchar(36),
    UUID_pauta varchar(36) not null,
    primary key(UUID_pessoa, UUID_pauta),
    constraint FK_UUID_pessoa_votos foreign key (UUID_pessoa) references Pessoas(UUID),
    constraint FK_UUID_pauta_votos foreign key (UUID_pauta) references Pautas(UUID)
);

create table Logger(
	UUID varchar(36) primary key,
    Descricao varchar(500) not null COLLATE utf8mb4_0900_ai_ci,
	Data_local datetime not null,
    Origem varchar(50) not null COLLATE utf8mb4_0900_ai_ci,
    UUID_pessoa varchar(36),
    constraint FK_UUID_pessoa_logger foreign key (UUID_pessoa) references Pessoas(UUID)
);
