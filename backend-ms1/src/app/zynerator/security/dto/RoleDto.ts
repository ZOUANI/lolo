
export class RoleDto {
    public id: number;
    public authority: string;


    constructor(id?: number, authority?: string) {
        this.id = id;
        this.authority = authority;
    }



}
