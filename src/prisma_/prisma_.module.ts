import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma_.service';

@Global()
@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
