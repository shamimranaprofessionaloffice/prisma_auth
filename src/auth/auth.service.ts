import { PrismaService } from '@/prisma_/prisma_.service';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { HandleError } from '@/common/error/handle-error.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findOne(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isValidPass = await bcrypt.compare(pass, user.password);
    if (!isValidPass) {
      throw new BadRequestException('Invalid credential');
    }
    return user;
  }

  @HandleError('login error')
  async login(user: any) {
     const {password, ...payload} = user
   console.log(payload);
   
    return { 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: this.jwtService.sign(payload),
    };
  }

  @HandleError('register error')
  async register(dto: RegisterDto) {
    const { email, password, name } = dto;

    // Check if user exists

    const exist = await this.prisma.client.user.findUnique({
      where: { email },
    });

    if (exist) {
      throw new BadRequestException('User already exists');
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.client.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accounts: {
          create: {
            provider: 'local',
          },
        },
      },
      include: {
        accounts: true,
      },
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
