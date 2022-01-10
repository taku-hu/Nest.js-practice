import { CreateUserDto } from '@/auth/dto/create-user.dto'
import { User } from '@/entities/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { genSalt, hash } from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { username, password, status } = createUserDto
    const salt = await genSalt()
    const hashPassword = await hash(password, salt)

    const user = this.create({
      username,
      password: hashPassword,
      status
    })

    await this.save(user)

    return user
  }
}
