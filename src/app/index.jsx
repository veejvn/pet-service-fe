import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from '../routes'
import "./global.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.layout
            return (
              <Route path={route.path} element={
                <Layout>
                  <Page />
                </Layout>}
              />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
