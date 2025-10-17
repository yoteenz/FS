import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { AppRoutes } from './router'
import LoadingScreen from './components/base/LoadingScreen'
import MobileDetector from './components/MobileDetector'

function App() {
  return (
    <BrowserRouter basename={(window as any).__BASE_PATH__ || '/'}>
      <MobileDetector />
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App