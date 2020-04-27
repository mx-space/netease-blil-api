export namespace Song {
  export interface Ar {
    id: number;
    name: string;
    tns: any[];
    alias: any[];
  }

  export interface Al {
    id: number;
    name: string;
    picUrl: string;
    tns: any[];
    pic_str: string;
    pic: number;
  }

  export interface H {
    br: number;
    fid: number;
    size: number;
    vd: number;
  }

  export interface M {
    br: number;
    fid: number;
    size: number;
    vd: number;
  }

  export interface L {
    br: number;
    fid: number;
    size: number;
    vd: number;
  }

  export interface Privilege {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
  }

  export interface Song {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia: any[];
    pop: number;
    st: number;
    rt?: any;
    fee: number;
    v: number;
    crbt?: any;
    cf: string;
    al: Al;
    dt: number;
    h: H;
    m: M;
    l: L;
    a?: any;
    cd: string;
    no: number;
    rtUrl?: any;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    mst: number;
    cp: number;
    mv: number;
    rtype: number;
    rurl?: any;
    publishTime: number;
    privilege: Privilege;
  }
}
