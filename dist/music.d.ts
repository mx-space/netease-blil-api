import { MusicClient } from 'netease-music-sdk';
export interface PlayListType {
    id: number;
    time: string;
    picUrl: string;
    name: string;
    author: string;
    playCount?: number;
}
export declare class NeteaseMusic extends MusicClient {
    private phoneNumber;
    private password;
    private tempPath;
    constructor(phoneNumber: string, password: string);
    Login(): Promise<import("netease-music-sdk/lib/user").User>;
    private getRecordAndParseData;
    getWeekData(len?: number): Promise<PlayListType[]>;
    getAllData(len?: number): Promise<PlayListType[]>;
    getPlaylistInfo(id: number): Promise<PersonalPlayListType>;
    getFavorite(): Promise<PersonalPlayListType>;
}
export interface PersonalPlayListType {
    id: number;
    coverImgUrl: string;
    coverImgId: number;
    playCount: number;
    name: string;
    data: PlayListType[];
}
