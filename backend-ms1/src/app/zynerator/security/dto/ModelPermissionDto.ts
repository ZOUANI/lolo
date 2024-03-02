
export class ModelPermissionDto {
    public id: number;
    public reference: string;
    public libelle: string;
    public globalValue: boolean = true;


    constructor(id?: number, reference?: string) {
        this.id = id;
        this.reference = reference;
    }



}
