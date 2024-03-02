import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";
import {ActionPermissionServiceImpl} from "src/app/zynerator/security/service/ActionPermissionServiceImpl";
import {ActionPermissionConverter} from "src/app/zynerator/security/converter/ActionPermissionConverter";
import {ActionPermissionDto} from "src/app/zynerator/security/dto/ActionPermissionDto";
import {ActionPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ActionPermissionCriteria";


@ApiTags('Manages action permission services')
@Controller('api/actionPermission/')
export class ActionPermissionRest {

    constructor(private readonly service: ActionPermissionServiceImpl,
                private readonly converter: ActionPermissionConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all actionPermissions'})
    @Get()
    async findAll(): Promise<ActionPermissionDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a action permission by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ActionPermissionDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a action permission by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified action permission'})
    @Post()
    async save(@Body() dto: ActionPermissionDto): Promise<ActionPermissionDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified action permission'})
    @Put()
    async update(@Body() dto: ActionPermissionDto): Promise<ActionPermissionDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all actionPermissions'})
    @Get('optimized')
    async findAllOptimized(): Promise<ActionPermissionDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all actionPermissions'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ActionPermissionCriteria): Promise<ActionPermissionDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all actionPermissions'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ActionPermissionCriteria): Promise<PaginatedList<ActionPermissionDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<ActionPermissionDto>(dtos, paginated.dataSize);
    }



    @Post('multiple')
    async deleteMultiple(@Body() dtos: ActionPermissionDto[]): Promise<ActionPermissionDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
