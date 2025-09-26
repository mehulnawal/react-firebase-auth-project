import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './Components/Theme'
import { UserDataProvider } from './Components/GlobalData'
import { AppRoutes } from './AppRoutes'

function App() {

  return (
    <>
      <ThemeProvider>
        <UserDataProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserDataProvider>
      </ThemeProvider>

    </>
  )
}

export default App