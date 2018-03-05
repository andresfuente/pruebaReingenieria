module OrangeFeSARQ.Services {
    'use strict';

    export class TypificationStore {
        private _body;
        private _provisionData;

        constructor() {
        }

        get body() {
            let vm = this;
            return vm._body;
        }

        set body(body) {
            let vm = this;
            vm._body = body;
        }

        get provisionData() {
            let vm = this;
            return vm._provisionData;
        }

        set provisionData(provisionData: string) {
            let vm = this;
            vm._provisionData = provisionData;
        }

        get description(): string {
            let vm = this;
            return (vm._body.description) ? vm._body.description : '';
        }

        set description(description: string) {
            let vm = this;
            vm._body.description = description;
        }
    }
}
