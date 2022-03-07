import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Displayer from '../Displayer/displayer';
import Home from '../../Components/Home/home';
import Slider from '../../Components/Slider/slider';
import 'animate.css';
import Games from '../../Components/Games/games';
import TwitchAuthGuard from '../../Shared/Components/TwitchAuthGuard/twitchAuthGuard';
import TwitchAuthProvider from '../../Context/twitchAuthProvider';

export const routes = [
  { path: '/', pathName: "Home", Component: Home },
  { path: 'slider', pathName: 'Slider', Component: Slider },
  { path: 'games', pathName: 'Games', Component: Games },
];

const App = () => {
  return (
    <TwitchAuthProvider>
      <Displayer>
        <Routes>
          {routes.map(({ path, Component }) => <Route key={path} path={path} element={Component === Games ? <TwitchAuthGuard><Component /></TwitchAuthGuard> : <Component />} />)}
        </Routes>
      </Displayer>
    </TwitchAuthProvider>
  )
}

export default App;