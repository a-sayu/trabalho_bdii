delimiter $$
create trigger logInsertCertificado after insert on certificados
FOR EACH ROW
begin
    declare nome_pessoa varchar(50);
    declare nome_evento varchar(50);
    select Nome into nome_pessoa from pessoas where pessoas.UUID = new.UUID_pessoa;
    select Nome into nome_evento from eventos where eventos.UUID = new.UUID_evento;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID:',new.UUID,
    '\nValores:',
    '\nPessoa: ',nome_pessoa,
    '\nEvento: ',nome_evento),
    NOW(),
    null,
    'Inserção de certificado');
end$$

create trigger logInsertChapa after insert on chapas
FOR EACH ROW
begin
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID:',new.UUID,
    '\nNome: ',new.Nome),
    NOW(),
    null,
    'Inserção de chapa');
end$$

create trigger logInsertCursando after insert on cursando
FOR EACH ROW
begin
	declare nome_disciplina varchar(50);
    declare nome_aluno varchar(50);
    select Nome into nome_disciplina from disciplinas where disciplinas.UUID = new.UUID_disciplina;
    select Nome into nome_aluno from discentes where discentes.RA = new.RA;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('RA:',new.RA,
    '\nNome: ', nome_aluno,
    '\nDisciplina: ',nome_disciplina),
    NOW(),
    null,
    'Inserção de cursando');
end$$

create trigger logInsertDiscente after insert on discentes
FOR EACH ROW
begin
	declare nome_aluno varchar(50);
    select Nome into nome_aluno from pessoas where pessoas.UUID = new.UUID_pessoa;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('RA: ',new.RA,
    '\nNome: ',nome_aluno),
    NOW(),
    null,
    'Inserção de discente');
end$$

create trigger logInsertDisciplina after insert on disciplinas
FOR EACH ROW
begin
	declare nome_professor varchar(50);
    select Nome into nome_professor from pessoas where pessoas.UUID = new.UUID_professor;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID:',new.UUID,
    '\nDisciplina: ',new.Nome,
    '\nDocente: ',nome_professor),
    NOW(),
    null,
    'Inserção de disciplina');
end$$

create trigger logInsertEvento after insert on eventos 
FOR EACH ROW
begin
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID:',new.UUID,
    '\nEvento: ',new.Nome,
    '\nData local: ',new.Data_local,
    '\nMaximo: ',ifnull(new.Maximo,'Null')),
    NOW(),
    null,
    'Inserção de evento');
end$$

create trigger logInsertInscrito after insert on inscritos
FOR EACH ROW
begin
	declare nome_inscrito varchar(50);
    declare nome_evento varchar(50);
    select Nome into nome_inscrito from pessoas where pessoas.UUID = new.UUID_pessoa;
    select Nome into nome_evento from eventos where eventos.UUID = new.UUID_evento;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('Nome: ',nome_inscrito,
    '\nEvento: ',nome_evento),
    NOW(),
    null,
    'Inserção de evento');
end$$

create trigger logInsertMembro after insert on membros
FOR EACH ROW
begin
	declare nome_membro varchar(50);
    declare nome_chapa varchar(50);
    declare UUID_membro varchar(50);
    select UUID_pessoa into UUID_membro from discentes where discentes.RA = new.RA;
    select Nome into nome_membro from pessoas where UUID = UUID_membro;
    select Nome into nome_chapa from chapas where chapas.UUID = new.UUID_chapa;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('RA: ',new.RA,
    '\nNome: ',nome_membro,
    '\nCargo: ',new.Cargo,
    '\nChapa: ',nome_chapa),
    NOW(),
    null,
    'Inserção de membro');
end$$

create trigger logInsertPauta after insert on pautas
FOR EACH ROW
begin
	declare nome_solicitante varchar(50);
    select ifnull(Nome,"Anônimo") into nome_solicitante from pessoas where pessoas.UUID = new.UUID_pessoa;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID: ',new.UUID,
    '\nTitulo: ',new.Nome,
    '\nDescricao: ',new.Descricao,
    '\nSolicitante: ',nome_solicitante),
    NOW(),
    null,
    'Inserção de pauta');
end$$

create trigger logInsertPessoa after insert on pessoas
FOR EACH ROW
begin
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID: ',new.UUID,
    '\nNome: ',new.Nome,
    '\nEmail: ',new.Email,
    '\nVinculo UNESP: ',new.Vinculo_UNESP),
    NOW(),
    null,
    'Inserção de pessoa');
end$$

create trigger logInsertProva after insert on provas
FOR EACH ROW
begin
	declare nome_disciplina varchar(50);
    select Nome into nome_disciplina from disciplinas where disciplinas.UUID = new.UUID_disciplina;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID: ',new.UUID,
    '\nDisciplina: ',nome_disciplina,
    '\nData: ',new.Data_local,
    '\nLugar: ',ifnull(new.Lugar,'Indefinido'),
    '\nTipo: ',ifnull(new.Tipo,'Indefinido'),
    '\nConteudo: ',ifnull(new.Conteudo,'Indefinido')),
    NOW(),
    null,
    'Inserção de prova');
end$$

create trigger logInsertSugestao after insert on sugestoes
FOR EACH ROW
begin
	declare nome_solicitante varchar(50);
    select ifnull(Nome,"Anônimo") into nome_solicitante from pessoas where pessoas.UUID = new.UUID_pessoa;
	-- UUID, desc, dia, UUID_pessoa, origem
	insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem)
    values(
    UUID(),
    concat('UUID: ',new.UUID,
    '\nTitulo: ',new.Nome,
    '\nDescricao: ',new.Descricao,
    '\nSolicitante: ',nome_solicitante),
    NOW(),
    null,
    'Inserção de sugestao');
end$$

create trigger logInsertVoto after insert on votos
FOR EACH ROW
begin
	declare nome_pessoa varchar(50);
    declare nome_pauta varchar(50);
    select Nome into nome_pessoa from pessoas where pessoas.UUID = new.UUID_pessoa;
    select Nome into nome_pauta from pautas where pautas.UUID = new.UUID_pauta;
	-- UUID, desc, dia, UUID_pessoa, origem
    if new.UUID_pessoa = null then
		insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem) values(UUID(),concat('Nome pauta: ',nome_pauta,'\nNome: indefinido'),NOW(),null,'Inserção de voto');
    else
		insert into Logger(UUID, Descricao, Data_local, UUID_pessoa, Origem) values(UUID(),concat('Nome pauta: ',nome_pauta,'\nNome: ',nome_pessoa),NOW(),null,'Inserção de voto');
    end if;
end$$

delimiter ;