export namespace Song {
  export interface Ar {
    id: number
    name: string
    tns: any[]
    alias: any[]
  }

  export interface Al {
    id: number
    name: string
    picUrl: string
    tns: any[]
    pic_str: string
    pic: number
  }

  export interface H {
    br: number
    fid: number
    size: number
    vd: number
  }

  export interface M {
    br: number
    fid: number
    size: number
    vd: number
  }

  export interface L {
    br: number
    fid: number
    size: number
    vd: number
  }

  export interface Privilege {
    id: number
    fee: number
    payed: number
    st: number
    pl: number
    dl: number
    sp: number
    cp: number
    subp: number
    cs: boolean
    maxbr: number
    fl: number
    toast: boolean
    flag: number
    preSell: boolean
  }

  export interface Song {
    name: string
    id: number
    pst: number
    t: number
    ar: Ar[]
    alia: any[]
    pop: number
    st: number
    rt?: any
    fee: number
    v: number
    crbt?: any
    cf: string
    al: Al
    dt: number
    h: H
    m: M
    l: L
    a?: any
    cd: string
    no: number
    rtUrl?: any
    ftype: number
    rtUrls: any[]
    djId: number
    copyright: number
    s_id: number
    mark: number
    mst: number
    cp: number
    mv: number
    rtype: number
    rurl?: any
    publishTime: number
    privilege: Privilege
  }
}

export namespace Playlist {
  export interface Creator {
    defaultAvatar: boolean
    province: number
    authStatus: number
    followed: boolean
    avatarUrl: string
    accountStatus: number
    gender: number
    city: number
    birthday: number
    userId: number
    userType: number
    nickname: string
    signature: string
    description: string
    detailDescription: string
    avatarImgId: number
    backgroundImgId: number
    backgroundUrl: string
    authority: number
    mutual: boolean
    expertTags?: any
    experts?: any
    djStatus: number
    vipType: number
    remarkName?: any
    backgroundImgIdStr: string
    avatarImgIdStr: string
    avatarImgId_str: string
  }

  export interface Ar {
    id: number
    name: string
    tns: any[]
    alias: any[]
  }

  export interface Al {
    id: number
    name: string
    picUrl: string
    tns: string[]
    pic_str: string
    pic: any
  }

  export interface H {
    br: number
    fid: number
    size: number
    vd: number
  }

  export interface M {
    br: number
    fid: number
    size: number
    vd: number
  }

  export interface L {
    br: number
    fid: number
    size: number
    vd: number
  }

  export interface NoCopyrightRcmd {
    type: number
    typeDesc: string
    songId?: any
  }

  export interface Pc {
    nickname: string
    uid: number
    cid: string
    fn: string
    ar: string
    sn: string
    alb: string
    version: number
    br: number
  }

  export interface Track {
    name: string
    id: number
    pst: number
    t: number
    ar: Ar[]
    alia: string[]
    pop: number
    st: number
    rt: string
    fee: number
    v: number
    crbt?: any
    cf: string
    al: Al
    dt: number
    h: H
    m: M
    l: L
    a?: any
    cd: string
    no: number
    rtUrl?: any
    ftype: number
    rtUrls: any[]
    djId: number
    copyright: number
    s_id: number
    mark: any
    originCoverType: number
    noCopyrightRcmd: NoCopyrightRcmd
    rtype: number
    rurl?: any
    mst: number
    cp: number
    mv: number
    publishTime: any
    pc: Pc
    tns: string[]
  }

  export interface TrackId {
    id: number
    v: number
    alg?: any
  }

  export interface Playlist {
    subscribers: any[]
    subscribed: boolean
    creator: Creator
    tracks: Track[]
    trackIds: TrackId[]
    updateFrequency?: any
    backgroundCoverId: number
    backgroundCoverUrl?: any
    titleImage: number
    titleImageUrl?: any
    englishTitle?: any
    opRecommend: boolean
    description?: any
    ordered: boolean
    createTime: number
    highQuality: boolean
    userId: number
    tags: any[]
    updateTime: number
    coverImgId: number
    coverImgUrl: string
    newImported: boolean
    specialType: number
    trackCount: number
    commentThreadId: string
    privacy: number
    trackUpdateTime: number
    playCount: number
    trackNumberUpdateTime: number
    adType: number
    status: number
    subscribedCount: number
    cloudTrackCount: number
    name: string
    id: number
    shareCount: number
    coverImgId_str: string
    commentCount: number
  }

  export interface Playlist {
    playlist: Playlist
  }
}
