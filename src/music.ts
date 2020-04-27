import { MusicClient, UserRecordType } from "netease-music-sdk";
import fs from "fs";
import { resolve, join } from "path";
import { Song } from "./interface/music.interface";
import { format } from "date-fns";

export class NeteaseMusic extends MusicClient {
  private tempPath = join(__dirname, "../temp");
  constructor(private phoneNumber: string, private password: string) {
    super();
    if (fs.existsSync(this.tempPath)) {
      if (fs.statSync(this.tempPath).isDirectory()) {
        return;
      }
      throw new Error("temp 被占用");
    } else {
      fs.mkdirSync(this.tempPath);
    }
  }

  public async Login() {
    if (fs.existsSync(join(this.tempPath, "./cookie"))) {
      this.load(
        JSON.parse(
          fs.readFileSync(resolve(this.tempPath, "./cookie")).toString()
        )
      );
    } else {
      await this.phoneLogin(this.phoneNumber, this.password);
      const userStore = JSON.stringify(this.user.toJSON());
      fs.writeFileSync(join(this.tempPath, "./cookie"), userStore);
    }
    return this.user;
  }

  private async getRecordAndParseData(type: UserRecordType, len = 10) {
    const record = await this.getUserRecord(this.user.id, type);
    const data = type === UserRecordType.ALL ? record.allData : record.weekData;
    return (data as any[])
      .map((data) => {
        const song = data.song as Song.Song;
        return {
          id: song.id,
          time: format(new Date(song.dt), "mm:ss"),
          picUrl: song.al.picUrl,
          name: song.name,
          author: song.ar
            .map((item) => {
              return item.name;
            })
            .join(" & "),
          playCount: data.playCount,
        };
      })
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, len);
  }
  async getWeekData(len = 10) {
    return await this.getRecordAndParseData(UserRecordType.WEEK, len);
  }
  async getAllData(len = 10) {
    return await this.getRecordAndParseData(UserRecordType.ALL, len);
  }
}
