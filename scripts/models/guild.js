export class Guild {
    constructor(info, members) {
        this.description = info.description || '';
        this.membersNum = info.membersNum || 0;
        this.name = info.name || '';
        this.rank = info.rank || '';
        this.level = info.level || 0;
        this.id = info.id || '';
        this.members = members || [];
    }
    getName(){
        console.log("Hola perro")
    }
}