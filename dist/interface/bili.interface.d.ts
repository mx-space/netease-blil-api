export declare namespace BiliBili {
    interface Rights {
        is_selection: number;
        selection_style: number;
        allow_review?: number;
        allow_bp?: number;
    }
    interface Stat {
        follow: number;
        view: number;
        danmaku: number;
        reply: number;
        coin: number;
        series_follow: number;
        series_view: number;
    }
    interface NewEp {
        index_show: string;
        id?: number;
        cover: string;
        title: string;
        long_title: string;
        pub_time: string;
        duration?: number;
    }
    interface Area {
        id: number;
        name: string;
    }
    interface Series {
        series_id: number;
        title: string;
        season_count: number;
        new_season_id: number;
    }
    interface Publish {
        pub_time: string;
        pub_time_show: string;
        release_date: string;
        release_date_show: string;
    }
    interface Section {
        section_id: number;
        season_id: number;
        limit_group: number;
        watch_platform: number;
        copyright: string;
        ban_area_show: number;
        type?: number;
        title: string;
    }
    interface Rating {
        score: number;
        count: number;
    }
    interface BadgeInfo {
        text: string;
        bg_color: string;
        bg_color_night: string;
    }
    interface List {
        season_id: number;
        media_id: number;
        season_type: number;
        season_type_name: string;
        title: string;
        cover: string;
        total_count: number;
        is_finish: number;
        is_started: number;
        is_play: number;
        badge: string;
        badge_type: number;
        rights: Rights;
        stat: Stat;
        new_ep: NewEp;
        square_cover: string;
        season_status: number;
        season_title: string;
        badge_ep: string;
        media_attr: number;
        season_attr: number;
        evaluate: string;
        areas: Area[];
        subtitle: string;
        first_ep: number;
        can_watch: number;
        series: Series;
        publish: Publish;
        mode: number;
        section: Section[];
        url: string;
        follow_status: number;
        is_new: number;
        progress: string;
        both_follow: boolean;
        rating: Rating;
        badge_info: BadgeInfo;
        release_date_show: string;
    }
    interface Data {
        list: List[];
        pn: number;
        ps: number;
        total: number;
    }
    interface UserBangumi {
        code: number;
        message: string;
        ttl: number;
        data: Data;
    }
}
export declare namespace BiliSearch {
    interface Vlist {
        comment: number;
        typeid: number;
        play: number;
        pic: string;
        subtitle: string;
        description: string;
        copyright: string;
        title: string;
        review: number;
        author: string;
        mid: number;
        created: number;
        length: string;
        video_review: number;
        aid: number;
        bvid: string;
        hide_click: boolean;
        is_pay: number;
        is_union_video: number;
    }
    interface List {
        vlist: Vlist[];
    }
    interface Page {
        count: number;
        pn: number;
        ps: number;
    }
    interface Data {
        list: List;
        page: Page;
    }
    interface SearchResult {
        code: number;
        message: string;
        ttl: number;
        data: Data;
    }
}
