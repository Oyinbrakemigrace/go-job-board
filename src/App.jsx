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

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        element: <LandingPage />,
        path: "/",
      },
      {
        element: <Onboarding />,
        path: "/onboarding",
      },
      {
        element: <JobListing />,
        path: "/jobs",
      },
      {
        element: <JobPage />,
        path: "/jobs/:id",
      },
      {
        element: <PostJob />,
        path: "/post-job",
      },
      {
        element: <SavedJob />,
        path: "/saved-jobs",
      },
      {
        element: <MyJobs />,
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
