import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {AchatConverter} from "src/app/shared/converter/stock/AchatConverter";
import {AchatDto} from "src/app/shared/dto/stock/AchatDto";
import {AchatCriteria} from "src/app/shared/dao/criteria/core/stock/AchatCriteria";
import {AchatAdminServiceImpl} from "src/app/module/service/admin/stock/AchatAdminServiceImpl";


@ApiTags('Manages achat services')
@Controller('api/admin/achat')
export class AchatRestAdmin {

    constructor(private readonly service: AchatAdminServiceImpl,
                private readonly converter: AchatConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all achats'})
    @Get()
    async findAll(): Promise<AchatDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a achat by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<AchatDto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a achat by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified achat'})
    @Post()
    async save(@Body() dto: AchatDto): Promise<AchatDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified achat'})
    @Put()
    async update(@Body() dto: AchatDto): Promise<AchatDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all achats'})
    @Get('optimized')
    async findAllOptimized(): Promise<AchatDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all achats'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: AchatCriteria): Promise<AchatDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all achats'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: AchatCriteria): Promise<PaginatedList<AchatDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<AchatDto>(dtos, paginated.dataSize);
    }


    @Get('client/id/:id')
    async findByClientId(@Param('id') id: number): Promise<AchatDto[]> {
        const items = await this.service.findByClientId(id);
        return this.converter.toDtos(items);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: AchatDto[]): Promise<AchatDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}
