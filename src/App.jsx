import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Applayout from './layout/Applayout';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import JobListing from './pages/JobListing';
import JobPage from './pages/JobPage';
import PostJob from './pages/PostJob';
import SavedJob from './pages/SavedJob';
import MyJobs from './pages/MyJobs';
import './App.css'
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoutes from './components/ProtectedRoutes';

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        element: <LandingPage />,
        path: "/",
      },
      {
        element: <ProtectedRoutes>
          <Onboarding />
        </ProtectedRoutes>,
        path: "/onboarding",
      },
      {
        element: <ProtectedRoutes>
          <JobListing />
        </ProtectedRoutes>,
        path: "/jobs",
      },
      {
        element: <ProtectedRoutes>
          <JobPage />
        </ProtectedRoutes>,
        path: "/jobs/:id",
      },
      {
        element: <ProtectedRoutes>
          <PostJob />
        </ProtectedRoutes>,
        path: "/post-job",
      },
      {
        element: <ProtectedRoutes>
          <SavedJob />
        </ProtectedRoutes>,
        path: "/saved-jobs",
      },
      {
        element: <ProtectedRoutes>
          <MyJobs />
        </ProtectedRoutes>,
        path: "/my-jobs",
      },
    ],
  },
]);

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>

  )
}

export default App
