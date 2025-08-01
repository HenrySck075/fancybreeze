import type { Spread } from "./objmerger";

interface APIResponseBase {
  batchcomplete: boolean;
}

export type APIResponse<A extends readonly [...any]> = Spread<[APIResponseBase, ...A]>;




/// we might need all of these
interface UserOptions {
  [key: string]: string | number | boolean;
  math: string;
  "math-popups": string;
  "visualeditor-autodisable": number;
  "visualeditor-betatempdisable": number;
  "visualeditor-collab": number;
  "visualeditor-editor": string;
  "visualeditor-enable": number;
  "visualeditor-hidebetawelcome": number;
  "visualeditor-hidetabdialog": number;
  "visualeditor-newwikitext": number;
  "visualeditor-tabs": string;
  "usebetatoolbar": boolean;
  "wikieditor-realtimepreview": number;
  "usecodeeditor": number;
  "usecodemirror": number;
  "usecodemirror-colorblind": number;
  "codemirror-preferences": string;
  "mobile-editor": string;
  "reverb-email-frequency": number;
  "echo-subscriptions-web-edit-thank": boolean;
  "echo-subscriptions-email-edit-thank": boolean;
  "disablesuggest": number;
  "editfont": string;
  "editsection": number;
  "enotifdiscussionsfollows": number;
  "enotifdiscussionsvotes": number;
  "enotifdiscussionsmentions": number;
  "enotifminoredits": number;
  "enotifthanks": number;
  "enotifwallthread": number;
  "extendwatchlist": number;
  "externaldiff": number;
  "externaleditor": number;
  "global-keyboard-shortcuts": number;
  "highlightbroken": number;
  "htmlemails": number;
  "justify": number;
  "nocache": number;
  "noconvertlink": number;
  "onsite-thanks": number;
  "quickbar": number;
  "rememberpassword": number;
  "reverb-user-interest-email-thanks": number;
  "reverb-user-interest-web-thanks": number;
  "searchlimit": number;
  "showjumplinks": number;
  "showtoc": number;
  "showtoolbar": number;
  "thumbsize": number;
  "walldelete": number;
  "wallshowsource": number;
  "watchdeletion": number;
  "watchlistdays": number;
  "watchlistdigest": number;
  "watchuploads": number;
  "ccmeonemails": number;
  "date": string;
  "diffonly": number;
  "diff-type": string;
  "disablemail": number;
  "editondblclick": number;
  "editrecovery": number;
  "editsectiononrightclick": number;
  "email-allow-new-users": number;
  "enotifrevealaddr": number;
  "enotifusertalkpages": number;
  "enotifwatchlistpages": number;
  "fancysig": number;
  "forceeditsummary": number;
  "forcesafemode": number;
  "gender": string;
  "hidecategorization": number;
  "hideminor": number;
  "hidepatrolled": number;
  "imagesize": number;
  "minordefault": number;
  "newpageshidepatrolled": number;
  "nickname": string;
  "norollbackdiff": number;
  "prefershttps": number;
  "previewonfirst": number;
  "previewontop": number;
  "pst-cssjs": number;
  "rcdays": number;
  "rcenhancedfilters-disable": number;
  "rclimit": number;
  "requireemail": number;
  "search-match-redirect": boolean;
  "search-special-page": string;
  "search-thumbnail-extra-namespaces": boolean;
  "showhiddencats": number;
  "shownumberswatching": number;
  "showrollbackconfirmation": number;
  "skin": string;
  "skin-responsive": number;
  "underline": number;
  "useeditwarning": number;
  "uselivepreview": number;
  "usenewrc": number;
  "watchcreations": number;
  "watchdefault": number;
  "watchlisthideanons": number;
  "watchlisthidebots": number;
  "watchlisthidecategorization": number;
  "watchlisthideliu": number;
  "watchlisthideminor": number;
  "watchlisthideown": number;
  "watchlisthidepatrolled": number;
  "watchlistreloadautomatically": number;
  "watchlistunwatchlinks": number;
  "watchmoves": number;
  "watchrollback": number;
  "wlenhancedfilters-disable": number;
  "wllimit": number;
  "timecorrection": string;
  "language": string;
  "variant": string;
  "variant-ban": string;
  "variant-en": string;
  "variant-crh": string;
  "variant-gan": string;
  "variant-iu": string;
  "variant-ku": string;
  "variant-mni": string;
  "variant-sh": string;
  "variant-shi": string;
  "variant-sr": string;
  "variant-tg": string;
  "variant-tly": string;
  "variant-uz": string;
  "variant-wuu": string;
  "variant-zgh": string;
  "variant-zh": string;
  "searchNs0": number;
  "searchNs1": number;
  "searchNs2": number;
  "searchNs3": number;
  "searchNs4": number;
  "searchNs5": number;
  "searchNs6": number;
  "searchNs7": number;
  "searchNs8": number;
  "searchNs9": number;
  "searchNs10": number;
  "searchNs11": number;
  "searchNs12": number;
  "searchNs13": number;
  "searchNs14": number;
  "searchNs15": number;
  "searchNs110": number;
  "searchNs111": number;
  "searchNs420": number;
  "searchNs421": number;
  "searchNs500": number;
  "searchNs501": number;
  "searchNs502": number;
  "searchNs503": number;
  "searchNs828": number;
  "searchNs829": number;
  "searchNs1200": number;
  "searchNs1201": number;
  "searchNs1202": number;
  "searchNs2000": number;
  "searchNs2001": number;
  "searchNs2002": number;
  "searchNs2900": number;
  "searchNs2901": number;
  "popups-reference-previews": string;
  "visualeditor-hidesourceswitchpopup": number;
  "visualeditor-hidevisualswitchpopup": number;
  "showAds": number;
  "enableGoSearch": boolean;
  "mf_amc_optin": number;
  "category-page-layout": string;
  "nav-collapsed": string;
  "rcfilters-limit": string;
  "avatar": string;
  "bio": string;
  "discordHandle": string;
  "fbPage": string;
  "name": string;
  "twitter": string;
  "website": string;
  "username": string;
  "editor": string;
  "editortype": string;
  "rcfilters-rc-collapsed": number;
  "rcfilters-saved-queries": string;
  "rightrailvisible": string;
  "theme": string;
  "userlandingpage": string;
}

