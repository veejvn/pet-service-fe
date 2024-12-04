import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./global.css";
import "./global_antd.js";
import { routes } from '../routes/index.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.layout
            return (
              <Route key={route.path} path={route.path} element={
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
