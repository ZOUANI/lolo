import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";

import {AchatCriteria} from "src/app/shared/dao/criteria/core/stock/AchatCriteria";
import {ProduitCriteria} from "src/app/shared/dao/criteria/core/commun/ProduitCriteria";


export class AchatItemCriteria extends  BaseCriteria  {

    public prixUnitaire: string;
    public prixUnitaireMin: string;
    public prixUnitaireMax: string;
    public prixVente: string;
    public prixVenteMin: string;
    public prixVenteMax: string;
    public quantite: string;
    public quantiteMin: string;
    public quantiteMax: string;
    public quantiteAvoir: string;
    public quantiteAvoirMin: string;
    public quantiteAvoirMax: string;
    public remise: string;
    public remiseMin: string;
    public remiseMax: string;

    public produit: ProduitCriteria;
    public produits: Array<ProduitCriteria>;
    public achat: AchatCriteria;
    public achats: Array<AchatCriteria>;

    public constructor(){
        super();
    }
}
