import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { Home } from "./pages/Home.jsx"
import { BugIndex } from "./pages/BugIndex.jsx"
import { BugDetails } from "./pages/BugDetails.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { UserIndex } from "./pages/UserIndex.jsx"
import { UserEdit } from "./cmps/UserEdit.jsx"
import { BugEdit } from "./pages/BugEdit.jsx"
import { UserDetails } from "./pages/UserDetails.jsx"
import { Provider } from "react-redux"
import { store } from "./store/store.js"
import { RoutGuard } from "./cmps/RoutGuard.jsx"

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="main-app">
          <AppHeader />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bug" element={<BugIndex />}>
                <Route path="/bug/edit/:bugId" element={<BugEdit />} />
              </Route>
              <Route path="/bug/:bugId" element={<BugDetails />} />
              <Route path="/about" element={<AboutUs />} />
              <Route
                path="/user"
                element={
                  <RoutGuard>
                    <UserIndex />
                  </RoutGuard>
                }
              >
                <Route path="/user/edit/:userId" element={<UserEdit />} />
              </Route>
              <Route path="/user/:userId" element={<UserDetails />} />
            </Routes>
          </main>
          <AppFooter />
          <UserMsg />
        </div>
      </Router>
    </Provider>
  )
}
