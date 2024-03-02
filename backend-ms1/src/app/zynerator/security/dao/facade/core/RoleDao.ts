import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {Role} from "src/app/zynerator/security/bean/core/Role";
import {RoleCriteria} from "src/app/zynerator/security/dao/criteria/core/RoleCriteria";
import {RoleDto} from "src/app/zynerator/security/dto/RoleDto";


@Injectable()
export class RoleDao extends AbstractRepository<Role, RoleCriteria> {

    constructor(@InjectRepository(Role) private readonly repository: Repository<Role>,) {
        super(repository);
    }

    async save(item: Role): Promise<Role> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async findByAuthority(authority: string): Promise<Role> {
        return this.repository.findOne({where: {authority}});
    }

    async saveOrUpdate(item: Role): Promise<Role> {
        if (item.id) {
            const entity = await this.findById(item.id);
            if (!entity) {
                throw new Error('Entity not found');
            }
            Object.assign(entity, item);
            return this.repository.save(entity);
        } else {
            return this.repository.save(item);
        }
    }

    async  findAllOptimized(): Promise<RoleDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.authority AS authority'])
                    .getRawMany()
                    .then((result) => result.map((row) => new RoleDto(row.id, row.authority)));


    }

    async  findAll(): Promise<Role[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Role> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }



    public constructQuery(criteria: RoleCriteria): SelectQueryBuilder<Role> {
        const query = this.initQuery(this.repository);

        this.addConstraint(query, criteria.authority, 'authority = :authority', {authority: criteria.authority});
        return query;
    }

}
