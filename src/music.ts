import { format } from 'date-fns'
import fs, { readFileSync, writeFileSync } from 'fs'
import {
  login_cellphone,
  playlist_detail,
  song_detail,
  song_url,
  UserRecordType,
  user_account,
  user_playlist,
  user_record,
} from 'NeteaseCloudMusicApi'
import { join } from 'path'
import { Playlist, Song } from './interface/music.interface'
export interface PlayListType {
  id: number
  time: string
  picUrl: string
  name: string
  author: string
  playCount?: number
}
export class NeteaseMusic {
  private tempPath = join(__dirname, '../temp')
  constructor(private phoneNumber: string, private password: string, private md5_password: string) {
    if (fs.existsSync(this.tempPath)) {
      if (fs.statSync(this.tempPath).isDirectory()) {
        return
      }
      throw new Error('temp 被占用')
    } else {
      fs.mkdirSync(this.tempPath)
    }
  }
  private cookie: string | undefined
  private uid: number | undefined

  public get Login() {
    return this.login
  }

  public async login() {
    const cookiePath = join(this.tempPath, 'netease_cookie')
    if (fs.existsSync(cookiePath)) {
      try {
        this.cookie = readFileSync(cookiePath, {
          encoding: 'utf-8',
        })
      } catch {}
      try {
        if (!this.cookie) {
          throw new Error()
        }
        await this.getAccount()
      } catch {
        fs.unlinkSync(cookiePath)
        await this.Login()
      }
    } else if(this.password!=null){
      const { body } = await login_cellphone({
        phone: this.phoneNumber,
        password: this.password,
      })
      if (body.cookie) {
        writeFileSync(cookiePath, body.cookie, {
          encoding: 'utf-8',
        })

        this.cookie = body.cookie as string
        await this.getAccount()
      }
    }
    else {
      const { body } = await login_cellphone({
        phone: this.phoneNumber,
        md5_password: this.md5_password,
      })
      if (body.cookie) {
        writeFileSync(cookiePath, body.cookie, {
          encoding: 'utf-8',
        })

        this.cookie = body.cookie as string
        await this.getAccount()
      }
    }
    return this.cookie
  }

  public async getAccount() {
    if (!this.cookie) {
      return
    }
    const userAccount = (await user_account({
      cookie: this.cookie, // 凭证
    })) as any
    this.uid = userAccount.body.account.id
    return this.uid
  }

  private async getRecordAndParseData(type: UserRecordType, len = 10) {
    if (!this.cookie) {
      return
    }
    const record = (
      await user_record({
        uid: this.uid!,
        cookie: this.cookie,
        type,
      })
    ).body
    const data = type === 0 ? record.allData : record.weekData
    return (data as any[])
      .map((data): PlayListType => {
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
      })
      .sort((a, b) => (b.playCount as number) - (a.playCount as number))
      .slice(0, len)
  }
  async getWeekData(len = 10) {
    return await this.getRecordAndParseData(1, len)
  }
  async getAllData(len = 10) {
    return await this.getRecordAndParseData(0, len)
  }
  async getPlaylistInfo(id: number): Promise<PersonalPlayListType> {
    if (!this.cookie) {
      // FIXME
      throw new Error('fuck netease: 2021-06-11')
    }
    const playlistInfo = (await playlist_detail({ id, cookie: this.cookie! }))
      .body
    const playListData = playlistInfo.playlist as Playlist.Playlist
    const tracks = playListData.tracks.map((song): PlayListType => {
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
    })

    return {
      id,
      coverImgUrl: playListData.coverImgUrl,
      coverImgId: playListData.coverImgId,
      playCount: playListData.playCount,
      name: playListData.name,
      data: tracks,
    }
  }
  async getFavorite(): Promise<PersonalPlayListType> {
    if (!this.cookie) {
      // FIXME
      throw new Error('fuck netease: 2021-06-11')
    }
    const allPlayListData = (
      await user_playlist({ uid: this.uid!, cookie: this.cookie! })
    ).body as any
    const playListId = allPlayListData.playlist?.shift().id
    return await this.getPlaylistInfo(playListId)
  }
  async getMusicUrl(id: string) {
    const [music] = (await song_url({ id })).body.data as any[]
    const { songs } = (
      await song_detail({
        ids: id,
      })
    ).body as any

    const song = songs[0]

    return {
      id: music.id,
      url: music.url,
      size: (music.size / 1024 / 1024).toFixed(2) + 'MB',
      type: music.type,
      title: song.name,
      album: song.al.name,
      author: song.ar.map((a: { name: any }) => a.name).join(' & '),
      cover: song.al.picUrl,
    }
  }
  async getMusicsUrl(ids: string[]): Promise<GetMusicsUrlType> {
    const songs: GetMusicUrlType[] = []
    for await (const id of ids) {
      songs.push(await this.getMusicUrl(id))
    }
    return { songs }
  }
}

export interface PersonalPlayListType {
  id: number
  coverImgUrl: string
  coverImgId: number
  playCount: number
  name: string
  data: PlayListType[]
}

export interface GetMusicUrlType {
  id: number
  url: string
  size: string
  type: string
  title: string
  album: string
  author: string

  cover: string
}
export interface GetMusicsUrlType {
  songs: GetMusicUrlType[]
}
