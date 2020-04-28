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
    getMusicUrl(id: string | number): Promise<{
        id: number;
        url: string;
        size: string;
        type: string;
        title: string;
        album: string;
        author: string;
        cover: string;
    }>;
    getMusicsUrl(ids: (number | string)[]): Promise<GetMusicsUrlType>;
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
