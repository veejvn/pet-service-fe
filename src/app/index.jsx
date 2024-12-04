import { BrowserRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { routes } from '../routes'
import "./global.css";
import useInitialApp from '../hooks/useInitialAp';

function App() {
  useInitialApp();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            const { Page, Layout, path } = route;
            return (
              <Route key={path} path={path} element={
                <Layout>
                  <Page />
                </Layout>}
              />
            )
          })}
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
