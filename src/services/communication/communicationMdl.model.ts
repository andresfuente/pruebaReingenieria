module OrangeFeSARQ.Models {
    'use strict';

    export interface IBody {
        contactEmail: Array<IContactEmail>;
        docNumber: string;
        docType: string;
        endDate: string;
        msisdn: Array<IMsisdn>;
        numRows: string;
        process: Array<IProcess>;
        sendType: string;
        start: string;
        startDate: string;
        subprocess: string;
    }

    export interface IBody2 {
        callbackFlag: string;
        content: string;
        logFlag: string;
        priority: string;
        sendTime: string;
        sendTimeComplete: string;
        status: string;
        subject: string;
        tryTimes: string;
        type: string;
        'characteristic.name': string;
        'characteristic.value': string;
        'receiver.appUserId': string;
        'receiver.email': string;
        'receiver.ip': string;
        'receiver.name': string;
        'receiver.phoneNumber': string;
        'sender.email': string;
        'sender.name': string;
        'attachment.mimeType': string;
        'attachment.name': string;
        'attachment.path': string;
        'attachment.size': string;
        'attachment.sizeUnit': string;
        'attachment.url': string;
        'receiver.relatedParty.id': string;
        'receiver.relatedParty.ospIDType': string;
        reason: string;
        reasonNot: string;
        reasonDetail: string;
        start: string;
        rows: string;
        version: string;
        id: string;
    }

    export class ITemplateBody2 {
        id: string;
        type: string;
        version: string;
        ['characteristic.name']: string;
        ['characteristic.value']: string;
    }

    export interface IMsisdn {
        msisdnNumber: string;
    }

    export interface IContactEmail {
        contactEmailNumber: string;
    }

    export interface IProcess {
        processNom: string;
        status: string;
    }

}
