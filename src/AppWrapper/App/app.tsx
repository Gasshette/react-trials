import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Displayer from '../Displayer/displayer';

const Home = () => <>Home</>
const Dashboard = () => <>Dashboard</>
const Calendar = () => <>Calendar</>

export const routes = [
  { id: '1', path: '/', pathName: "Home", component: <Home /> },
  { id: '2', path: 'cashboard', pathName: 'Dashboard', component: <Dashboard /> },
  { id: '3', path: 'calendar', pathName: 'Calendar', component: <Calendar /> }
];

const App = () => {
  return (
    <BrowserRouter>
      <Displayer>
        <Routes>
          {routes.map(route => <Route key={route.id} path={route.path} element={route.component} />)}
        </Routes>
      </Displayer>
    </BrowserRouter>
  )
}

export default App;