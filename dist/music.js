"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeteaseMusic = void 0;
const date_fns_1 = require("date-fns");
const fs_1 = __importStar(require("fs"));
const NeteaseCloudMusicApi_1 = require("NeteaseCloudMusicApi");
const path_1 = require("path");
class NeteaseMusic {
    constructor(phoneNumber, password) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.tempPath = path_1.join(__dirname, '../temp');
        if (fs_1.default.existsSync(this.tempPath)) {
            if (fs_1.default.statSync(this.tempPath).isDirectory()) {
                return;
            }
            throw new Error('temp 被占用');
        }
        else {
            fs_1.default.mkdirSync(this.tempPath);
        }
    }
    async Login() {
        const cookiePath = path_1.join(this.tempPath, 'netease_cookie');
        if (fs_1.default.existsSync(cookiePath)) {
            try {
                this.cookie = fs_1.readFileSync(cookiePath, {
                    encoding: 'utf-8',
                });
            }
            catch (_a) { }
            try {
                if (!this.cookie) {
                    throw new Error();
                }
                await this.getAccount();
            }
            catch (_b) {
                fs_1.default.unlinkSync(cookiePath);
                this.Login();
            }
        }
        else {
            const { body } = await NeteaseCloudMusicApi_1.login_cellphone({
                phone: this.phoneNumber,
                password: this.password,
            });
            if (body.cookie) {
                fs_1.writeFileSync(cookiePath, body.cookie, {
                    encoding: 'utf-8',
                });
                this.cookie = body.cookie;
                await this.getAccount();
            }
        }
        return this.cookie;
    }
    async getAccount() {
        if (!this.cookie) {
            return;
        }
        const userAccount = (await NeteaseCloudMusicApi_1.user_account({
            cookie: this.cookie, // 凭证
        }));
        this.uid = userAccount.body.account.id;
        return this.uid;
    }
    async getRecordAndParseData(type, len = 10) {
        if (!this.cookie) {
            return;
        }
        const record = (await NeteaseCloudMusicApi_1.user_record({
            uid: this.uid,
            cookie: this.cookie,
            type,
        })).body;
        const data = type === 0 ? record.allData : record.weekData;
        return data
            .map((data) => {
            const song = data.song;
            return {
                id: song.id,
                time: date_fns_1.format(new Date(song.dt), 'mm:ss'),
                picUrl: song.al.picUrl,
                name: song.name,
                author: song.ar
                    .map((item) => {
                    return item.name;
                })
                    .join(' & '),
                playCount: data.playCount,
            };
        })
            .sort((a, b) => b.playCount - a.playCount)
            .slice(0, len);
    }
    async getWeekData(len = 10) {
        return await this.getRecordAndParseData(1, len);
    }
    async getAllData(len = 10) {
        return await this.getRecordAndParseData(0, len);
    }
    async getPlaylistInfo(id) {
        const playlistInfo = (await NeteaseCloudMusicApi_1.playlist_detail({ id })).body;
        const playListData = playlistInfo.playlist;
        const tracks = playListData.tracks.map((song) => {
            return {
                id: song.id,
                time: date_fns_1.format(new Date(song.dt), 'mm:ss'),
                picUrl: song.al.picUrl,
                name: song.name,
                author: song.ar
                    .map((item) => {
                    return item.name;
                })
                    .join(' & '),
            };
        });
        return {
            id,
            coverImgUrl: playListData.coverImgUrl,
            coverImgId: playListData.coverImgId,
            playCount: playListData.playCount,
            name: playListData.name,
            data: tracks,
        };
    }
    async getFavorite() {
        var _a;
        const allPlayListData = (await NeteaseCloudMusicApi_1.user_playlist({ uid: this.uid }))
            .body;
        const playListId = (_a = allPlayListData.playlist) === null || _a === void 0 ? void 0 : _a.shift().id;
        return await this.getPlaylistInfo(playListId);
    }
    async getMusicUrl(id) {
        const [music] = (await NeteaseCloudMusicApi_1.song_url({ id })).body.data;
        const { songs } = (await NeteaseCloudMusicApi_1.song_detail({
            ids: id,
        })).body;
        const song = songs[0];
        return {
            id: music.id,
            url: music.url,
            size: (music.size / 1024 / 1024).toFixed(2) + 'MB',
            type: music.type,
            title: song.name,
            album: song.al.name,
            author: song.ar.map((a) => a.name).join(' & '),
            cover: song.al.picUrl,
        };
    }
    async getMusicsUrl(ids) {
        var e_1, _a;
        const songs = [];
        try {
            for (var ids_1 = __asyncValues(ids), ids_1_1; ids_1_1 = await ids_1.next(), !ids_1_1.done;) {
                const id = ids_1_1.value;
                songs.push(await this.getMusicUrl(id));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) await _a.call(ids_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { songs };
    }
}
exports.NeteaseMusic = NeteaseMusic;
