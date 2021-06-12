export interface PlayListType {
    id: number;
    time: string;
    picUrl: string;
    name: string;
    author: string;
    playCount?: number;
}
export declare class NeteaseMusic {
    private phoneNumber;
    private password;
    private tempPath;
    constructor(phoneNumber: string, password: string);
    private cookie;
    private uid;
    Login(): Promise<string | undefined>;
    private getAccount;
    private getRecordAndParseData;
    getWeekData(len?: number): Promise<PlayListType[] | undefined>;
    getAllData(len?: number): Promise<PlayListType[] | undefined>;
    getPlaylistInfo(id: number): Promise<PersonalPlayListType>;
    getFavorite(): Promise<PersonalPlayListType>;
    getMusicUrl(id: string): Promise<{
        id: any;
        url: any;
        size: string;
        type: any;
        title: any;
        album: any;
        author: any;
        cover: any;
    }>;
    getMusicsUrl(ids: string[]): Promise<GetMusicsUrlType>;
}
export interface PersonalPlayListType {
    id: number;
    coverImgUrl: string;
    coverImgId: number;
    playCount: number;
    name: string;
    data: PlayListType[];
}
export interface GetMusicUrlType {
    id: number;
    url: string;
    size: string;
    type: string;
    title: string;
    album: string;
    author: string;
    cover: string;
}
export interface GetMusicsUrlType {
    songs: GetMusicUrlType[];
}
