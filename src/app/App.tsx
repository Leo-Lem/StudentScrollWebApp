import { type ReactElement } from "react"
import { Route, Routes } from "react-router-dom"
import { Container, CssBaseline, ThemeProvider } from "@mui/material"

import theme from "./theme"
import { Header, WelcomePage, DashboardPage, ProfilePage } from "../pages"
import { useAppSelector } from "./store"
import Footer from "../pages/Footer"

export default function App(): ReactElement {
  const authStatus = useAppSelector((state) => state.authentication.status)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters sx={{ padding: 1 }}>
        {authStatus === "authenticated" ? <Header /> : <WelcomePage />}

        {authStatus === "authenticated" && (
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile/:studentId" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        )}

        <Footer />
      </Container>
    </ThemeProvider>
  )
}
