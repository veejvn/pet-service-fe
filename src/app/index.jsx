import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { routes } from '../routes'
import "./global.css";
import useInitialApp from '../hooks/useInitialAp';

function App() {
  useInitialApp();
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const { Page, Layout, path } = route;
            return (
              <Route key={uuidv4} path={path} element={
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
