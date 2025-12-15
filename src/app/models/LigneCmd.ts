export class LigneCmd{
    constructor(numFacture:number,produitId:number,qte:number){
        
        this.numFacture = numFacture;
        this.produitId = produitId;
        this.qte = qte;
    }
    idLigne!:number;
    numFacture:number;
    produitId:number;
    qte:number;
}