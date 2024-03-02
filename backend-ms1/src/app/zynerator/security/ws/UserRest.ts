import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";
import {UserConverter} from "src/app/zynerator/security/converter/UserConverter";
import {UserServiceImpl} from "src/app/zynerator/security/service/UserServiceImpl";
import {UserDto} from "src/app/zynerator/security/dto/UserDto";
import {UserCriteria} from "src/app/zynerator/security/dao/criteria/core/UserCriteria";


@ApiTags('Manages user services')
@Controller('api/user/')
export class UserRest {

    constructor(private readonly service: UserServiceImpl,
                private readonly converter: UserConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all users'})
    @Get()
    async findAll(): Promise<UserDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a user by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<UserDto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Finds a user by username'})
    @Get('Username/:username')
    async findByUsername(@Param('username') username: string): Promise<UserDto> {
        const item = await this.service.findByUsername(username);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a user by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified user'})
    @Post("")
    async save(@Body() dto: UserDto): Promise<UserDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }




    @ApiOperation({summary: 'Updates the specified user'})
    @Put()
    async update(@Body() dto: UserDto): Promise<UserDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all users'})
    @Get('optimized')
    async findAllOptimized(): Promise<UserDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all users'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: UserCriteria): Promise<UserDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all users'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: UserCriteria): Promise<PaginatedList<UserDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<UserDto>(dtos, paginated.dataSize);
    }



    @Post('multiple')
    async deleteMultiple(@Body() dtos: UserDto[]): Promise<UserDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
