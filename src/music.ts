import { MusicClient, UserRecordType } from 'netease-music-sdk'
import fs from 'fs'
import { resolve, join } from 'path'
import { Song, Playlist } from './interface/music.interface'
import { format } from 'date-fns'
export interface PlayListType {
  id: number
  time: string
  picUrl: string
  name: string
  author: string
  playCount?: number
}
export class NeteaseMusic extends MusicClient {
  private tempPath = join(__dirname, '../temp')
  constructor(private phoneNumber: string, private password: string) {
    super()
    if (fs.existsSync(this.tempPath)) {
      if (fs.statSync(this.tempPath).isDirectory()) {
        return
      }
      throw new Error('temp 被占用')
    } else {
      fs.mkdirSync(this.tempPath)
    }
  }

  public async Login() {
    const cookiePath = join(this.tempPath, './cookie')
    if (fs.existsSync(cookiePath)) {
      this.load(
        JSON.parse(
          fs.readFileSync(resolve(this.tempPath, './cookie')).toString(),
        ),
      )
      if (!this.isLogin) {
        fs.unlinkSync(cookiePath)
        this.Login()
      }
    } else {
      await this.phoneLogin(this.phoneNumber, this.password)
      const userStore = JSON.stringify(this.user.toJSON())
      fs.writeFileSync(cookiePath, userStore)
    }
    return this.user
  }

  private async getRecordAndParseData(type: UserRecordType, len = 10) {
    const record = await this.getUserRecord(this.user.id, type)
    const data = type === UserRecordType.ALL ? record.allData : record.weekData
    return (data as any[])
      .map(
        (data): PlayListType => {
          const song = data.song as Song.Song
          return {
            id: song.id,
            time: format(new Date(song.dt), 'mm:ss'),
            picUrl: song.al.picUrl,
            name: song.name,
            author: song.ar
              .map((item) => {
                return item.name
              })
              .join(' & '),
            playCount: data.playCount,
          }
        },
      )
      .sort((a, b) => (b.playCount as number) - (a.playCount as number))
      .slice(0, len)
  }
  async getWeekData(len = 10) {
    return await this.getRecordAndParseData(UserRecordType.WEEK, len)
  }
  async getAllData(len = 10) {
    return await this.getRecordAndParseData(UserRecordType.ALL, len)
  }
  async getFavorite(): Promise<PersonalPlayListType> {
    const allPlayListData = await this.getUserPlaylist(this.user.id)
    const playListId = allPlayListData.playlist?.shift().id
    const playlistInfo = await this.getPlaylistInfo(playListId)
    const playListData = playlistInfo.playlist as Playlist.Playlist
    const tracks = playListData.tracks.map(
      (song): PlayListType => {
        return {
          id: song.id,
          time: format(new Date(song.dt), 'mm:ss'),
          picUrl: song.al.picUrl,
          name: song.name,
          author: song.ar
            .map((item) => {
              return item.name
            })
            .join(' & '),
        }
      },
    )

    return {
      id: playListId,
      coverImgUrl: playListData.coverImgUrl,
      coverImgId: playListData.coverImgId,
      playCount: playListData.playCount,
      data: tracks,
    }
  }
}

export interface PersonalPlayListType {
  id: number
  coverImgUrl: string
  coverImgId: number
  playCount: number
  data: PlayListType[]
}
