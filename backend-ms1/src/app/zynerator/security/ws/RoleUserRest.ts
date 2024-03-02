import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";
import {RoleUserServiceImpl} from "src/app/zynerator/security/service/RoleUserServiceImpl";
import {RoleUserConverter} from "src/app/zynerator/security/converter/RoleUserConverter";
import {RoleUserDto} from "src/app/zynerator/security/dto/RoleUserDto";
import {RoleUserCriteria} from "src/app/zynerator/security/dao/criteria/core/RoleUserCriteria";


@ApiTags('Manages role user services')
@Controller('api/roleUser/')
export class RoleUserRest {

    constructor(private readonly service: RoleUserServiceImpl,
                private readonly converter: RoleUserConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all roleUsers'})
    @Get()
    async findAll(): Promise<RoleUserDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a role user by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<RoleUserDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a role user by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified role user'})
    @Post()
    async save(@Body() dto: RoleUserDto): Promise<RoleUserDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified role user'})
    @Put()
    async update(@Body() dto: RoleUserDto): Promise<RoleUserDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all roleUsers'})
    @Get('optimized')
    async findAllOptimized(): Promise<RoleUserDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all roleUsers'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: RoleUserCriteria): Promise<RoleUserDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all roleUsers'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: RoleUserCriteria): Promise<PaginatedList<RoleUserDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<RoleUserDto>(dtos, paginated.dataSize);
    }


    @Get('user/id/:id')
    async findByUserId(@Param('id') id: number): Promise<RoleUserDto[]> {
        const items = await this.service.findByUserId(id);
        return this.converter.toDtos(items);
    }
    @Get('role/id/:id')
    async findByRoleId(@Param('id') id: number): Promise<RoleUserDto[]> {
        const items = await this.service.findByRoleId(id);
        return this.converter.toDtos(items);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: RoleUserDto[]): Promise<RoleUserDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
