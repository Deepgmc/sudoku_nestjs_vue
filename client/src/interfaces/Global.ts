export interface IModule {
    readonly _apiModule: string
    readonly _postData: (action: string) => any
    readonly _getData: (action: string) => any
}