/**
 * Created by jcardonv on 03/01/2017.
 */
module OrangeFeSARQ.Models {
    'use strict';

    export class DetailsResponse {

        private _code: number;
        private _message: string;
        private _description: string;
        private _infoURL: string;
        private _title: string;

        constructor(code: number = null, message: string = null, title: string = null, description: string = null, infoURL: string = null) {
            this._code = code;
            this._message = message;
            this._title = title;
            this._description = description;
            this._infoURL = infoURL;
        }

        
        set title(value: string) {
            this._title = value;
        }

        get message(): string {
            return this._message;
        }

        set message(value: string) {
            this._message = value;
        }

        get description(): string {
            return this._description;
        }

        get code(): number {
            return this._code;
        }

        set code(value: number) {
            this._code = value;
        }

        get title(): string {
            return this._title;
        }

        get infoURL(): string {
            return this._infoURL;
        }

        set infoURL(value: string) {
            this._infoURL = value;
        }

        set description(value: string) {
            this._description = value;
        }
    }

    export class ErrorResponse {

        private _code: number;
        private _message: string;
        private _description: string;
        private _title: string;
        private _infoURL: string;
        private _details: Array< OrangeFeSARQ.Models.DetailsResponse>;

        get code(): number {
            return this._code;
        }

        set code(value: number) {
            this._code = value;
        }

        get title(): string {
            return this._title;
        }

        set title(value: string) {
            this._title = value;
        }

        get message(): string {
            return this._message;
        }

        set message(value: string) {
            this._message = value;
        }

        get description(): string {
            return this._description;
        }

        set description(value: string) {
            this._description = value;
        }

        get infoURL(): string {
            return this._infoURL;
        }

        set infoURL(value: string) {
            this._infoURL = value;
        }

        get details(): Array<OrangeFeSARQ.Models.DetailsResponse> {
            return this._details;
        }

        set details(value: Array<OrangeFeSARQ.Models.DetailsResponse>) {
            this._details = value;
        }
    }
}
