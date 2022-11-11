import Dexie, { Table } from 'dexie';

export class MySubClassedDexie extends Dexie {
  videoItem!: Table<VieoItemResDataDbObj>; 
  videoDetails!: Table<VideoDetailsDataDbObj>;
  historyList!: Table<HistoryDbListType>;
  historyVideo!: Table<HistoryDbVideoType>;
  historySearch!: Table<HistoryDbSearchType>;

  constructor() {
    super('myDatabase');
    this.version(4).stores({
        videoItem: 'videoId',
        videoDetails: "listId",
        historyList: 'id, title',
        historyVideo: "id, title, owner",
        historySearch: "query"
    });
  }
}

export const dataDb = new MySubClassedDexie();
