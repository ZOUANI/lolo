import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";
import {ModelPermissionConverter} from "src/app/zynerator/security/converter/ModelPermissionConverter";
import {ModelPermissionServiceImpl} from "src/app/zynerator/security/service/ModelPermissionServiceImpl";
import {ModelPermissionDto} from "src/app/zynerator/security/dto/ModelPermissionDto";
import {ModelPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ModelPermissionCriteria";



@ApiTags('Manages model permission services')
@Controller('api/modelPermission/')
export class ModelPermissionRest {

    constructor(private readonly service: ModelPermissionServiceImpl,
                private readonly converter: ModelPermissionConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all modelPermissions'})
    @Get()
    async findAll(): Promise<ModelPermissionDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a model permission by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ModelPermissionDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a model permission by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified model permission'})
    @Post()
    async save(@Body() dto: ModelPermissionDto): Promise<ModelPermissionDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified model permission'})
    @Put()
    async update(@Body() dto: ModelPermissionDto): Promise<ModelPermissionDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all modelPermissions'})
    @Get('optimized')
    async findAllOptimized(): Promise<ModelPermissionDto[]> {
        const result = await this.service.findAllOptimized();
        return this.converter.toDtos(result);
    }

    @ApiOperation({summary: 'Finds an optimized list of all modelPermissions'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ModelPermissionCriteria): Promise<ModelPermissionDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all modelPermissions'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ModelPermissionCriteria): Promise<PaginatedList<ModelPermissionDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<ModelPermissionDto>(dtos, paginated.dataSize);
    }



    @Post('multiple')
    async deleteMultiple(@Body() dtos: ModelPermissionDto[]): Promise<ModelPermissionDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
