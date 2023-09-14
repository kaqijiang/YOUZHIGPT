import React, { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react';
import { PageTypeEnum } from '@/constants/user';
import { useGlobalStore } from '@/store/global';
import type { ResLogin } from '@/api/response/user';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/user';
import { useChatStore } from '@/store/chat';
import LoginForm from './components/LoginForm';
import dynamic from 'next/dynamic';
import { serviceSideProps } from '@/utils/i18n';
import { setToken } from '@/utils/user';
import { feConfigs } from '@/store/static';
import CommunityModal from '@/components/CommunityModal';
import Script from 'next/script';
const RegisterForm = dynamic(() => import('./components/RegisterForm'));
const ForgetPasswordForm = dynamic(() => import('./components/ForgetPasswordForm'));

const Login = () => {
  const router = useRouter();
  const { lastRoute = '' } = router.query as { lastRoute: string };
  const { isPc } = useGlobalStore();
  const [pageType, setPageType] = useState<`${PageTypeEnum}`>(PageTypeEnum.login);
  const { setUserInfo } = useUserStore();
  const { setLastChatId, setLastChatAppId } = useChatStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const contactMe = () => {
    window.open('https://bento.me/aijie', '_blank');
  };
  const loginSuccess = useCallback(
    (res: ResLogin) => {
      // init store
      setLastChatId('');
      setLastChatAppId('');

      setUserInfo(res.user);
      setToken(res.token);
      setTimeout(() => {
        router.push(lastRoute ? decodeURIComponent(lastRoute) : '/app/list');
      }, 100);
    },
    [lastRoute, router, setLastChatId, setLastChatAppId, setUserInfo]
  );

  function DynamicComponent({ type }: { type: `${PageTypeEnum}` }) {
    const TypeMap = {
      [PageTypeEnum.login]: LoginForm,
      [PageTypeEnum.register]: RegisterForm,
      [PageTypeEnum.forgetPassword]: ForgetPasswordForm
    };

    const Component = TypeMap[type];

    return <Component setPageType={setPageType} loginSuccess={loginSuccess} />;
  }

  return (
    <>
      {feConfigs.googleClientVerKey && (
        <Script
          src={`https://www.recaptcha.net/recaptcha/api.js?render=${feConfigs.googleClientVerKey}`}
        ></Script>
      )}
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        className={styles.loginPage}
        h={'100%'}
        px={[0, '10vw']}
      >
        <Flex
          height="100%"
          w={'100%'}
          maxW={'1240px'}
          maxH={['auto', 'max(660px,80vh)']}
          backgroundColor={'#fff'}
          alignItems={'center'}
          justifyContent={'center'}
          py={[5, 10]}
          px={'5vw'}
          borderRadius={isPc ? 'md' : 'none'}
          gap={5}
        >
          {isPc && (
            <Box
              order={pageType === PageTypeEnum.login ? 0 : 2}
              flex={'1 0 0'}
              w="0"
              style={{ paddingTop: pageType === PageTypeEnum.login ? '80px' : '0px' }}
              maxW={'600px'}
              height={'100%'}
              maxH={'450px'}

            >
              <DynamicComponent type={pageType} />
            </Box>
          )}

          <Box
            position={'relative'}
            order={1}
            flex={`0 0 ${isPc ? '400px' : '100%'}`}
            height={'100%'}
            border="1px"
            borderColor="gray.200"
            py={5}
            px={10}
            borderRadius={isPc ? 'md' : 'none'}
          >
            {isPc ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '10px', fontWeight: 'bold' }}>有知-YOUZHI</h2>
                <p style={{ fontSize: '18px', marginBottom: '10px', color: '#2563EB', fontWeight: 'bold' }}>一个个性化知识库/智能客服平台</p>
                <p style={{ fontSize: '16px', marginBottom: '5px', color: '#3B82F6' }}>打造知识星球</p>
                <p style={{ fontSize: '16px', marginBottom: '5px', color: '#3B82F6' }}>存储个人知识</p>
                <p style={{ fontSize: '16px', marginBottom: '10px', color: '#3B82F6' }}>随时检索利用</p>
                <p style={{ fontSize: '16px', marginBottom: '10px', color: '#3B82F6' }}>利用强大的GPT+大模型，让你的知识库更智能、丰富。</p>
                <p style={{ fontSize: '20px', marginBottom: '5px' }}>传统训练知识库：</p>
                <span style={{ textDecoration: 'line-through', fontSize: '14px', marginBottom: '15px', color: '#9CA3AF' }}>1.数据收集、2.数据预处理、3.数据标注、4.模型选择、5.模型训练、6.模型评估、7.模型优化、8.模型部署、9.网站搭建、10.数据推理/使用</span>
                <p style={{ fontSize: '20px', marginTop: '15px', fontWeight: 'bold', color: '#2563EB' }}>用有知，直接上手使用。</p>
              </div>
            ) : (
              <DynamicComponent type={pageType} />
            )
            }

            {feConfigs?.show_contact && (
              <Box
                fontSize={'sm'}
                color={'myGray.600'}
                cursor={'pointer'}
                position={'absolute'}
                right={5}
                bottom={3}
                onClick={contactMe}
              >
                无法注册/登录，点击联系
              </Box>
            )}
          </Box>
        </Flex>

        {/* {isOpen && <CommunityModal onClose={onClose} />} */}
      </Flex>
    </>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: { ...(await serviceSideProps(context)) }
  };
}

export default Login;
