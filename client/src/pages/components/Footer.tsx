import React, { useMemo } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { feConfigs } from '@/store/static';
import { useTranslation } from 'react-i18next';
import Avatar from '@/components/Avatar';
import { useRouter } from 'next/router';

const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const list = useMemo(
    () => [
      {
        label: t('home.Footer Product'),
        child: [
          {
            label: t('home.Footer YOUZHI Cloud', { title: feConfigs.systemTitle }),
            onClick: () => {
              router.push('/app/list');
            }
          },
          {
            label: 'API中转',
            onClick: () => {
              window.open('https://api.youzhi.chat', '_blank');
            }
          }
        ]
      },
      {
        label: t('home.Footer Developer'),
        child: [
          {
            label: t('home.Footer Git'),
            onClick: () => {
              window.open('https://github.com/kaqijiang/YOUZHIGPT', '_blank');
            }
          }
        ]
      }
    ],
    [onOpen, t]
  );

  return (
    <Box
      display={['block', 'flex']}
      px={[5, 0]}
      maxW={'1200px'}
      m={'auto'}
      py={['30px', '60px']}
      flexWrap={'wrap'}
    >
      <Box flex={1}>
        <Flex alignItems={'center'}>
          <Box
            className="textlg"
            fontSize={['xl', '2xl']}
            fontWeight={'bold'}
            fontStyle={'italic'}
          >
            {feConfigs?.systemTitle}
          </Box>
        </Flex>
        <Box mt={5} fontSize={'sm'} color={'myGray.600'} maxW={'380px'} textAlign={'justify'}>
          {t('home.YOUZHI Desc', { title: feConfigs.systemTitle })}
        </Box>
      </Box>
      {list.map((item) => (
        <Box key={item.label} w={'200px'} mt={[5, 0]}>
          <Box color={'myGray.500'}>{item.label}</Box>
          {item.child.map((child) => (
            <Box
              key={child.label}
              mt={[2, 3]}
              cursor={'pointer'}
              _hover={{ textDecoration: 'underline' }}
              onClick={child.onClick}
            >
              {child.label}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Footer;
