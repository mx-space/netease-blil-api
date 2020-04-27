//'https://api.bilibili.com/x/space/bangumi/follow/list?type=1&pn=1&ps=' . ($num ? $num : '15') . '&vmid=' . $uid

import axios from 'axios'
import { BiliBili, BiliSearch } from './interface/bili.interface'
import { format } from 'date-fns'

export class BiliClient {
  private client = axios.create({
    baseURL: 'https://api.bilibili.com/x/space',
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    },
  })
  constructor(private uid: number) {}

  async getFavoriteBangumi(len = 15) {
    const { data } = await this.client({
      url: `bangumi/follow/list?type=1&pn=1&ps=${len}&vmid=${this.uid}`,
      method: 'get',
    })
    return (data as BiliBili.UserBangumi).data.list.map((item) => {
      return {
        title: item.title,
        cover: item.cover,
        count: item.total_count > 0 ? item.total_count : '未知',
        miniCover: item.square_cover,
        countText: item.new_ep.index_show,
        id: item.media_id,
      }
    })
  }

  async getPersonalVideo(len = 5) {
    const { data } = await this.client({
      url: `arc/search?mid=${this.uid}&ps=${len}&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp`,
    })
    return (data as BiliSearch.SearchResult).data.list.vlist.map((item) => {
      return {
        pic: item.pic,
        playCount: item.play,
        commentCount: item.comment,
        desc: item.description,
        title: item.title,
        created: format(item.created * 1000, 'yyyy-MM-dd HH:mm:ss'),
        time: item.length,
        av: item.aid,
        bv: item.bvid,
        url: `https://bilibili.com/video/${
          item.bvid ? item.bvid : `av${item.aid}`
        }`,
        author: item.author,
      }
    })
  }
}
