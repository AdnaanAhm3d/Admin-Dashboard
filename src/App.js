import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/Sidebar'
import Dashboard from './scenes/dashboard'
import { ProSidebarProvider } from 'react-pro-sidebar'
import Invoices from './scenes/invoices/index'
import Contacts from './scenes/contacts/index'
import Team from './scenes/team/index'
import Form from './scenes/form/index'
import Calender from './scenes/calender/index'
import FAQ from './scenes/faq/index'
import Bar from './scenes/bar/index'
// import Line from './scenes/global/line'
// import Pie from './scenes/global/pie'
// import Geography from './scenes/global/geography'

function App() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* <ProSidebarProvider> */}
        <CssBaseline />

        <div className='app'>
          <Sidebar />
          <main className='content'>
            <Topbar />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/team' element={<Team />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/invoices' element={<Invoices />} />
              <Route path='/form' element={<Form />} />
              <Route path='/calendar' element={<Calender />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/bar' element={<Bar />} />
              {/* <Route path='/pie' element={<Pie />} /> */}
              {/* <Route path='/line' element={<Line />} /> */}
              {/* <Route path='/geography' element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
        {/* </ProSidebarProvider> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
