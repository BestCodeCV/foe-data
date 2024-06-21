class DataGuild{
    constructor(id, guilds){
        this.id = id;
        this.guilds = guilds
    }
    getName(){
        console.log("HOla mundo nuevo")
    }
}
class Guild{
    constructor(id, name, rank, level, membersNum, description, members, date){
        this.id = id;
        this.name = name
        this.rank = rank
        this.level = level 
        this.membersNum = membersNum
        this.description = description
        this.members = members
        this.date = date
    }
    getName(){
        console.log("HOla mundo nuevo")
    }
}
class Member{
    constructor(id, name, points, battles, age, city_name, clan_id, profile_text, forge_db, rank, active, date, clan){
        this.id = id
        this.name = name
        this.points = points
        this.battles = battles 
        this.age = age
        this.city_name = city_name
        this.clan_id = clan_id
        this.profile_text = profile_text
        this.forge_db = forge_db
        this.rank = rank
        this.active = active
        this.date = date
        this.clan = clan
    }
}
class Good{
    constructor(name, quantity, show, status, es_name, en_name, url, age){
        this.name = name
        this.quantity = quantity
        this.show = show
        this.status = status
        this.es_name = es_name
        this.en_name = en_name
        this.url = url
        this.age = age
    }
}
class Sector{
    constructor(name, buildings){
        this.name = name
        this.buildings = buildings
    }
}
class Building{
    constructor(name, goods){
        this.name = name;
        this.goods = goods;
    }
}
class GoodDetail {
    constructor(es_name, en_name, url, age){
        this.es_name = es_name
        this.en_name = en_name
        this.url = url
        this.age = age
    }
}
export {DataGuild, Guild, Member, Good, Sector, Building, GoodDetail}