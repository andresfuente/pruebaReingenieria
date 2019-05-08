module OrangeFeSARQ.Services {
    'use strict';

    export class CasesStore {
        private _showCasesTable: string;

        constructor() {
        }

        get showCasesTable(): string {
            return this._showCasesTable;
        }

        set showCasesTable(value: string) {
            this._showCasesTable = value;
        }
    }
}
