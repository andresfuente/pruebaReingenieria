module OrangeFeSARQ.Services {
    'use strict';
    export class ClientJazztelSrv extends OrangeFeSARQ.Services.ParentService {
      static $inject = ['$injector'];
      public genericConstant;
  
      public clientData;
      public localStorageManager :  OrangeFeSARQ.Services.LocalStorageManager;
      public customerViewStore : OrangeFeSARQ.Services.CustomerViewStore;
      public agreementSrv : OFC.Services.AgreementSrv;
      public productInventorySrv : OrangeFeSARQ.Services.ProductInventoryService;
      ;
      ;
      public utils;

      constructor($injector) {
        super($injector);
        let vm = this;
        vm.setInjections($injector);
  
      }
      setInjections($injector) {
        let vm = this;
        vm.utils = $injector.get('utils');
        vm.localStorageManager =  $injector.get('localStorageManager');
        vm.customerViewStore =  $injector.get('customerViewStore');
        vm.agreementSrv = $injector.get('agreementSrv');
        vm.productInventorySrv = $injector.get('productInventorySrv');
      }

      clientInfo(data) {
        let vm = this;

        // Numero de lineas movil
        let contratosMovil = _.filter(data.customer.product, function (o: any) {
            return (o.ospProductType === 'Contrato Móvil' || o.ospProductType === 'Contrato Movil');
        });
        let lineasMoviles = contratosMovil.length;
        // Numero de lineas fijas 
        let contratoFijo = _.filter(data.customer.product, function (o: any) {
            return (o.ospProductType === 'Contrato Fijo');
        });
        let lineasFijas = contratoFijo.length;
        let lineasTotales = lineasMoviles + lineasFijas;


        // Se comprueba la respuesta del CustomerView para controlar si el cliente es empresa con mas de 5 lineas
        if (data.error === null) { //aqui
            if (data.customer !== undefined && data.customer !== null) {
                let clientData = JSON.parse(sessionStorage.getItem('clientData'));
                if (clientData && (clientData.clientType === 1 || data.customer.individual.id === clientData.docNumber)) {
                    clientData.jazztelData = {
                        type: 1
                    };
                    vm.saveJazztelUserData(clientData, data);
                    sessionStorage.setItem('clientData', JSON.stringify(clientData));
                } else if (clientData && data.customer.individual.id !== clientData.docNumber) {
                    clientData.jazztelData = {
                        type: 2
                    };
                    sessionStorage.setItem('clientData', JSON.stringify(clientData));
                } else {
                    if (data.customer.product !== null && data.customer.product.length > 0) {
                        vm.customerViewStore.info = data.customer;

                        // Aqui entro cuando busco un usuario y la respuesta es correcta
                        vm.clientData = {
                            clientType: '',
                            docNumber: '',
                            ospIDtype: '',
                            postalContact: {},
                            firstName: '',
                            surname: '',
                            secondSurname: '',
                            lastName: '',
                            tradingName: '',
                            formattedName: '',
                            birthDate: '',
                            birthDay: '',
                            birthMonth: '',
                            birthYear: '',
                            ospCustomerSegment: '',
                            clientMobileNumber: '',
                            clientFixedNumber: '',
                            clientEmail: '',
                            payerData: {},
                            authorizedData: {},
                            serviceAddress: {},
                            generalAddress: {}
                        };

                        if (data.customer.individual && data.customer.individual.id) { // RESIDENCIAL
                            /* vm.localStorageManager.setEntry('id', data.customer.individual.id); */
                            vm.clientData.docNumber = data.customer.individual.id;
                            vm.clientData.ospIDtype = data.customer.individual.ospIDtype;
                            vm.clientData.formattedName = data.customer.individual.formattedName;
                            vm.clientData.firstName = data.customer.individual.firstName;
                            vm.clientData.lastName = data.customer.individual.lastName;

                            // Rellenamos apellidos con los datos del customer view
                            if (vm.clientData.lastName) {
                                let surnames = vm.clientData.lastName.split(' ');
                                if (!vm.clientData.surname) {
                                    if (surnames[0]) {
                                        vm.clientData.surname = surnames[0];
                                    }
                                }
                                if (!vm.clientData.secondSurname) {
                                    if (surnames[1]) {
                                        vm.clientData.secondSurname = surnames[1];
                                    }
                                }
                            }
                            if (vm.customerViewStore.info.individual.birthDate) {
                                let birthDate = vm.customerViewStore.info.individual.birthDate.slice(0, 10);
                                vm.clientData.birthDay = birthDate.slice(8, 10);
                                vm.clientData.birthMonth = birthDate.slice(5, 7);
                                vm.clientData.birthYear = birthDate.slice(0, 4);
                                vm.clientData.birthDate = vm.getDate(birthDate);
                            } else {
                                vm.clientData.birthDay = '';
                                vm.clientData.birthMonth = '';
                                vm.clientData.birthYear = '';
                                vm.clientData.birthDate = '';

                            }
                            if ((data.customer.ospMobileCustomerSegment
                                && data.customer.ospMobileCustomerSegment.toUpperCase() === 'RESIDENCIAL')
                                || (data.customer.ospFixeCustomerSegment
                                    && data.customer.ospFixeCustomerSegment.toUpperCase() === 'RESIDENCIAL')) { // RESIDENCIAL
                                vm.clientData.ospCustomerSegment = 'residencial';
                            }
                        } else { // EMPRESA

                            if ((data.customer.ospMobileCustomerSegment
                                && data.customer.ospMobileCustomerSegment.toUpperCase() === 'EMPRESA')
                                || (data.customer.ospFixeCustomerSegment
                                    && data.customer.ospFixeCustomerSegment.toUpperCase() === 'EMPRESA')) { // EMPRESA
                                if (data.customer.ospMobileCustomerSubSegment
                                    && data.customer.ospMobileCustomerSubSegment.indexOf('AUTONOMO') >= 0
                                    || data.customer.ospFixedCustomerSubSegment
                                    && data.customer.ospFixedCustomerSubSegment.indexOf('AUTONOMO') >= 0) { // AUTÓNOMO
                                    vm.clientData.ospCustomerSegment = 'autonomo';
                                } else { // EMPRESA
                                    vm.clientData.ospCustomerSegment = 'empresa';
                                }
                            }
                            /* vm.localStorageManager.setEntry('id', data.customer.organization.id); */
                            vm.clientData.docNumber = data.customer.organization.id;
                            vm.clientData.ospIDtype = data.customer.organization.ospIDtype;
                            if(vm.clientData.ospCustomerSegment === 'empresa') {
                                vm.clientData.formattedName = data.customer.organization.tradingName;
                                vm.clientData.tradingName = data.customer.organization.tradingName;
                            } else {
                                vm.clientData.formattedName = data.customer.organization.relatedPartyRef[0].name;
                                vm.clientData.tradingName = data.customer.organization.relatedPartyRef[0].name;
                            }

                            // Rellenamos apellidos con los datos del customer view
                            if (vm.clientData.formattedName) {
                                let nameAndSurnames = vm.clientData.formattedName.split(' ');
                                if (!vm.clientData.firstName) {
                                    if (nameAndSurnames[0]) {
                                        vm.clientData.firstName = nameAndSurnames[0];
                                    }
                                }
                                if (!vm.clientData.surname) {
                                    if (nameAndSurnames[1]) {
                                        vm.clientData.surname = nameAndSurnames[1];
                                    }
                                }
                                if (!vm.clientData.secondSurname) {
                                    if (nameAndSurnames[2]) {
                                        vm.clientData.secondSurname = nameAndSurnames[2];
                                    }
                                }
                                if (!vm.clientData.lastName) {
                                    if (nameAndSurnames[1]) {
                                        if (nameAndSurnames[2]) {
                                            vm.clientData.lastName = nameAndSurnames[1] + ' ' + nameAndSurnames[2];
                                        } else {
                                            vm.clientData.lastName = nameAndSurnames[1];
                                        }
                                    } else {
                                        if (nameAndSurnames[2]) {
                                            vm.clientData.lastName = nameAndSurnames[2];
                                        }
                                    }
                                }
                            }
                        }

                        // Calcular tipo de cliente
                        vm.clientData.clientType = vm.getClientType(vm.clientData.ospCustomerSegment);

                        // Recuperar información de contacto
                        vm.getContactPhone();

                        // Recuperar email
                        vm.getContactEmail();

                        // Recuperar datos del pagador
                        vm.getPayerData();

                        // Recuperar datos del autorizado
                        vm.getAuthorizedData();

                        // Direccion cliente
                        vm.clientData.postalContact = data.customer.postalContact[0];
                        // Direccion servicio
                        let serviceAddress = _.find(vm.customerViewStore.info.product, function (o: any) {
                            return (o.ospProductType === 'Acceso fijo & Internet' && o.status === 'INSTALADO');
                        });
                        if(serviceAddress) {
                            vm.clientData.serviceAddress = serviceAddress.place[0];
                        }

                        // Direccion cliente
                        if (lineasMoviles > 0 && lineasFijas === 0) { // Para este caso, dirección de facturación de móvil
                            let billingAccMovil : any = _.find(vm.customerViewStore.info.billingAccount, (acc: any) => {
                                if (acc.publicKey && acc.publicKey.name === 'BILLING_ACCOUNT_MOVIL') {
                                    return acc;
                                }
                            });

                            if (billingAccMovil && billingAccMovil.billingAddress) {
                                vm.clientData.generalAddress = billingAccMovil.billingAddress[0];
                            }
                        } else { // Para este caso, dirección de instalación de servicio
                            if (serviceAddress) {
                                vm.clientData.generalAddress = serviceAddress.place[0];
                            }
                        }
                        if (vm.customerViewStore.loginData){
                        vm.customerViewStore.loginData.documentType = vm.clientData.ospIDtype;
                        vm.customerViewStore.loginData.userType = vm.clientData.clientType;
                        vm.customerViewStore.loginData.document = vm.clientData.docNumber;
                        }

                        // Cliente jazztel con fibra directa
                        vm.clientData.jazztelData = {
                            type: 1
                        };
                        vm.saveJazztelUserData(vm.clientData, data);
                        vm.saveData();
                    } else {
                        vm.customerViewStore.info = null;
                        return -2;
                    }
                }
            }
        }
    }

    saveJazztelUserData(clientData, data){
        let vm = this;

        vm.clientData = clientData;
        if (vm.clientData && !vm.clientData.jazztelData) {
            vm.clientData.jazztelData = {};
        }
        let products = data.customer.product;
        let telephoneNumber = vm.obtainTelephoneNumber(products);

        vm.clientData.jazztelData.customer = data.customer;
        sessionStorage.setItem("clientData", JSON.stringify(vm.clientData));

        vm.agreementSrv.getAgreementByNumberJazztel("", telephoneNumber, "",'shoppingCart').then(
            function(response){
                vm.clientData = JSON.parse(sessionStorage.getItem("clientData"));

                vm.clientData.jazztelData.agreement = response.Agreement;
                vm.saveData();
            }
        );

        vm.productInventorySrv.getServicesContractedJazztel(telephoneNumber, 'shoppingCart', false).then(
            function(response){
                vm.clientData = JSON.parse(sessionStorage.getItem("clientData"));

                vm.clientData.jazztelData.product = response;
                vm.saveData();
            }
        );
        
    }

    private obtainTelephoneNumber(products) {
        for(let i = 0; i < products.length; i++) {
            let product = products[i].productCharacteristic;

            for(let j = 0; j < product.length; j++) {
                if(product[j].name = 'Número fijo Asociado') {
                    return product[j].value;
                }
            }
        }
        return null;
    }

    /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#getDate
         * @param {string} date fecha a formatear
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @description
         * Formatea una fecha aaaa:mm:dd -> dd/mm/aaaa
         * @return {string} fecha string
         */
        getDate(date: string) {
            let vm = this;

            let dateFormated: string;

            dateFormated = date.slice(8) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);

            return dateFormated;
        }

        /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#getClientType
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @param {string} segmento Segmento del cliente para distinguir casos
         * @description
         * Devuelve el valor de tipo de cliente
         */
        getClientType(segmento: string) {
            let vm = this;

            let type = '';

            if (vm.customerViewStore.info === null || vm.customerViewStore.info === undefined) {
                type = '2';
            } else {
                if (vm.customerViewStore.info.product && vm.customerViewStore.info.product.length) {
                    let startDate = '';

                    // Guardamos la fecha más antigua
                    for (let i = 0; i < vm.customerViewStore.info.product.length; i++) {
                        if (vm.customerViewStore.info.product[i].startDate) {
                            startDate = vm.getOlderDate(startDate, vm.customerViewStore.info.product[i].startDate);
                        }
                    }

                    type = vm.checkTimeInOrange(segmento, startDate) ? '1' : '0';
                }
            }
            return type;
        }

        /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#getContactPhone
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @description
         * Rellena la información de contacto telefónico
         */
        getContactPhone() {
            let vm = this;

            let mobileMobile = ''; // Teléfono de contacto móvil, línea móvil contratada
            let mobileFixed = ''; // Teléfono de contacto móvil, línea fija contratada
            let fixedMobile = ''; // Teléfono de contacto fijo, línea móvil contratada
            let fixedFixed = ''; // Teléfono de contacto fijo, línea fija contratada

            if (vm.customerViewStore.info.telephoneNumber) {
                for (let i = 0; i < vm.customerViewStore.info.telephoneNumber.length; i++) {
                    if (mobileMobile === '' && vm.utils.isMobileLine(vm.customerViewStore.info.telephoneNumber[i].number)) {
                        if (vm.customerViewStore.info.telephoneNumber[i].ospIDsource.toUpperCase() === "MOVIL") {
                            mobileMobile = vm.customerViewStore.info.telephoneNumber[i].number;
                        } else {
                            mobileFixed = vm.customerViewStore.info.telephoneNumber[i].number;
                        }
                    } else if (fixedMobile === '' && vm.utils.isFixedLine(vm.customerViewStore.info.telephoneNumber[i].number)) {
                        if (vm.customerViewStore.info.telephoneNumber[i].ospIDsource.toUpperCase() === "MOVIL") {
                            fixedMobile = vm.customerViewStore.info.telephoneNumber[i].number;
                        } else {
                            fixedFixed = vm.customerViewStore.info.telephoneNumber[i].number;
                        }
                    }
                }

                if (mobileMobile === '') {
                    vm.clientData.clientMobileNumber = mobileFixed;
                } else {
                    vm.clientData.clientMobileNumber = mobileMobile;
                }

                if (fixedMobile === '') {
                    vm.clientData.clientFixedNumber = fixedFixed;
                } else {
                    vm.clientData.clientFixedNumber = fixedMobile;
                }
            }
        }

        /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#getContactEmail
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @description
         * Rellena la dirección de email de contacto
         */
        getContactEmail() {
            let vm = this;

            let emailMobile = '';
            let emailFixed = '';

            if (vm.customerViewStore.info.emailContact) {
                for (let i = 0; i < vm.customerViewStore.info.emailContact.length; i++) {
                    if (emailMobile === '') {
                        if (vm.customerViewStore.info.emailContact[i].ospIDsource.toUpperCase() === "MOVIL") {
                            emailMobile = vm.customerViewStore.info.emailContact[i].eMailAddress;
                        } else {
                            emailFixed = vm.customerViewStore.info.emailContact[i].eMailAddress;
                        }
                    }
                }

                if (emailMobile === '') {
                    vm.clientData.clientEmail = emailFixed;
                } else {
                    vm.clientData.clientEmail = emailMobile;
                }
            }
        }

        getPayerData() {
            let vm = this;
            if (vm.customerViewStore && vm.customerViewStore.info) {
                if (vm.customerViewStore.info.billingAccount && vm.customerViewStore.info.billingAccount.length
                    && vm.customerViewStore.info.billingAccount.publicKey) {
                    let payerAccount = _.find(vm.customerViewStore.info.billingAccount, function (account: any) {
                        return account.publicKey.name === 'BILLING_ACCOUNT_FIJO';
                    });
                    if (payerAccount && payerAccount.billingAddress && payerAccount.billingAddress.length) {
                        let ospIDtype = '';
                        if(vm.utils.isNif(payerAccount.publicKey.id)) {
                            ospIDtype = 'NIF';
                        } else if(vm.utils.isCif(payerAccount.publicKey.id)){
                            ospIDtype = 'CIF';
                        } else if(vm.utils.isPassport(payerAccount.publicKey.id)) {
                            ospIDtype = 'PASAPORTE';
                        } else {
                            ospIDtype = 'TARJETA DE RESIDENCIA';
                        }
                        let payerData = {
                            docNumber: payerAccount.publicKey.id ? payerAccount.publicKey.id : '',
                            ospIDtype: ospIDtype,
                            firstName: payerAccount.name.split('|')[0] ? payerAccount.name.split('|')[0] : '',
                            surname: payerAccount.name.split('|')[1] ? payerAccount.name.split('|')[1] : '',
                            secondSurname: payerAccount.name.split('|')[2] ? payerAccount.name.split('|')[2] : '',
                            postalContact: {
                                streetType: payerAccount.billingAddress[0].streetType ?  payerAccount.billingAddress[0].streetType : '',
                                streetName: payerAccount.billingAddress[0].streetName ? payerAccount.billingAddress[0].streetName : '',
                                streetNr: payerAccount.billingAddress[0].streetNr ? payerAccount.billingAddress[0].streetNr : '',
                                staircaseNumber: payerAccount.billingAddress[0].staircaseNumber ?
                                    payerAccount.billingAddress[0].staircaseNumber : '',
                                floorNumber: payerAccount.billingAddress[0].floorNumber ? payerAccount.billingAddress[0].floorNumber : '',
                                apartmentNumber: payerAccount.billingAddress[0].apartmentNumber ?
                                    payerAccount.billingAddress[0].apartmentNumber : '',
                                city: payerAccount.billingAddress[0].city ? _.deburr(payerAccount.billingAddress[0].city) : '',
                                stateOrProvince: payerAccount.billingAddress[0].stateOrProvince ?
                                    _.deburr(payerAccount.billingAddress[0].stateOrProvince) : '',
                                postCode: payerAccount.billingAddress[0].postCode ? payerAccount.billingAddress[0].postCode : ''
                            },
                            tradingName: (payerAccount.name.split('|')[0] ? payerAccount.name.split('|')[0] : '')
                             + ' ' + (payerAccount.name.split('|')[1] ? payerAccount.name.split('|')[1] : '')
                             + ' ' + (payerAccount.name.split('|')[2] ? payerAccount.name.split('|')[2] : '')
                        };
                        vm.clientData.payerData = payerData;

                    }
                }
            }
        }

        getAuthorizedData() {
            let vm = this;

            if (vm.customerViewStore && vm.customerViewStore.info) {
                let auth = null;

                if (vm.customerViewStore.info.organization && vm.customerViewStore.info.organization.relatedPartyRef
                && vm.customerViewStore.info.organization.relatedPartyRef.length > 0) {
                    auth = vm.customerViewStore.info.organization.relatedPartyRef[0];
                } else if (vm.customerViewStore.info.individual && vm.customerViewStore.info.individual.relatedPartyRef
                && vm.customerViewStore.info.individual.relatedPartyRef.length > 0) {
                    auth = vm.customerViewStore.info.individual.relatedPartyRef[0];
                }

                if (auth) {
                    let ospIDtype = '';
                    if (auth.ospTypeId) {
                        if (vm.utils.isNif(auth.ospTypeId)) {
                            ospIDtype = 'NIF';
                        } else if (vm.utils.isCif(auth.ospTypeId)) {
                            ospIDtype = 'CIF';
                        } else if (vm.utils.isPassport(auth.ospTypeId)) {
                            ospIDtype = 'PASAPORTE';
                        } else {
                            ospIDtype = 'TARJETA DE RESIDENCIA';
                        }
                    }

                    let authorizedData = {
                        tradingName: auth.name ? auth.name : '',
                        ospIDtype: ospIDtype,
                        docNumber: auth.id ? auth.id : '',
                        firstName: (auth.name && auth.name.split(' ')[0]) ? auth.name.split(' ')[0] : '',
                        surname: (auth.name && auth.name.split(' ')[1]) ? auth.name.split(' ')[1] : '',
                        secondSurname: (auth.name && auth.name.split(' ')[2]) ? auth.name.split(' ')[2] : '',
                        contactPhone: '',
                        postalContact: {
                            floorNumber: ''
                        }
                    };

                    vm.clientData.authorizedData = authorizedData;
                }
            }
        }

        /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#saveData
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @description
         * Almacena la información en sessionStorage
         */
        saveData() {
            let vm = this;
            let commercialActs: any = {};
            let defaultData = JSON.parse(sessionStorage.getItem('defaultData'));

            sessionStorage.setItem('clientData', JSON.stringify(vm.clientData));

            vm.localStorageManager.setEntry('searchval', vm.clientData.docNumber);
        }

        /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#getOlderDate
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @param {string} date1 fecha a comparar
         * @param {string} date2 fecha a comparar
         * @description
         * Devuelve la fecha más antigua (compatible para IE)
         * La segunda fecha debe ser no vacía.
         */
        getOlderDate(date1: string, date2: string) {
            let vm = this;

            // Primera comparación, creamos la fecha en el método
            if ((date1 || date1 === '') && (date2 || date2 === '')) {
                // En la primera llamada se pasa date1 vacio
                if (date1 === '') {
                    let curr = new Date();

                    date1 = vm.dateToString(curr);
                }

                let day1 = parseInt(date1.substring(8, 10), 10);
                let month1 = parseInt(date1.substring(5, 7), 10);
                let year1 = parseInt(date1.substring(0, 4), 10);

                date2 = date2.slice(0, 10);
                let day2 = parseInt(date2.substring(8, 10), 10);
                let month2 = parseInt(date2.substring(5, 7), 10);
                let year2 = parseInt(date2.substring(0, 4), 10);

                if (year1 < year2) {
                    return date1;
                } else if (year1 > year2) {
                    return date2;
                } else {
                    if (month1 < month2) {
                        return date1;
                    } else if (month1 < month2) {
                        return date2;
                    } else {
                        if (day1 < day2) {
                            return date1;
                        } else {
                            return date2;
                        }
                    }
                }
            } else {
                return '';
            }
        }

        /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#checkTimeInOrange
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @param {string} segmento Segmento del cliente
         * @param {string} fecha fecha para comprobar antiguedad
         * @description
         * Calcula la antiguedad para discernir entre tipos de cliente
         */
        checkTimeInOrange(segmento: string, fecha: string) {
            let vm = this;

            if (fecha && fecha !== '') {
                let today = new Date();
                let sevenMonths = new Date();
                let threeMonths = new Date();

                // Construye una fecha de hace 7 meses para comparar
                if (sevenMonths.getMonth() >= 7) { //Mismo año, solo modificamos el mes
                    sevenMonths.setMonth(sevenMonths.getMonth() - 7);
                } else {
                    sevenMonths.setFullYear(sevenMonths.getFullYear() - 1);
                    sevenMonths.setMonth(sevenMonths.getMonth() + 5);
                }

                // Construye una fecha de hace 3 meses para comparar
                if (threeMonths.getMonth() >= 3) {
                    threeMonths.setMonth(threeMonths.getMonth() - 3);
                } else {
                    threeMonths.setFullYear(threeMonths.getFullYear() - 1);
                    threeMonths.setMonth(threeMonths.getMonth() + 9);
                }

                let sevenMonthsStr = vm.dateToString(sevenMonths);
                let threeMonthsStr = vm.dateToString(threeMonths);

                if (segmento === 'residencial') {
                    let value = vm.getOlderDate(fecha, threeMonthsStr);
                    return value === fecha;
                } else if (segmento === 'empresa') {
                    let value = vm.getOlderDate(fecha, sevenMonthsStr);
                    return value === fecha;
                } else {
                    let value = vm.getOlderDate(fecha, sevenMonthsStr);
                    return value === fecha;
                }
            } else {
                return false;
            }
        }

        /**
         * @ngdoc method
         * @name actualCualificationClient.Controllers:ActualCualificationClientCtrl#dateToString
         * @methodOf actualCualificationClient.Controllers:ActualCualificationClientCtrl
         * @param {Date} fecha fecha para comprobar antiguedad
         * @description
         * Convierte una fecha a formato string "YYYY-MM-DD"
         */
        dateToString(fecha: Date) {
            let vm = this;

            let day = fecha.getDate().toString();
            for (let i = day.length; i < 2; i++) {
                day = '0' + day;
            }

            let month = (fecha.getMonth() + 1).toString();
            for (let i = month.length; i < 2; i++) {
                month = '0' + month;
            }

            let year = fecha.getFullYear().toString();
            for (let i = year.length; i < 4; i++) {
                year = '0' + year;
            }

            return year + '-' + month + '-' + day;
        }
    }
  }
