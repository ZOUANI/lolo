import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {AchatItemConverter} from "src/app/shared/converter/stock/AchatItemConverter";
import {AchatItemDto} from "src/app/shared/dto/stock/AchatItemDto";
import {AchatItemCriteria} from "src/app/shared/dao/criteria/core/stock/AchatItemCriteria";
import {AchatItemAdminServiceImpl} from "src/app/module/service/admin/stock/AchatItemAdminServiceImpl";


@ApiTags('Manages achat item services')
@Controller('api/admin/achatItem')
export class AchatItemRestAdmin {

    constructor(private readonly service: AchatItemAdminServiceImpl,
                private readonly converter: AchatItemConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all achatItems'})
    @Get()
    async findAll(): Promise<AchatItemDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a achat item by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<AchatItemDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a achat item by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified achat item'})
    @Post()
    async save(@Body() dto: AchatItemDto): Promise<AchatItemDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified achat item'})
    @Put()
    async update(@Body() dto: AchatItemDto): Promise<AchatItemDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all achatItems'})
    @Get('optimized')
    async findAllOptimized(): Promise<AchatItemDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all achatItems'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: AchatItemCriteria): Promise<AchatItemDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all achatItems'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: AchatItemCriteria): Promise<PaginatedList<AchatItemDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<AchatItemDto>(dtos, paginated.dataSize);
    }


    @Get('produit/id/:id')
    async findByProduitId(@Param('id') id: number): Promise<AchatItemDto[]> {
        const items = await this.service.findByProduitId(id);
        return this.converter.toDtos(items);
    }
    @Get('achat/id/:id')
    async findByAchatId(@Param('id') id: number): Promise<AchatItemDto[]> {
        const items = await this.service.findByAchatId(id);
        return this.converter.toDtos(items);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: AchatItemDto[]): Promise<AchatItemDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
