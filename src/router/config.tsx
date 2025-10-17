
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Main pages - RESTORED
const HomePage = lazy(() => import('../pages/home/page'));
const BuildAWigPage = lazy(() => import('../pages/build-a-wig/page'));
const LengthSelectionPage = lazy(() => import('../pages/build-a-wig/length/page'));
const ColorSelectionPage = lazy(() => import('../pages/build-a-wig/color/page'));
const DensitySelectionPage = lazy(() => import('../pages/build-a-wig/density/page'));
const LaceSelectionPage = lazy(() => import('../pages/build-a-wig/lace/page'));
const TextureSelectionPage = lazy(() => import('../pages/build-a-wig/texture/page'));
const HairlineSelectionPage = lazy(() => import('../pages/build-a-wig/hairline/page'));
const CapSizeSelectionPage = lazy(() => import('../pages/build-a-wig/cap-size/page'));
const StylingSelectionPage = lazy(() => import('../pages/build-a-wig/styling/page'));
const AddOnsSelectionPage = lazy(() => import('../pages/build-a-wig/addons/page'));
const NoirSelectionPage = lazy(() => import('../pages/build-a-wig/units/noir/page'));
const MenuPage = lazy(() => import('../pages/menu/page'));
const ProductPage = lazy(() => import('../pages/product/page'));
const WishlistPage = lazy(() => import('../pages/wishlist/page'));
const PremiumMembershipPage = lazy(() => import('../pages/premium-membership/page'));

const NotFoundPage = lazy(() => import('../pages/NotFound'));

// Test & Demo pages - RESTORED
const LoadingTestPage = lazy(() => import('../pages/loading-test/page'));
const BuildAWigMobilePage = lazy(() => import('../pages/build-a-wig/mobile/page'));
const BuildAWigDesktopPage = lazy(() => import('../pages/build-a-wig/desktop/page'));

// Product pages

// Download Center
const DownloadCenterPage = lazy(() => import('../pages/download-center/page'));

// Coming Soon Page
const ComingSoonPage = lazy(() => import('../pages/coming-soon/page'));

// Admin pages - ALL EXIST
const AdminDashboard = lazy(() => import('../pages/admin/dashboard/page'));
const AdminOverview = lazy(() => import('../pages/admin/overview/page'));
const AdminPending = lazy(() => import('../pages/admin/pending/page'));
const AdminMeetings = lazy(() => import('../pages/admin/meetings/page'));
const AdminRevenue = lazy(() => import('../pages/admin/revenue/page'));
const AdminVisualOverview = lazy(() => import('../pages/admin/visual-overview/page'));
const AdminReviews = lazy(() => import('../pages/admin/reviews/page'));
const AdminSettings = lazy(() => import('../pages/admin/settings/page'));
const AdminPreferences = lazy(() => import('../pages/admin/preferences/page'));
const AdminBrand = lazy(() => import('../pages/admin/brand/page'));
const AdminProductEditor = lazy(() => import('../pages/admin/product-editor/page'));
const AdminClients = lazy(() => import('../pages/admin/clients/page'));
const AdminClientsAccount = lazy(() => import('../pages/admin/clients/account/page'));
const AdminDashboardComparison = lazy(() => import('../pages/admin-dashboard-comparison/page'));

import FinishedPage from '../pages/finished/page';

const routes: RouteObject[] = [
  // Main pages - UPDATED ROOT TO BUILD-A-WIG
  {
    path: '/',
    element: <BuildAWigPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/build-a-wig',  
    element: <BuildAWigPage />
  },
  {
    path: '/build-a-wig/length',
    element: <LengthSelectionPage />
  },
  {
    path: '/build-a-wig/color',
    element: <ColorSelectionPage />
  },
  {
    path: '/build-a-wig/density',
    element: <DensitySelectionPage />
  },
  {
    path: '/build-a-wig/lace',
    element: <LaceSelectionPage />
  },
  {
    path: '/build-a-wig/texture',
    element: <TextureSelectionPage />
  },
  {
    path: '/build-a-wig/hairline',
    element: <HairlineSelectionPage />
  },
  {
    path: '/build-a-wig/cap-size',
    element: <CapSizeSelectionPage />
  },
  {
    path: '/build-a-wig/styling',
    element: <StylingSelectionPage />
  },
  {
    path: '/build-a-wig/addons',
    element: <AddOnsSelectionPage />
  },
  {
    path: '/units/noir',
    element: <NoirSelectionPage />
  },
  {
    path: '/menu',
    element: <MenuPage />
  },
  {
    path: '/product',
    element: <ProductPage />
  },
  {
    path: '/wishlist',
    element: <WishlistPage />
  },
  {
    path: '/premium-membership',
    element: <PremiumMembershipPage />
  },

  // Download Center
  {
    path: '/download-center',
    element: <DownloadCenterPage />
  },

  // Coming Soon Page
  {
    path: '/coming-soon',
    element: <ComingSoonPage />
  },

  // Test & Demo pages - RESTORED
  {
    path: '/loading-test',
    element: <LoadingTestPage />
  },
  {
    path: '/build-a-wig-mobile',
    element: <BuildAWigMobilePage />
  },
  {
    path: '/build-a-wig-desktop',
    element: <BuildAWigDesktopPage />
  },

  // Product pages

  // Admin pages - WORKING ROUTES
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/admin/overview',
    element: <AdminOverview />
  },
  {
    path: '/admin/pending',
    element: <AdminPending />
  },
  {
    path: '/admin/meetings',
    element: <AdminMeetings />
  },
  {
    path: '/admin/revenue',
    element: <AdminRevenue />
  },
  {
    path: '/admin/visual-overview',
    element: <AdminVisualOverview />
  },
  {
    path: '/admin/reviews',
    element: <AdminReviews />
  },
  {
    path: '/admin/settings',
    element: <AdminSettings />
  },
  {
    path: '/admin/preferences',
    element: <AdminPreferences />
  },
  {
    path: '/admin/brand',
    element: <AdminBrand />
  },
  {
    path: '/admin/product-editor',
    element: <AdminProductEditor />
  },
  {
    path: '/admin/clients',
    element: <AdminClients />
  },
  {
    path: '/admin/clients/account',
    element: <AdminClientsAccount />  
  },
  {
    path: '/admin-dashboard-comparison',
    element: <AdminDashboardComparison />
  },
  {
    path: '/finished',
    element: <FinishedPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;
