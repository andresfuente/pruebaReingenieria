/**
 * Created by jcardonv on 18/02/2017.
 */
declare module OrangeFeSARQ.Models {

    export interface ListLabel {
        name: string;
        description: string;
        id: number;
        value: string;
    }

    export interface ListOptionsLiteral {
        name: string;
        value: string;
    }

    export interface ListOption {
        listOptionsLiteral: [ListOptionsLiteral];
        name: string;
        id: number;
    }

    export interface BlobAddress {
        tableName: string;
        columnName: string;
        identifier: string;
        identifierColumnName: string;
    }

    // todo revisar si contiene  algo
    export interface BinaryStream {
    }

    // todo revisar si contiene  algo
    export interface WebReferences {
    }

    export interface ImageFile {
        filename: string;
        foldername: string;
        webReferences: [WebReferences]; // todo revisar si contiene  algo
        blobAddress: BlobAddress;
        binaryStream: BinaryStream; // todo revisar si contiene  algo
    }

    export interface ListDeepLink {
        code: string;
        color: string;
        altText: string;
        title: string;
        url: string;
        target: string;
        imageFile_bloblink_: string;
        compId: string;
        imageFile: ImageFile;
        subtitle: string;
        name: string;
        typeLink: string;
        information: string;
        id: number;
        desc: string;
    }

    export interface ListImage {
        imageFile_bloblink_: string;
        altText: string;
        compId: string;
        imageFile: ImageFile;
        name: string;
        id: number;
        title: string;
    }

    export interface ListModule {
        queryMode: boolean;
        listLabel: Array<ListLabel>;
        listOption: Array<ListOption>;
        listDeepLink: Array<ListDeepLink>;
        managementMode: boolean;
        title: string;
        listImage: Array<ListImage>;
        labelAngular: string;
        emptyMessage: string;
        urlMoreInfo: string;
        id: number;
        listModule: Array<ListModule>;
        modeMoreInfo: string;
        listMoreInfo: Array<String>;
        numMax: number;
        richText: any[];
        moduleMode?: any;
        listModuleSwitch: any[];
        compId: string;
        moreInformacion?: any;
        listTable: any[];
        subtitle?: any;
        titleMoreInfo?: any;
        information?: any;
        desc?: any;
    }

    export interface ListModuleSwitch {
        queryMode: boolean;
        listLabel: Array<ListLabel>;
        code: string;
        managementMode: boolean;
        title: string;
        switch: boolean;
        labelAngular: string;
        button: boolean;
        typology: any;
        textButton: string;
        listMessageValidation: any[];
        compId: string;
        name: string;
        nonConfigurableService: string;
        titleMoreInfo: string;
        information: string;
        id: number;
        desc: string;
    }

    export interface Column {
        name: string;
        value: string;
    }

    export interface ListTable {
        code: string;
        compId: string;
        numMax: number;
        columns: Array<Column>;
        subtitle: string;
        name: string;
        id: number;
        title: string;
        desc: string;
    }

    export interface Owcs {
        queryMode: boolean;
        code: string;
        listLabel: Array<ListLabel>;
        listOption: Array<ListOption>;
        rating: number;
        colorChartAlternative: any;
        listDeepLink: Array<ListDeepLink>;
        managementMode: boolean;
        title: string;
        subtitleMoreInfo: String;
        listImage: Array<ListImage>;
        labelAngular: string;
        emptyMessage: string;
        urlMoreInfo: string;
        listMessageValidation: Array<any>;
        assetId: number;
        id: number;
        listModule: Array<ListModule>;
        accordion: boolean;
        modeMoreInfo: string;
        numMax: number;
        listMoreInfo: Array<any>;
        confidence: number;
        listPages: Array<any>;
        richText: Array<any>;
        assetType: string;
        moduleMode: any;
        listModuleSwitch: Array<ListModuleSwitch>;
        compId: string;
        colorChart: string;
        moreInformacion: string;
        listTable: Array<ListTable>;
        subtitle: string;
        name: string;
        information: string;
        titleMoreInfo: string;
        desc: string;
        parents: Array<any>;
    }

    export interface OwcsHtml {
        queryMode: boolean;
        code: string;
        labels: Array<ListLabel>;
        options: Array<ListOption>;
        links: Array<ListDeepLink>;
        images: Array<ListImage>;
        modules: Array<ListModule>;
        moreInfos: Array<any>;
        messageValidations: Array<any>;
        pages: Array<any>;
        richTexts: Array<any>;
        moduleSwitchs: Array<ListModuleSwitch>;
        tables: Array<ListTable>;
        parents: Array<any>;

        title: string;
        subtitle: string;

        assetType: string;
        assetId: number;
        id: number;



        rating: number;
        colorChartAlternative: any;
        managementMode: boolean;
        subtitleMoreInfo: String;
        labelAngular: string;
        emptyMessage: string;
        urlMoreInfo: string;
        accordion: boolean;
        modeMoreInfo: string;
        numMax: number;
        confidence: number;
        moduleMode: any;
        compId: string;
        colorChart: string;
        moreInformacion: string;
        name: string;
        information: string;
        titleMoreInfo: string;
        desc: string;
    }

    export interface ComponentOwcs {
        section: Owcs
    }
    export interface ComponentOwcsHtml {
        section: OwcsHtml
    }

}