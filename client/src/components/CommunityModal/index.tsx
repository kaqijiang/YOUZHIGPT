import React from 'react';
import { Button, ModalFooter, ModalBody } from '@chakra-ui/react';
import MyModal from '../MyModal';
import { useTranslation } from 'react-i18next';
import Markdown from '../Markdown';

const md = `
| 小助手 |
| -------------------- |
`;

const CommunityModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <MyModal isOpen={true} onClose={onClose} title={t('home.Community')}>
      <ModalBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} textAlign={'center'}>
        <Markdown source={md} />
      </ModalBody>

      <ModalFooter>
        <Button variant={'base'} onClick={onClose}>
          关闭
        </Button>
      </ModalFooter>
    </MyModal>
  );
};

export default CommunityModal;
