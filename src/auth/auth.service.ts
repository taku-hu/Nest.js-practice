import { UserRepository } from '@/auth/user.repository'
import { CreateUserDto } from '@/auth/dto/create-user.dto'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CredentialsDto } from '@/auth/dto/credentials.dto'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async signUp(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto)
  }

  async signIn(credentialsDto: CredentialsDto) {
    const { username, password } = credentialsDto
    const user = await this.userRepository.findOne({ username })
    const isSuccessAuthentication = user && (await compare(password, user.password))

    if (!isSuccessAuthentication) {
      throw new UnauthorizedException('ユーザー名またはパスワードを確認してください')
    }

    const payload = { id: user.id, username: user.username }
    const accessToken = await this.jwtService.sign(payload)

    return { accessToken }
  }
}
