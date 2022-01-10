import { AuthService } from '@/auth/auth.service'
import { CreateUserDto } from '@/auth/dto/create-user.dto'
import { CredentialsDto } from '@/auth/dto/credentials.dto'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto)
  }

  @Post('signin')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    return await this.authService.signIn(credentialsDto)
  }
}
