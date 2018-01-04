declare module OrangeFeSARQ.Models {
    
        export class LineInformation {
            id2: string;
            msisdn: string;
            id: number;                        
            rateName: string;
            rateGroupName: string;
            range: string;
            startDate: string;
            tmCode: string;                       
            isPack: boolean;
        }

        export class OrderInformation {
            id: number;
            msisdn: string;                                            
            rateName: string;
            rateGroupName: string;
            range: string;
            startDate: string;
            tmCode: string;
            isPack: boolean;
        }
    }
    