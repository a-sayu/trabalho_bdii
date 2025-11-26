export interface Pessoa {
  UUID: string;
  Nome: string;
  Email: string;
  Vinculo_UNESP: string;
  RA: number;
  Github: string;
  Linkedin: string;
  Descricao: string;
}

export interface Evento {
    UUID: string;   
    Nome: string;   
    Data_local: Date;
    Duracao: number;      
    Autorizado?: boolean;
    Maximo: number;       
    Responsavel: string;
    Descricao?: string;
}