interface GStateType {
    isLoading: {value: boolean, message: string};
    notification: NotificationSliceType[];
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
    view_count: number;
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

interface VideoDetailsMedia {
}

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