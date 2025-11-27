/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
'use client';
import { Layout, DynamicCard } from '@shared-lib';
import { useRouter } from 'next/navigation';
import { readHomeListForm } from '../../services/LoginService';
import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import AppConst from '../../utils/AppConst/AppConst';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUserDataFromLocal, navigateToMitraURL } from '../../utils/Helper';
import {
  ContentLoader,
  FullPageLoaderWithLayout,
} from '../../Components/FullPageLoader';
export default function Home() {
  // Constants
  const basePath = AppConst?.BASEPATH;
  const router = useRouter();

  // State Management
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardData, setCardData] = useState([]);

  // Effects
  useEffect(() => {
    initializeHomePage();
  }, [router]);

  const initializeHomePage = async () => {
    if (!isUserAuthenticated()) {
      handleUnauthenticatedUser();
      const accToken = localStorage.getItem(AppConst.STORAGE_KEYS.ACCESS_TOKEN);
      if (!accToken) {
        router.replace(AppConst.NAVIGATION.REDIRECTING);
      }
      return;
    }

    try {
      setLoadingStates(true);
      await fetchAndSetHomeData();
    } catch (err) {
      handleHomePageError(err);
    } finally {
      handleLoadingCompletion();
    }
  };

  const isUserAuthenticated = () => {
    return !!localStorage.getItem(AppConst.STORAGE_KEYS.ACCESS_TOKEN);
  };

  const handleUnauthenticatedUser = () => {
    clearAllCookies();
    router.replace(AppConst.NAVIGATION.HOME);
  };

  const setLoadingStates = (isLoading: boolean) => {
    setPageLoading(isLoading);
    setLoading(isLoading);
  };

  const fetchAndSetHomeData = async () => {
    const cachedHomeData = getCachedHomeData();
    if (cachedHomeData) {
      setCardData(cachedHomeData);
      console.log('Using cached home data from localStorage');
    } else {
      const homeData = await fetchHomeData();
      if (homeData) {
        setCardData(homeData);
        cacheHomeData(homeData);
      } else {
        throw new Error(AppConst.ERROR_MESSAGES.HOME_DATA_LOAD_FAILED);
      }
    }
  };

  const getCachedHomeData = () => {
    try {
      const cachedData = localStorage.getItem(AppConst.STORAGE_KEYS.HOME_DATA);
      if (!cachedData) {
        return null;
      }
      const parsedData = JSON.parse(cachedData);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      }
      return null;
    } catch (error) {
      console.error('Error reading cached home data:', error);
      return null;
    }
  };

  const handleHomePageError = (error: any) => {
    setError(AppConst.ERROR_MESSAGES.HOME_DATA_LOAD_FAILED);
    console.error('Home page initialization error:', error);
  };

  const handleLoadingCompletion = () => {
    const hasCachedData = getCachedHomeData();
    const contentDelay = hasCachedData
      ? AppConst.UI.LOADING_DELAY.CACHED_CONTENT
      : AppConst.UI.LOADING_DELAY.FRESH_CONTENT;
    const pageDelay = hasCachedData
      ? AppConst.UI.LOADING_DELAY.CACHED_PAGE
      : AppConst.UI.LOADING_DELAY.FRESH_PAGE;

    setTimeout(() => setLoading(false), contentDelay);
    setTimeout(() => setPageLoading(false), pageDelay);
  };

  const fetchHomeData = async () => {
    try {
      validateOrganizationHeader();
      const token = getAuthToken();
      const data = await readHomeListForm(token);

      return data?.result || [];
    } catch (err) {
      console.error('Error fetching home data:', err);
      throw err;
    }
  };

  const validateOrganizationHeader = () => {
    const header = JSON.parse(
      localStorage.getItem(AppConst.STORAGE_KEYS.HEADERS) || '{}'
    );
    if (!header['org-id']) {
      throw new Error(AppConst.ERROR_MESSAGES.ORG_ID_MISSING);
    }
  };

  const getAuthToken = () => {
    const token = localStorage.getItem(AppConst.STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      throw new Error(AppConst.ERROR_MESSAGES.AUTH_TOKEN_MISSING);
    }
    return token;
  };

  const cacheHomeData = (homeData: any[]) => {
    if (homeData?.length > 0) {
      localStorage.setItem(
        AppConst.STORAGE_KEYS.HOME_DATA,
        JSON.stringify(homeData)
      );
      localStorage.setItem(
        AppConst.STORAGE_KEYS.THEME,
        JSON.stringify(homeData[1]?.meta?.theme || {})
      );
    }
  };

  const handleCardClick = (card: any) => {
    if (card.sameOrigin) {
      navigateToSameOrigin(card.url);
    } else {
      navigateToExternal(card.url, card.title);
    }
  };

  const navigateToSameOrigin = (url: string) => {
    router.push(url);
  };

  const navigateToExternal = (url: string, title?: string) => {
    if (title === 'MITRA') {
      navigateToMitraURL(url);
    } else {
      navigateToGenericExternal(url);
    }
  };

  const navigateToGenericExternal = async (url: string) => {
    if (!isValidUrl(url)) {
      console.error(AppConst.ERROR_MESSAGES.INVALID_URL);
      return;
    }
    try {
      // Call backend to get short-lived redirect token
      const response = await fetch(AppConst.API_ENDPOINTS.REDIRECT_TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetUrl: url }),
      });

      if (response.ok) {
        const { redirectToken } = await response.json();
        const urlObj = new URL(url);
        urlObj.searchParams.set('token', redirectToken);
        window.location.href = urlObj.toString();
      } else {
        // Fallback: redirect without token
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error getting redirect token:', error);
      window.location.href = url;
    }
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleAccountClick = () => {
    router.push(AppConst.NAVIGATION.PROFILE);
  };

  const handleLogoutConfirm = () => {
    clearUserData();
    router.push(AppConst.NAVIGATION.LOGIN);
  };

  const clearUserData = () => {
    localStorage.removeItem(AppConst.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.clear();
  };

  const clearAllCookies = () => {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  const getUserFirstName = () => {
    return getUserDataFromLocal('firstname');
  };

  const getEnabledCards = () => {
    return cardData.filter((card) => card.enabled === true);
  };

  const renderWelcomeSection = () => (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography
        variant="h5"
        color={AppConst.UI.COLORS.PRIMARY}
        fontWeight="bold"
        fontSize={{ xs: '22px', sm: '24px', md: '26px' }}
      >
        Welcome, {getUserFirstName()}
      </Typography>
    </Box>
  );

  const renderCard = (card: any, index: number) => (
    <DynamicCard
      key={index}
      title={card.meta.title}
      icon={card.meta.icon}
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
        maxWidth: { xs: 280, sm: 350 },
      }}
      onClick={() => handleCardClick(card.meta)}
    />
  );

  const renderCardsGrid = () => {
    const enabledCards = getEnabledCards();

    if (enabledCards.length === 0) {
      return (
        <Typography
          textAlign="center"
          color={AppConst.UI.COLORS.TEXT_SECONDARY}
        >
          No enabled cards available
        </Typography>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {enabledCards.map((card, index) => renderCard(card, index))}
      </Box>
    );
  };

  const renderMainContent = () => (
    <>
      {renderWelcomeSection()}
      {renderCardsGrid()}
    </>
  );

  const renderProfileIcon = () => (
    <Box
      sx={{
        position: 'fixed',
        top: 10,
        right: 20,
        zIndex: 2000,
        backgroundColor: 'transparent',
        borderRadius: '50%',
      }}
    >
      <AccountCircleIcon
        sx={{
          fontSize: 36,
          color: AppConst.UI.COLORS.PRIMARY,
          cursor: 'pointer',
        }}
        onClick={handleAccountClick}
      />
    </Box>
  );

  // ==================== MAIN RENDER ====================

  if (pageLoading) {
    return <FullPageLoaderWithLayout />;
  }

  return (
    <>
      <Layout
        showTopAppBar={{
          title: 'Home',
          showMenuIcon: true,
          showBackIcon: false,
        }}
        isFooter={true}
        showLogo={true}
        showBack={true}
      >
        {renderProfileIcon()}
        <Box
          sx={{
            minHeight: '100vh',
            marginTop: { xs: '30px', sm: '90px' },
            marginBottom: { xs: '60px', sm: '90px' },
            paddingX: { xs: 2, sm: 3 },
          }}
        >
          {loading ? <ContentLoader /> : renderMainContent()}
        </Box>
      </Layout>
    </>
  );
}
