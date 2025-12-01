import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findMe(@Req() req:any) {
    return req.user; 
  }

}
