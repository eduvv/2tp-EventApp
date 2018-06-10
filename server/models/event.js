class Event {
    constructor(name, date, num, location, address, shortDesc, longDesc, registerURL, externalURL, logo) {
        this.name = name;
        this.date = date;
        this.num = num;
        this.location = location;
        this.address = address;
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
        this.registerURL = registerURL;
        this.externalURL = externalURL;
        this.logo = logo;
    }
}
module.exports = Event;