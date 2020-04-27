"use strict";
//'https://api.bilibili.com/x/space/bangumi/follow/list?type=1&pn=1&ps=' . ($num ? $num : '15') . '&vmid=' . $uid
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const date_fns_1 = require("date-fns");
class BiliClient {
    constructor(uid) {
        this.uid = uid;
        this.client = axios_1.default.create({
            baseURL: 'https://api.bilibili.com/x/space',
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            },
        });
    }
    async getFavoriteBangumi(len = 15) {
        const { data } = await this.client({
            url: `bangumi/follow/list?type=1&pn=1&ps=${len}&vmid=${this.uid}`,
            method: 'get',
        });
        return data.data.list.map((item) => {
            return {
                title: item.title,
                cover: item.cover,
                count: item.total_count > 0 ? item.total_count : '未知',
                miniCover: item.square_cover,
                countText: item.new_ep.index_show,
                id: item.media_id,
            };
        });
    }
    async getPersonalVideo(len = 5) {
        const { data } = await this.client({
            url: `arc/search?mid=${this.uid}&ps=${len}&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp`,
        });
        return data.data.list.vlist.map((item) => {
            return {
                pic: item.pic,
                playCount: item.play,
                commentCount: item.comment,
                desc: item.description,
                title: item.title,
                created: date_fns_1.format(item.created * 1000, 'yyyy-MM-dd HH:mm:ss'),
                time: item.length,
                av: item.aid,
                bv: item.bvid,
                url: `https://bilibili.com/video/${item.bvid ? item.bvid : `av${item.aid}`}`,
                author: item.author,
            };
        });
    }
}
exports.BiliClient = BiliClient;
