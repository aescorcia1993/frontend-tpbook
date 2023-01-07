export interface IUser{
  id?: number
  name: string,
  password: string,
  correo: string,
  celular: string,
  direccion:string,
  sesion: string
}

export class User implements IUser{
  id?: number
  name: string
  password: string
  correo: string
  celular: string
  direccion:string
  sesion: string

  constructor(user:IUser) {
    this.id = user?.id;
    this.name = user.name;
    this.password = user.password;
    this.correo = user.correo;
    this.celular = user.celular;
    this.direccion = user.direccion;
    this.sesion = user.sesion
  }
  
}
