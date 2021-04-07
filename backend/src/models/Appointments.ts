import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
@Entity('appointments')
class Appointment{
  @PrimaryColumn()
  readonly id:string;

  @Column()
  provider:string;

  @Column('timestamp with time zone')
  date:Date

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}

export { Appointment };
