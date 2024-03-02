import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";



export class ProduitCriteria extends  BaseCriteria  {

    public reference: string;
    public referenceLike: string;
    public libelle: string;
    public libelleLike: string;
    public barcode: string;
    public barcodeLike: string;
    public prixAchatMoyen: string;
    public prixAchatMoyenMin: string;
    public prixAchatMoyenMax: string;
    public quantite: string;
    public quantiteMin: string;
    public quantiteMax: string;
    public seuilAlert: string;
    public seuilAlertMin: string;
    public seuilAlertMax: string;


    public constructor(){
        super();
    }
}
