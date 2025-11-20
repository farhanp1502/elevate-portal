/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
'use client';
import { Layout, DynamicCard } from '@shared-lib';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { fetchProfileData } from '../../services/ProfileService';
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

export default function Home() {
  const basePath = AppConst?.BASEPATH;
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useRouter();
  useEffect(() => {
    const initializeHomePage = async () => {
      const accToken = localStorage.getItem('accToken');
      if (!accToken) {
        // Clear all cookies
        document.cookie.split(';').forEach((cookie) => {
          const name = cookie.split('=')[0].trim();
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        router.replace('/');
        return;
      }

      try {
        setPageLoading(true); // Show page loader
        setLoading(true); // Show content loader

        // Fetch profile data and home data in parallel for better performance
        const [profileResponse, homeDataResponse] = await Promise.allSettled([
          fetchProfileDataWrapper(),
          fetchHomeData(),
        ]);

        // Handle profile data
        if (profileResponse.status === 'fulfilled') {
          // Profile data fetched successfully
        } else {
          console.error('Profile data fetch failed:', profileResponse.reason);
        }

        // Handle home data
        if (homeDataResponse.status === 'fulfilled') {
          setCardData(homeDataResponse.value || []);
        } else {
          setError('Failed to load home data');
          console.error('Home data fetch failed:', homeDataResponse.reason);
        }
      } catch (err) {
        setError('Failed to initialize home page');
        console.error('Home page initialization error:', err);
      } finally {
        // Stagger the loading states for better UX
        setTimeout(() => {
          setLoading(false); // Hide content loader first
        }, 500);

        setTimeout(() => {
          setPageLoading(false); // Hide page loader after content is ready
        }, 800);
      }
    };

    initializeHomePage();
  }, [router]);
  // Separate function for profile data fetching
  const fetchProfileDataWrapper = async () => {
    try {
      const token = localStorage.getItem('accToken') || '';
      const userId = localStorage.getItem('userId') || '';
      // Add your profile data fetching logic here
      // const profileData = await fetchProfileData(token, userId);
      // setProfileData(profileData);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw error;
    }
  };

  const fetchHomeData = async () => {
    try {
      const header = JSON.parse(localStorage.getItem('headers') || '{}');
      const token = localStorage.getItem('accToken');

      if (!header['org-id']) {
        throw new Error('Organization ID not found');
      }

      const data = await readHomeListForm(token);

      // Cache the data in localStorage
      if (data?.result) {
        localStorage.setItem('HomeData', JSON.stringify(data.result));
        localStorage.setItem(
          'theme',
          JSON.stringify(data.result[1]?.meta?.theme || {})
        );
        return data.result;
      }

      return [];
    } catch (err) {
      console.error('Error fetching home data:', err);
      throw err;
    }
  };

  const handleAccountClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('accToken');
    localStorage.clear();
    router.push(`/login`);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleCardClick = (card) => {
    // router.push(`${card.url}`);
    buildProgramUrl(card.url, card.sameOrigin, card.title);
  };

  const buildProgramUrl = (
    path: string,
    sameOrigin: boolean,
    title?: string
  ): string => {
    if (sameOrigin) {
      router.push(`${path}`);
    } else {
      if (title == 'MITRA') {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const encodedUrl = encodeURIComponent(url.toString());
        const accessToken = localStorage.getItem('accToken');
        window.location.href = `${path}${accessToken}&rerouteUrl=${encodedUrl}`;
      }
      window.location.href = path + localStorage.getItem('accToken');
    }
  };
  // Show full page loader during initial load
  if (pageLoading) {
    return (
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
            gap: 3,
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: '#582E92',
              animationDuration: '0.8s',
            }}
          />
          <Typography
            variant="h6"
            color="#582E92"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Loading...
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            Please wait while we prepare your dashboard
          </Typography>
        </Box>
      </Layout>
    );
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
            sx={{ fontSize: 36, color: '#582E92', cursor: 'pointer' }}
            onClick={() => router.push('/profile')}
          />
        </Box>
        <Box
          sx={{
            minHeight: '100vh',
            marginTop: { xs: '30px', sm: '90px' },
            marginBottom: { xs: '60px', sm: '90px' },
            paddingX: { xs: 2, sm: 3 },
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
              }}
            >
              {cardData.length > 0 &&
                cardData.map((card, index) =>
                  card.enabled == true ? (
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
                  ) : null
                )}
            </Box>
          ) : (
            <>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h5"
                  color="#582E92"
                  fontWeight="bold"
                  fontSize={{ xs: '22px', sm: '24px', md: '26px' }}
                >
                  Welcome, {localStorage.getItem('firstname')}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {cardData.length > 0 &&
                  cardData.map((card, index) =>
                    card.enabled == true ? (
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
                    ) : null
                  )}
              </Box>
            </>
          )}
        </Box>
      </Layout>

      {/* Logout Confirmation Popup */}
      <Dialog open={showLogoutModal} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            No
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary">
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
