import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";


@EntityRepository(User)
class UserRepository extends Repository<User>{
  
  public async findByEmail(email:String) : Promise<User | null>{
    const findUser = await this.findOne({
      where:{email}
    })
    return findUser || null
  }
}
export {UserRepository}