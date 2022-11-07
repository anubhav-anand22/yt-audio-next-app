import Dexie, { Table } from 'dexie';

export class MySubClassedDexie extends Dexie {
  videoItem!: Table<VieoItemResDataDbObj>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
        videoItem: 'videoId'
    });
  }
}

export const dataDb = new MySubClassedDexie();
