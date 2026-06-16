import { statusEnum } from "./statuasEnum"

export interface Itask{
         taskId:number
         name:string
         status:statusEnum
         scheduling: string,
         price:number,
         description?:string
         

         
}