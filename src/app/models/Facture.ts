export class Facture{
    constructor(clientId:number,total:number,date:string){
        this.clientId = clientId;
        this.total = total;
        this.date = date;
    }
    numFacture!:number;
    clientId:number;
    total:number;
    date:string;
}