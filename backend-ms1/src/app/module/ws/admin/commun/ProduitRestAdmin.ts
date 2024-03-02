import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {ProduitConverter} from "src/app/shared/converter/commun/ProduitConverter";
import {ProduitDto} from "src/app/shared/dto/commun/ProduitDto";
import {ProduitCriteria} from "src/app/shared/dao/criteria/core/commun/ProduitCriteria";
import {ProduitAdminServiceImpl} from "src/app/module/service/admin/commun/ProduitAdminServiceImpl";


@ApiTags('Manages produit services')
@Controller('api/admin/produit')
export class ProduitRestAdmin {

    constructor(private readonly service: ProduitAdminServiceImpl,
                private readonly converter: ProduitConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all produits'})
    @Get()
    async findAll(): Promise<ProduitDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a produit by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ProduitDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a produit by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified produit'})
    @Post()
    async save(@Body() dto: ProduitDto): Promise<ProduitDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified produit'})
    @Put()
    async update(@Body() dto: ProduitDto): Promise<ProduitDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all produits'})
    @Get('optimized')
    async findAllOptimized(): Promise<ProduitDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all produits'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ProduitCriteria): Promise<ProduitDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all produits'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ProduitCriteria): Promise<PaginatedList<ProduitDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<ProduitDto>(dtos, paginated.dataSize);
    }



    @Post('multiple')
    async deleteMultiple(@Body() dtos: ProduitDto[]): Promise<ProduitDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
