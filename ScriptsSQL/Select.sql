delimiter $$
create procedure selectEventos()
begin
	select * from eventos where MONTH(NOW()) = MONTH(eventos.Data_local);
end $$
delimiter ;