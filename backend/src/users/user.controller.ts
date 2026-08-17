import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    @UseGuards(AuthGuard)
    @Get('user')
    async getUser(@Req() req: any) {
        const user = await this.userService.findById(req.user.uuid);
        if (!user || !user.isActive) {
            throw new UnauthorizedException();
        }
        return user;
    }

}