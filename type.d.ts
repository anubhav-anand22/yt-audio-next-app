interface GStateType {
  isLoading: { value: boolean; message: string };
  notification: NotificationSliceType[];
  setting: DefaultSetting;
}

interface NotificationSliceType {
  id: string;
  title: string;
  message: string;
  type: "normal" | "danger";
}

interface ThumbnailsType {
  height: number;
  url: string;
  width: number;
}

interface vItemType {
  title: string;
  thumbnails: ThumbnailsType[];
  view_count: string;
  length_seconds: number;
  id: string;
}

interface VideoDetailsEmbed {
  iframeUrl: string;
  flashUrl: string;
  width: number;
  height: number;
  flashSecureUrl: string;
}

interface VideoDetailsThumbnail {
  url: string;
  width: number;
  height: number;
}

interface VideoDetailsAuthor {
  id: string;
  name: string;
  user: string;
  channel_url: string;
  external_channel_url: string;
  user_url: string;
  thumbnails: VideoDetailsThumbnail[];
  verified: boolean;
  subscriber_count: number;
}

interface VideoDetailsMedia {}

interface VideoDetailsStoryboard {
  templateUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailCount: number;
  interval: number;
  columns: number;
  rows: number;
  storyboardCount: number;
}

interface VideoDetailsThumbnail2 {
  url: string;
  width: number;
  height: number;
}

interface VideoDetailsType {
  embed: VideoDetailsEmbed;
  title: string;
  description: string;
  lengthSeconds: string;
  ownerProfileUrl: string;
  externalChannelId: string;
  isFamilySafe: boolean;
  availableCountries: string[];
  isUnlisted: boolean;
  hasYpcMetadata: boolean;
  viewCount: string;
  category: string;
  publishDate: string;
  ownerChannelName: string;
  uploadDate: string;
  videoId: string;
  keywords: string[];
  channelId: string;
  isOwnerViewing: boolean;
  isCrawlable: boolean;
  allowRatings: boolean;
  author: VideoDetailsAuthor;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
  media: VideoDetailsMedia;
  likes?: any;
  dislikes?: any;
  age_restricted: boolean;
  video_url: string;
  storyboards: VideoDetailsStoryboard[];
  chapters: any[];
  thumbnails: VideoDetailsThumbnail2[];
  audioUrl: string;
}

interface DefaultSetting {
  isDark: boolean;
}

interface VieoItemResDataEmbed {
  iframeUrl: string;
  flashUrl: string;
  width: number;
  height: number;
  flashSecureUrl: string;
}

interface VieoItemResDataThumbnail {
  url: string;
  width: number;
  height: number;
}

interface VieoItemResDataAuthor {
  id: string;
  name: string;
  user: string;
  channel_url: string;
  external_channel_url: string;
  user_url: string;
  thumbnails: VieoItemResDataThumbnail[];
  verified: boolean;
  subscriber_count: number;
}

interface VieoItemResDataMedia {}

interface VieoItemResDataStoryboard {
  templateUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailCount: number;
  interval: number;
  columns: number;
  rows: number;
  storyboardCount: number;
}

interface VieoItemResDataThumbnail2 {
  url: string;
  width: number;
  height: number;
}

interface VieoItemResDataVideoDetails {
  embed: VieoItemResDataEmbed;
  title: string;
  description: string;
  lengthSeconds: string;
  ownerProfileUrl: string;
  externalChannelId: string;
  isFamilySafe: boolean;
  availableCountries: string[];
  isUnlisted: boolean;
  hasYpcMetadata: boolean;
  viewCount: string;
  category: string;
  publishDate: string;
  ownerChannelName: string;
  uploadDate: string;
  videoId: string;
  keywords: string[];
  channelId: string;
  isOwnerViewing: boolean;
  isCrawlable: boolean;
  allowRatings: boolean;
  author: VieoItemResDataAuthor;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
  media: VieoItemResDataMedia;
  likes?: any;
  dislikes?: any;
  age_restricted: boolean;
  video_url: string;
  storyboards: VieoItemResDataStoryboard[];
  chapters: any[];
  thumbnails: VieoItemResDataThumbnail2[];
}

interface VieoItemResDataThumbnail3 {
  url: string;
  width: number;
  height: number;
}

interface VieoItemResDataAuthor2 {
  id: string;
  name: string;
  user: string;
  channel_url: string;
  user_url: string;
  thumbnails: VieoItemResDataThumbnail3[];
  verified: boolean;
}

interface VieoItemResDataThumbnail4 {
  url: string;
  width: number;
  height: number;
}

interface VieoItemResDataRichThumbnail {
  url: string;
  width: number;
  height: number;
}

interface VieoItemResDataRelatedVideo {
  id: string;
  title: string;
  published: string;
  author: VieoItemResDataAuthor2;
  short_view_count_text: string;
  view_count: string;
  length_seconds: number;
  thumbnails: VieoItemResDataThumbnail4[];
  richThumbnails: VieoItemResDataRichThumbnail[];
  isLive: boolean;
}

interface VieoItemResDataRootObject {
  videoDetails: VieoItemResDataVideoDetails;
  related_videos?: VieoItemResDataRelatedVideo[] | undefined;
  url: string;
}

interface VieoItemResDataDbObj {
  data: VieoItemResDataRootObject;
  expires: number;
  videoId: string;
}

interface VideoDetailsDataDbObj {
  data: VieoItemResDataRootObject[];
  listId: string;
  expires: number;
  ids: string;
}

// search type start

interface SearchItemTypeRootObj {
  data: SearchItemTypeItem[];
  error: string;
}

interface SearchItemTypeItem {
  kind: string;
  etag: string;
  id: SearchItemTypeId;
  snippet: SearchItemTypeSnippet;
}

interface SearchItemTypeId {
  kind: string;
  videoId?: string;
  playlistId?: string;
}

interface SearchItemTypeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: SearchItemTypeThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface SearchItemTypeThumbnails {
  default: SearchItemTypeDefault;
  medium: SearchItemTypeMedium;
  high: SearchItemTypeHigh;
}

interface SearchItemTypeDefault {
  url: string;
  width: number;
  height: number;
}

interface SearchItemTypeMedium {
  url: string;
  width: number;
  height: number;
}

interface SearchItemTypeHigh {
  url: string;
  width: number;
  height: number;
}

interface SearchItemThumbnailItem {
  url: string;
  width: number;
  height: number;
}

type SearchItemTypetype = "video" | "playlist"

interface SearchItemTypeData {
  title: string;
    id: string;
    type: SearchItemTypetype;
    channelTitle: string;
    channelId: string;
    description: string;
    publishTime: string;
    thumbnails: {
      default: SearchItemThumbnailItem;
      medium: SearchItemThumbnailItem;
      high: SearchItemThumbnailItem;
    };
}

interface SearchItemType {
  data: SearchItemTypeData;
  onClick(type: SearchItemTypetype, id: string): void;
}

// search type end

//History Db type start
interface HistoryDbListType {
  id: string;
  title: string;
  time: number;
  thumbnail: string;
}

interface HistoryDbVideoType {
  id: string;
  title: string;
  time: number;
  thumbnail: string;
  owner: string
}

interface HistoryDbSearchType {
  query: string
  time: number
  freq: number
}
//History Db type end