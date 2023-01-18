import Dexie, { Table } from "dexie";

export class MySubClassedDexie extends Dexie {
  videoItem!: Table<VieoItemResDataDbObj>;
  videoDetails!: Table<VideoDetailsDataDbObj>;
  historyList!: Table<HistoryDbListType>;
  historyVideo!: Table<HistoryDbVideoType>;
  historySearch!: Table<HistoryDbSearchType>;
  favVideo!: Table<FavDbVideoType>;
  favList!: Table<FavDbListType>;

  constructor() {
    super("myDatabase");
    this.version(7).stores({
      videoItem: "videoId",
      videoDetails: "listId",
      historyList: "id, title",
      historyVideo: "id, title, owner",
      historySearch: "query",
      favVideo: "id",
      favList: "id",
    });
  }
}

export const dataDb = new MySubClassedDexie();
