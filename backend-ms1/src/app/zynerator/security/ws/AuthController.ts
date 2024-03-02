import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';


import {UserRequest} from "src/app/zynerator/security/dto/UserRequest";
import {UserServiceImpl} from "src/app/zynerator/security/service/UserServiceImpl";


@ApiTags('')
@Controller('')
export class AuthController {

    constructor(private readonly service: UserServiceImpl) {
    }


    @Post("/login")
    async login(@Body() userRequest: UserRequest): Promise<string> {
        return this.service.login(userRequest);
    }
}