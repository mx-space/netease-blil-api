export declare class BiliClient {
    private uid;
    private client;
    constructor(uid: number);
    getFavoriteBangumi(len?: number): Promise<{
        title: string;
        cover: string;
        count: string | number;
        miniCover: string;
        countText: string;
        id: number;
    }[]>;
    getPersonalVideo(len?: number): Promise<{
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
    }[]>;
}
