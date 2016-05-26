(function () {

    var ContactApp = function () {

        var self = this;

        this.contacts = [];

        document.getElementById('addContactOk').addEventListener('click', function () {

            var firstName = document.getElementById('addContactFirstName');
            var lastName = document.getElementById('addContactLastName');
            var phoneNumber = document.getElementById('addContactPhoneNumber');
            var address = document.getElementById('addContactAddress');
            var city = document.getElementById('addContactCity');
            var state = document.getElementById('addContactState');
            var zip = document.getElementById('addContactZip');
            // document.getElementById('addContactAlert').
            // if(document.getElementById('addContactAlert').classList('hidden')){
            // document.getElementById('addContactAlert').classList.remove('hidden');
            // }

            // listItem.setAttribute('class', 'list-group-item')

            if (firstName.value || lastName.value) {

                var contact = new Contact(
                    firstName.value,
                    lastName.value,
                    phoneNumber.value,
                    address.value,
                    city.value,
                    state.value,
                    zip.value
                );

                self.addContact(contact);

                firstName.value = '';
                lastName.value = '';
                phoneNumber.value = '';
                address.value = '';
                city.value = '';
                state.value = '';
                zip.value = '';
                console.log(contact)
                $('#addContactModal').modal('hide');
            }
            else {
                self.showAlert('A first name or last name is required.');
            }

        });

        document.getElementById('addContactCancel').addEventListener('click', function () {

            document.getElementById('addContactFirstName').value = '';
            document.getElementById('addContactLastName').value = '';
            document.getElementById('addContactPhoneNumber').value = '';
            document.getElementById('addContactAddress').value = '';
            document.getElementById('addContactCity').value = '';
            document.getElementById('addContactState').value = '';
            document.getElementById('addContactZip').value = '';

            self.clearAlert();

            $('#addContactModal').modal('hide');
        });
    };

    ContactApp.prototype.showAlert = function (message) {

        var alert = document.getElementById('addContactAlert');

        alert.classList.remove('hidden');
        alert.innerText = message;
    }

    ContactApp.prototype.clearAlert = function () {

        var alert = document.getElementById('addContactAlert');

        alert.classList.add('hidden');
        alert.innerText = '';
    }

    ContactApp.prototype.addContact = function (contact) {

        var self = this;
        this.contacts.push(contact);

        var htmlList = document.getElementById('contactList');
        var html = document.getElementById('contactTemplate').cloneNode(true);

        html.setAttribute('id', 'contact-' + contact.id);
        html.classList.remove('template');

        html.getElementsByClassName('contactFullName')[0].innerText = contact.fullName();
        html.getElementsByClassName('contactFirstName')[0].innerText = contact.firstName;
        html.getElementsByClassName('contactLastName')[0].innerText = contact.lastName;
        html.getElementsByClassName('contactPhoneNumber')[0].innerText = contact.phoneNumber;
        html.getElementsByClassName('contactAddress')[0].innerText = contact.address;
        html.getElementsByClassName('contactCity')[0].innerText = contact.city;
        html.getElementsByClassName('contactState')[0].innerText = contact.state;
        html.getElementsByClassName('contactZip')[0].innerText = contact.zip;

        var deleteBtn = html.getElementsByClassName('fa-times')[0].parentNode

        deleteBtn.setAttribute('id', contact.id);

        deleteBtn.addEventListener('click', function (event) {
            var contactID = parseInt(event.target.parentNode.id);
            var index = self.contacts.findIndex(function (item) {
                return item.id === contactID;
            })
            self.removeContact(index)
        })
        htmlList.appendChild(html);
    };

    ContactApp.prototype.removeContact = function (index) {
        if (index > -1) {
            var contact = this.contacts[index]
            var list = document.getElementById('conactList');
            var html = document.getElementById('contact-' + contact.id);
            list.removeChild(html);
            this.contacts.splice(index, 1);
        }
    };

    var Contact = function (firstName, lastName, phoneNumber, address, city, state, zip) {
        this.id = new Date().getTime();
        this.firstName = firstName || "Scottie";
        this.lastName = lastName || "Giblet";
        this.phoneNumber = phoneNumber || "208-208-2088";
        this.address = address || "Somewhere Fun";
        this.city = city || "Nampa";
        this.state = state || "ID";
        this.zip = zip || 83686;
    };

    Contact.prototype.fullName = function () {
        return this.firstName + ' ' + this.lastName;
    };

    var app = new ContactApp();

})();