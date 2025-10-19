import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { AppRoutes } from './router'
import LoadingScreen from './components/base/LoadingScreen'
import MobileDetector from './components/MobileDetector'

function App() {
  console.log('App component is rendering...');
  return (
    <BrowserRouter basename="/">
      <MobileDetector />
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App