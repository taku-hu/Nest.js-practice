import { UserRepository } from '@/auth/user.repository'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExeption: false,
      secretOrKey: 'secretKey123'
    })
  }

  async validate(payload: { id: string; username: string }) {
    const { id, username } = payload
    const user = await this.userRepository.findOne({ id, username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