interface UserInfoObj {
  id: number;
  name: string;
  options?: UserOptions;
}

export type Query_UserInfo = ({ userinfo: UserInfoObj });

export type Query_AllUsers = ({
  allusers: {
    userid: number;
    name: string;
  }[]
})

export type Query_OPage<A extends readonly [...object] = []> = Spread<[{
  /// base response
  pageid: number,
  ns: number,
  title: string,
}, ...A]>
export type Query_Pages<A extends readonly [...object] = []> = ({
  pages: Query_OPage<A>[]
})

export type Query_Pages_PInfo = ({
  contentmodel: string,
  pagelanguage: string,
  pagelanguagehtmlcode: string,
  pagelanguagedir: string,
  touched: string,
  lastrevid: number,
  length: number
})

export type Query_Pages_PPageImages<A extends readonly [...QPPPIProp] = [Query_Pages_PPageImages_name, Query_Pages_PPageImages_thumbnail]> = Spread<A>;
interface QPPPIProp {};
export interface Query_Pages_PPageImages_name extends QPPPIProp{pageimage: string};
interface PageImage_Info {
  source: string,
  width: number,
  height: number
}
export interface Query_Pages_PPageImages_thumbnail extends QPPPIProp{thumbnail: PageImage_Info};
export interface Query_Pages_PPageImages_original extends QPPPIProp{original: PageImage_Info};

export interface Query_ONamespace {
  id: number,
  case: string,
  name: string,
  subpages: boolean,
  canonical: string,
  content: boolean,
  nonincludable: boolean
}
export type Query_MSiteInfo_namespace = ({namespaces: Record<string, Query_ONamespace>});
export type Query_Pages_PArticleSnippet = ({extract: string});
export type Query_LAllPages = ({
  allpages: Query_OPage[]
})

export type Query<A extends readonly [...any]> = ({ query: Spread<A> });








export type Parse_PDisplayTitle = ({displaytitle: string});




export type Parse_Obj = ({title: string; pageid: number});
export type Parse<A extends readonly [...any]> = ({ parse: Spread<[Parse_Obj, ...A]> });