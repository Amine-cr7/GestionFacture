export class Client{
    constructor(nom:string,prenom:string){
        this.nom = nom;
        this.prenom = prenom;
    }
    clientId!: number;
    nom:string;
    prenom:string;
}