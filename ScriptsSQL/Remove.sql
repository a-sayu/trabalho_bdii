delimiter $$

/* Remove Discente: Remove da tabela específica e da tabela genérica Pessoas */
create procedure removeDiscente(in RA_input int unsigned)
begin
    declare UUID_target varchar(36);
    
    -- Descobre o UUID da pessoa baseado no RA antes de deletar
    select UUID_pessoa into UUID_target from discentes where discentes.RA = RA_input;
    
    -- Remove o vínculo de discente
    delete from discentes where RA = RA_input;
    
    -- Remove o registro da pessoa física (opcional, dependendo da sua regra de negócio)
    delete from pessoas where UUID = UUID_target;
end $$

/* Remove Docente: Remove a pessoa baseada no UUID */
create procedure removeDocente(in UUID_docente varchar(36))
begin
    -- Docente é apenas uma pessoa com vínculo, deletamos a pessoa
    delete from pessoas where UUID = UUID_docente and Vinculo_UNESP = 'Docente';
end $$

drop procedure if exists removePessoa;
create procedure removePessoa(in UUID_pessoa varchar(36))
begin
    delete from pessoas where UUID = UUID_pessoa;
end $$

/* Remove Certificado: Remove pelo ID do certificado */
create procedure removeCertificado(in UUID_certificado_input varchar(36))
begin
    delete from certificados where UUID = UUID_certificado_input;
end $$

/* Remove Chapa: Remove pelo ID da chapa */
create procedure removeChapa(in UUID_chapa_input varchar(36))
begin
    delete from Chapas where UUID = UUID_chapa_input;
end $$

/* Remove Cursando: Busca IDs pelos nomes e remove a relação */
create procedure removeCursando(in Nome_discente varchar(50), in Nome_disciplina varchar(50))
begin
    declare RA_discente int unsigned;
    declare UUID_pessoa_var varchar(36);
    declare UUID_disciplina_var varchar(36);
    
    -- Recupera IDs
    select UUID into UUID_pessoa_var from pessoas where pessoas.Nome = Nome_discente;
    select RA into RA_discente from discentes where discentes.UUID_pessoa = UUID_pessoa_var;
    select UUID into UUID_disciplina_var from disciplinas where disciplinas.Nome = Nome_disciplina;
    
    -- Remove relação
    delete from Cursando where RA_discente = RA_discente and UUID_disciplina = UUID_disciplina_var;
end $$

/* Remove Disciplina: Remove pelo ID */
create procedure removeDisciplina(in UUID_disciplina_input varchar(36))
begin
    delete from Disciplinas where UUID = UUID_disciplina_input;
end $$

/* Remove Evento: Remove pelo ID */
create procedure removeEvento(in UUID_evento_input varchar(36))
begin
    delete from Eventos where UUID = UUID_evento_input;
end $$

/* Remove Inscrito por Nome: Busca IDs e remove */
create procedure removeInscritoNome(in Nome_pessoa varchar(50), in Nome_evento varchar(50))
begin
    declare UUID_pessoa_var varchar(36);
    declare UUID_evento_var varchar(36);
    
    select UUID into UUID_pessoa_var from pessoas where pessoas.Nome = Nome_pessoa;
    select UUID into UUID_evento_var from eventos where eventos.Nome = Nome_evento;
    
    delete from Inscritos where UUID_pessoa = UUID_pessoa_var and UUID_evento = UUID_evento_var;
end $$

/* Remove Inscrito por RA: Busca IDs e remove */
create procedure removeInscritoRA(in RA_input int unsigned, in Nome_evento varchar(50))
begin
    declare UUID_pessoa_var varchar(36);
    declare UUID_evento_var varchar(36);
    
    select UUID_pessoa into UUID_pessoa_var from discentes where discentes.RA = RA_input;
    select UUID into UUID_evento_var from eventos where eventos.Nome = Nome_evento;
    
    delete from Inscritos where UUID_pessoa = UUID_pessoa_var and UUID_evento = UUID_evento_var;
end $$

/* Remove Membro por RA */
create procedure removeMembroRA(in RA_input int unsigned, in Nome_chapa varchar(50))
begin
    declare UUID_chapa_var varchar(36);
    
    select UUID into UUID_chapa_var from chapas where chapas.Nome = Nome_chapa;
    
    delete from Membros where RA = RA_input and UUID_chapa = UUID_chapa_var;
end $$

/* Remove Membro por Nome: Busca RA e chama o procedure anterior */
create procedure removeMembroNome(in Nome_discente varchar(50), in Nome_chapa varchar(50))
begin
    declare RA_discente int unsigned;
    declare UUID_discente_var varchar(36);
    
    select UUID into UUID_discente_var from pessoas where Nome = Nome_discente;
    select RA into RA_discente from discentes where UUID_pessoa = UUID_discente_var;
    
    call removeMembroRA(RA_discente, Nome_chapa);
end $$

/* Remove Pauta: Remove pelo ID */
delimiter $$

create procedure removePauta(in UUID_pauta_input varchar(36))
begin
    delete from Pautas where UUID = UUID_pauta_input;
end $$

/* Remove Prova: Remove pelo ID */
create procedure removeProva(in UUID_prova_input varchar(36))
begin
    delete from Provas where UUID = UUID_prova_input;
end $$

/* Remove Sugestao: Remove pelo ID */
create procedure removeSugestao(in UUID_sugestao_input varchar(36))
begin
    delete from Sugestoes where UUID = UUID_sugestao_input;
end $$

/* Remove Voto: Busca IDs e remove */
create procedure removeVoto(in Nome_pauta varchar(50), in Nome_pessoa varchar(50))
begin
    declare UUID_pessoa_var varchar(36);
    declare UUID_pauta_var varchar(36);
    
    select UUID into UUID_pessoa_var from pessoas where pessoas.Nome = Nome_pessoa;
    -- Nota: Assumindo que o nome da pauta está no campo Titulo ou similar, ajuste conforme sua tabela real
    select UUID into UUID_pauta_var from Pautas where Pautas.Titulo = Nome_pauta; 
    
    delete from Votos where UUID_pessoa = UUID_pessoa_var and UUID_pauta = UUID_pauta_var;
end $$

delimiter ;;