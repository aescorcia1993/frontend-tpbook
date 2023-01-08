export interface IPost{
  id?:number
  author:number
  stamp: string
  content:string
  likes:string
  comments:IComment[]
}

export interface IComment{
  id?: number,
  content:string
  stamp: string
  autor: string
  fk_autor: number
  fk_post : number
}


