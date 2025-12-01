import { HandleError } from '@/common/error/handle-error.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { loginDTO, RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user (Local Signup)' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  register(@Body() dto: RegisterDto) { 
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user (Local Signin)' })
  login(@Body() dto: loginDTO) {
    return this.authService.login(dto);
  }
}
