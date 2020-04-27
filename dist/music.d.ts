import { MusicClient } from "netease-music-sdk";
export declare class NeteaseMusic extends MusicClient {
    private phoneNumber;
    private password;
    private tempPath;
    constructor(phoneNumber: string, password: string);
    Login(): Promise<import("netease-music-sdk/lib/user").User>;
    private getRecordAndParseData;
    getWeekData(len?: number): Promise<{
        id: number;
        time: string;
        picUrl: string;
        name: string;
        author: string;
        playCount: any;
    }[]>;
    getAllData(len?: number): Promise<{
        id: number;
        time: string;
        picUrl: string;
        name: string;
        author: string;
        playCount: any;
    }[]>;
}
