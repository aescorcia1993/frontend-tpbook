export interface postI{
  idpublications?:number
  author:number
  date:string
  hour:string
  content:string
  likes:string
  comments:commentI[]
}

export interface commentI{
  id?: 2,
  content:string
  stamp: string
  autor: string
  fk_autor: number
  fk_post : number
}


