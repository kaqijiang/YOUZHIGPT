import type { KbItemType } from '@/types/plugin';

export const defaultKbDetail: KbItemType = {
  _id: '',
  userId: '',
  avatar: '/icon/kbIcon.png',
  name: '',
  tags: '',
  vectorModel: {
    model: 'text-embedding-ada-002',
    name: 'Embedding-2',
    price: 0.2,
    defaultToken: 500,
    maxToken: 3000
  }
};

export enum KbTypeEnum {
  folder = 'folder',
  dataset = 'dataset'
}
export enum FileStatusEnum {
  embedding = 'embedding',
  ready = 'ready'
}

export const KbTypeMap = {
  [KbTypeEnum.folder]: {
    name: 'folder'
  },
  [KbTypeEnum.dataset]: {
    name: 'dataset'
  }
};

export const FolderAvatarSrc = '/imgs/files/folder.svg';
export const OtherFileId = 'other';
