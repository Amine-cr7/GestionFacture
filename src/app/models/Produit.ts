export class Produit{
    constructor(nom:string,prix:number){
        this.nom = nom;
        this.prix = prix;
    }
    numProduit!:number;
    nom:string;
    prix:number;
}