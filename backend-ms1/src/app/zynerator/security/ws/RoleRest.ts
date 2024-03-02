import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";
import {RoleServiceImpl} from "src/app/zynerator/security/service/RoleServiceImpl";
import {RoleConverter} from "src/app/zynerator/security/converter/RoleConverter";
import {RoleDto} from "src/app/zynerator/security/dto/RoleDto";
import {RoleCriteria} from "src/app/zynerator/security/dao/criteria/core/RoleCriteria";



@ApiTags('Manages role services')
@Controller('api/role/')
export class RoleRest {

    constructor(private readonly service: RoleServiceImpl,
                private readonly converter: RoleConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all roles'})
    @Get()
    async findAll(): Promise<RoleDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a role by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<RoleDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a role by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified role'})
    @Post()
    async save(@Body() dto: RoleDto): Promise<RoleDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified role'})
    @Put()
    async update(@Body() dto: RoleDto): Promise<RoleDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all roles'})
    @Get('optimized')
    async findAllOptimized(): Promise<RoleDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all roles'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: RoleCriteria): Promise<RoleDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all roles'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: RoleCriteria): Promise<PaginatedList<RoleDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<RoleDto>(dtos, paginated.dataSize);
    }



    @Post('multiple')
    async deleteMultiple(@Body() dtos: RoleDto[]): Promise<RoleDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
