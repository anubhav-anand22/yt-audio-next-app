import Dexie, { Table } from 'dexie';

export class MySubClassedDexie extends Dexie {
  videoItem!: Table<VieoItemResDataDbObj>; 
  videoDetails!: Table<VideoDetailsDataDbObj>;

  constructor() {
    super('myDatabase');
    this.version(2).stores({
        videoItem: 'videoId',
        videoDetails: "listId"
    });
  }
}

export const dataDb = new MySubClassedDexie();
