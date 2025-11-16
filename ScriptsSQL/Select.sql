delimiter $$
create procedure selectEventosMes()
begin
	select * from eventos where MONTH(NOW()) = MONTH(eventos.Data_local) and eventos.Autorizado = true order by Data_local desc;
end $$

create procedure selectEventosDia()
begin
	select * from eventos where day(NOW()) = day(eventos.Data_local) and eventos.Autorizado = true order by Data_local desc;
end $$

create procedure selectEventosAprovar()
begin
	select Nome from eventos where eventos.Autorizado = false order by Data_local desc;
end $$

create procedure selectCertificados(in Nome_pessoa varchar(50))
begin
	declare UUID_pessoa varchar(36);
    select UUID into UUID_pessoa from pessoas where pessoas.Nome = Nome_pessoa;
	select * from certificados where certificados.UUID_pessoa = UUID_pessoa;
end $$

create procedure selectProvasMes()
begin
	select * from provas where MONTH(NOW()) = MONTH(provas.Data_local) and provas.Autorizado = true order by Data_local desc;
end $$

create procedure selectProvasDia()
begin
	select * from provas where day(NOW()) = day(provas.Data_local) and provas.Autorizado = true order by Data_local desc;
end $$

create procedure selectProvasAprovar()
begin
	select Nome from provas where provas.Autorizado = false order by Data_local desc;
end $$

create procedure selectLogs()
begin
	select * from logger order by Data_local desc;
end $$

delimiter ;