(function (){
    var Contact = function (firstName, lastName, phoneNumber, address, city, state, zip) {
        this.id = new Date().getTime();
        this.firstName = firstName || "Scott";
        this.lastName = lastName || "Gillatt";
        this.phoneNumber = phoneNumber || "208-888-8888";
        this.address = address || "Some cool Place Ave";
        this.city = city || "Nampa";
        this.state = state || "Idaho";
        this.zip = zip || 83686;
    };

    Contact.prototype.fullName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    
    module.exports = Contact;
})();