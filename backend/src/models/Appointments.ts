import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

import {User} from './User'

@Entity('appointments')
class Appointment{
  @PrimaryColumn()
  readonly id:string;

  @Column()
  provider_id:string;

  @ManyToOne(()=> User)
  @JoinColumn({name:'provider_id'})
  provider:User

  @Column('timestamp with time zone')
  date:Date

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}

export { Appointment };
