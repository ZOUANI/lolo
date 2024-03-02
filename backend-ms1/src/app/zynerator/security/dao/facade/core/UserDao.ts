import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {User} from "src/app/zynerator/security/bean/core/User";
import {UserCriteria} from "src/app/zynerator/security/dao/criteria/core/UserCriteria";
import {UserDto} from "src/app/zynerator/security/dto/UserDto";


@Injectable()
export class UserDao extends AbstractRepository<User, UserCriteria> {

    constructor(@InjectRepository(User) private readonly repository: Repository<User>,) {
        super(repository);
    }

    async save(item: User): Promise<User> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: User): Promise<User> {
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

    async  findAllOptimized(): Promise<UserDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.username AS username'])
                    .getRawMany()
                    .then((result) => result.map((row) => new UserDto(row.id, row.username)));


    }

    async  findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<User> {
        return this.repository.findOne({where: {id}});
    }
    async findByUsername(username: string): Promise<User> {
        return this.repository.findOne({where: {username}});
    }



    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }



    public constructQuery(criteria: UserCriteria): SelectQueryBuilder<User> {
        const query = this.initQuery(this.repository);

        this.addConstraint(query, criteria.credentialsNonExpired, 'credentialsNonExpired = :credentialsNonExpired', {credentialsNonExpired: criteria.credentialsNonExpired});
        this.addConstraint(query, criteria.enabled, 'enabled = :enabled', {enabled: criteria.enabled});
        this.addConstraint(query, criteria.email, 'email = :email', {email: criteria.email});
        this.addConstraint(query, criteria.accountNonExpired, 'accountNonExpired = :accountNonExpired', {accountNonExpired: criteria.accountNonExpired});
        this.addConstraint(query, criteria.accountNonLocked, 'accountNonLocked = :accountNonLocked', {accountNonLocked: criteria.accountNonLocked});
        this.addConstraint(query, criteria.username, 'username = :username', {username: criteria.username});
        this.addConstraint(query, criteria.password, 'password = :password', {password: criteria.password});
        this.addConstraint(query, criteria.passwordChanged, 'passwordChanged = :passwordChanged', {passwordChanged: criteria.passwordChanged});
        this.addConstraint(query, criteria.lastName, 'lastName = :lastName', {lastName: criteria.lastName});
        this.addConstraint(query, criteria.firstName, 'firstName = :firstName', {firstName: criteria.firstName});
        this.addConstraint(query, criteria.phone, 'phone = :phone', {phone: criteria.phone});
        return query;
    }

}
