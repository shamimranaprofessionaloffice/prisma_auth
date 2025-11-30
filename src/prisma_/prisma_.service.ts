import 'dotenv/config';
import { Injectable, OnModuleInit, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService implements OnModuleInit {
  private readonly prisma: PrismaClient;

  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: this.configService.get<string>('DATABASE_URL'),
    });
    this.prisma = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  get client() {
    return this.prisma;
  }
}
