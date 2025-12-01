import { PrismaService } from '@/prisma_/prisma_.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {}
  // const exists = await this.prisma.

  //   if (exists) {
  //     throw new ConflictException('Email already exists');
  //   }

  //   const hashed = await bcrypt.hash(dto.password, 10);

  //   return await this.prisma.user.create({
  //     data: {
  //       name: dto.name,
  //       email: dto.email,
  //       password: hashed,
  //     },
  //   });
  // }

  // async findOne(username: string): Promise<User | undefined> {
  //   // return this.users.find((user) => user.username === username);

  async findOne(email: string) {
    const user = await this.prisma.client.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
