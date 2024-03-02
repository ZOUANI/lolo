
export class ProduitDto {
    public id: number;
    public reference: string;
    public libelle: string;
    public barcode: string;
    public discription: string;
    public prixAchatMoyen: number;
    public quantite: number;
    public seuilAlert: number;


    constructor(id?: number, reference?: string) {
        this.id = id;
        this.reference = reference;
    }



}
