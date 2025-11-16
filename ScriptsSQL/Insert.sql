delimiter $$
create procedure insertDiscente(in UUID_discente varchar(36), in Nome varchar(50), in Email varchar(50), in RA varchar(36))
begin
	insert into pessoas values(UUID_discente, Nome, Email, 'Discente');
    insert into discentes values(RA,UUID_discente);
end $$

create procedure insertDocente(in UUID_docente varchar(36), in Nome varchar(50), in Email varchar(50))
begin
	insert into pessoas values(UUID_docente, Nome, Email, 'Docente');
end $$

create procedure insertPessoa(in UUID_pessoa varchar(36), in Nome varchar(50), in Email varchar(50), in Vinculo varchar(50))
begin
	insert into pessoas values(UUID_pessoa, Nome, Email, Vinculo);
end $$

create procedure insertCertificadoDiscente(in UUID_certificado varchar(36), in RA int unsigned, in Nome_evento varchar(50))
begin
	declare UUID_pessoa varchar(36);
    declare UUID_evento varchar(36);
    select UUID into UUID_pessoa from discentes where discentes.RA = RA;
    select UUID into UUID_evento from eventos where eventos.Nome = Nome_evento;
	insert into certificados values(UUID_certificado, UUID_pessoa, UUID_evento);
end $$

create procedure insertCertificadoPessoa(in UUID_certificado varchar(36), in Nome_pessoa varchar(50), in Nome_evento varchar(50))
begin
	declare UUID_pessoa varchar(36);
    declare UUID_evento varchar(36);
    select UUID into UUID_pessoa from pessoas where pessoas.Nome = Nome_pessoa;
    select UUID into UUID_evento from eventos where eventos.Nome = Nome_evento;
	insert into certificados values(UUID_certificado, UUID_pessoa, UUID_evento);
end $$

create procedure insertChapa(in UUID_chapa varchar(36), in Nome varchar(50))
begin
	insert into Chapas values(UUID_chapa, Nome);
end $$

create procedure insertCursando(in Nome_discente varchar(50), in Nome_disciplina varchar(50))
begin
	declare RA int unsigned;
    declare UUID_pessoa varchar(36);
    declare UUID_disciplina varchar(36);
    select UUID into UUID_pessoa from pessoas where pessoas.Nome = Nome_discente;
    select RA into RA from discentes where discentes.UUID = UUID_pessoa;
    select UUID into UUID_disciplina from disciplinas where disciplinas.Nome = Nome_disciplina;
	insert into Cursando values(RA, UUID_disciplina);
end $$

create procedure insertDisciplina(in UUID_disciplina varchar(36), in Nome_disciplina varchar(50), in Nome_professor varchar(50))
begin
    declare UUID_professor varchar(36);
    select UUID into UUID_professor from pessoas where pessoas.Nome = Nome_professor and pessoas.Vinculo_UNESP = 'Docente';
    insert into Disciplinas values(UUID_disciplina, Nome_disciplina, UUID_professor);
end $$

create procedure insertEvento(in UUID_evento varchar(36), in Nome_evento varchar(50), in Data_local datetime, in Maximo int unsigned)
begin
    insert into Eventos values(UUID_evento, Nome_evento, Data_local, false, Maximo);
end $$

create procedure insertInscritoNome(in Nome_pessoa varchar(50), in Nome_evento varchar(50))
begin
    declare UUID_pessoa varchar(36);
    declare UUID_evento varchar(36);
    select UUID into UUID_pessoa from pessoas where pessoas.Nome = Nome_pessoa;
    select UUID into UUID_evento from eventos where eventos.Nome = Nome_evento;
    insert into Inscritos values(UUID_pessoa, UUID_evento);
end $$

create procedure insertInscritoRA(in RA int unsigned, in Nome_evento varchar(50))
begin
    declare UUID_pessoa varchar(36);
    declare UUID_evento varchar(36);
    select UUID into UUID_pessoa from discentes where discentes.RA = RA;
    select UUID into UUID_evento from eventos where eventos.Nome = Nome_evento;
	insert into Inscritos values(UUID_pessoa, UUID_evento);
end $$

create procedure insertMembroNome(in Nome_discente varchar(50), in Cargo varchar(50), in Nome_chapa varchar(50))
begin
    declare RA int unsigned;
    declare UUID_chapa varchar(36);
    select RA into RA from discentes where discentes.Nome = Nome_discente;
    select UUID into UUID_chapa from chapas where chapas.Nome = Nome_chapa;
	insert into Membros values(RA, Cargo, UUID_chapa);
end $$

create procedure insertMembroRA(in RA int unsigned, in Cargo varchar(50), in Nome_chapa varchar(50))
begin
    declare UUID_chapa varchar(36);
    select UUID into UUID_chapa from chapas where chapas.Nome = Nome_chapa;
	insert into Membros values(RA, Cargo, UUID_chapa);
end $$

create procedure insertPauta(in UUID_pauta varchar(36), in Nome varchar(50), in Descricao varchar(500), in Nome_pessoa varchar(50))
begin
    declare UUID_pessoa varchar(36);
    select UUID into UUID_pessoa from pessoas where pessoas.Nome = Nome_pessoa;
    if Nome_pessoa = null then
		insert into Pautas values(UUID_pauta, Nome, Descricao, null);
	else
		insert into Pautas values(UUID_pauta, Nome, Descricao, UUID_pessoa);
    end if;
end $$

create procedure insertProva(in UUID_prova varchar(36), in Nome_disciplina varchar(50), in Data_local datetime, in Lugar varchar(50), in Tipo varchar(10), in Conteudo varchar(500))
begin
    declare UUID_disciplina varchar(36);
    select UUID into UUID_disciplina from disciplinas where disciplinas.Nome = Nome_disciplina;
	insert into Provas values(UUID_prova, UUID_disciplina, Data_local, Lugar, Tipo, Conteudo, false);
end $$

create procedure insertSugestao(in UUID_sugestao varchar(36), in Nome varchar(50), in Descricao varchar(500), in Nome_pessoa varchar(50))
begin
    declare UUID_pessoa varchar(36);
    select UUID into UUID_pessoa from pessoas where pessoas.Nome = Nome_pessoa;
    if Nome_pessoa = null then
		insert into Sugestoes values(UUID_sugestao, Nome, Descricao, null);
	else
		insert into Sugestoes values(UUID_sugestao, Nome, Descricao, UUID_pessoa);
    end if;
end $$

create procedure insertVoto(in UUID_sugestao varchar(36), in Nome varchar(50), in Descricao varchar(500), in Nome_pessoa varchar(50))
begin
    declare UUID_pessoa varchar(36);
    select UUID into UUID_pessoa from pessoas where pessoas.Nome = Nome_pessoa;
    if Nome_pessoa = null then
		insert into Sugestoes values(UUID_sugestao, Nome, Descricao, null);
	else
		insert into Sugestoes values(UUID_sugestao, Nome, Descricao, UUID_pessoa);
    end if;
end $$

delimiter ;