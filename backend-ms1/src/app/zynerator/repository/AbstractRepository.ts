import {LessThanOrEqual, Like, MoreThanOrEqual, Repository, SelectQueryBuilder} from "typeorm";
import {BaseCriteria} from "../criteria/BaseCriteria";
import {PaginatedList} from "../util/PaginatedList";
type SearchCriteria = {
    [key: string]: any;
};
export abstract class AbstractRepository<T, C extends BaseCriteria> {

    private repo: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repo = repository;
    }

    public abstract constructQuery(crieria: C): SelectQueryBuilder<T>;

    public addConstraint(query: SelectQueryBuilder<T>, attribute: any, constraint: string, queryParams: any) {
        if (attribute) {
            query.andWhere("item." + constraint, queryParams);
        }
    }

    public addConstraintMinMax(query: SelectQueryBuilder<T>, attributeMin: any, attributeMax: any, constraintMin: string, constraintMax: string, queryParams: any) {
        this.addConstraint(query, attributeMin, constraintMin, queryParams);
        this.addConstraint(query, attributeMax, constraintMax, queryParams);
    }

    public getPaginatedResult(criteria: C, query: SelectQueryBuilder<T>) {
        const {page, maxResults} = criteria;
        const skip = (page) * maxResults;
        query.skip(skip).take(maxResults);
        return query.getMany();
    }

    public getResult(query: SelectQueryBuilder<T>) {
        return query.getMany();
    }

    public initQuery(repository: Repository<T>) {
        return repository.createQueryBuilder("item");
    }

    // public async findPaginatedByCriteria(criteria: C): Promise<PaginatedList<T>> {
    //     const { maxResults = 10, page = 0 } = criteria;
    //
    //     const offset = page * maxResults;
    //
    //     const [result, total] = await this.repo.findAndCount({
    //         ...criteria,
    //         take: maxResults,
    //         skip: offset,
    //     });
    //
    //     return new PaginatedList(result, total);
    // }
    buildConditions(criteria: SearchCriteria): any {
        const conditions: any = {};

        if (criteria) {
            Object.keys(criteria).forEach(key => {
                const value = criteria[key];

                if (value !== undefined && value !== null) {
                    if (key.endsWith('Like')) {
                        const columnName = key.replace('Like', '');
                        conditions[columnName] = Like(`%${value}%`);
                    } else if (typeof value === 'number') {
                        if (key.endsWith('Min')) {
                            const columnName = key.replace('Min', '');
                            conditions[columnName] = MoreThanOrEqual(value);
                        } else if (key.endsWith('Max')) {
                            const columnName = key.replace('Max', '');
                            conditions[columnName] = LessThanOrEqual(value);
                        } else {
                            conditions[key] = value;
                        }
                    }else {
                        conditions[key] = value;
                    }
                }
            });
        }

        return conditions;
    }



    async findPaginatedByCriteria(criteria?: SearchCriteria): Promise<PaginatedList<T>> {
        const { page = 0, maxResults = 10, ...searchCriteria } = criteria || {};

        const conditions = this.buildConditions(searchCriteria);

        const skip = page * maxResults;

        const [data, totalRecords] = await this.repo.findAndCount({
            where :conditions,
            skip: skip,
            take: maxResults
        });


        return new PaginatedList(data, totalRecords);
    }

    public async findByCriteria(criteria: C): Promise<T[]> {
        const query = this.constructQuery(criteria);
        return this.getResult(query);
    }

    public async count(): Promise<number> {
        return this.repo.count();
    }

}
