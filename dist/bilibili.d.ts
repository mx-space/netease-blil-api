export interface FavoriteBangumiType {
    title: string;
    cover: string;
    count: string | number;
    miniCover: string;
    countText: string;
    id: number;
}
export interface PersonalVideoType {
    pic: string;
    playCount: number;
    commentCount: number;
    desc: string;
    title: string;
    created: string;
    time: string;
    av: number;
    bv: string;
    url: string;
    author: string;
}
export declare class BiliClient {
    private uid;
    private client;
    constructor(uid: number);
    getFavoriteBangumi(len?: number): Promise<FavoriteBangumiType[]>;
    getPersonalVideo(len?: number): Promise<PersonalVideoType[]>;
}
