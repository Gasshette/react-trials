import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Displayer from '../Displayer/displayer';
import Home from '../../Components/Home/home';
import Slider from '../../Components/Slider/slider';
import 'animate.css';

const Calendar = () => <>Calendar</>;

export const routes = [
  { path: '/', pathName: "Home", Component: Home },
  { path: 'slider', pathName: 'Slider', Component: Slider }
];

const App = () => {
  return (
    <Displayer>
      <Routes>
        {routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      </Routes>
    </Displayer>
  )
}

export default App;