import { HandleError } from '@/common/error/handle-error.decorator';
import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { loginDTO, RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login a user (Local Signin)' })
  login(@Req() req: any, @Body() dto: loginDTO) {
    if (!req.user) {
      return new HttpException('User not found', 404);
    }


   
    
    return this.authService.login(req.user);
  }
}
