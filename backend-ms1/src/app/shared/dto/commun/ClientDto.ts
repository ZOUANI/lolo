
export class ClientDto {
    public id: number;
    public cin: string;
    public nom: string;
    public tel: string;
    public email: string;
    public adresse: string;
    public description: string;
    public creance: number;


    constructor(id?: number, nom?: string) {
        this.id = id;
        this.nom = nom;
    }



}
