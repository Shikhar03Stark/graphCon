import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './components/Menu';
import {data} from './fetch';
import Datapoint from './components/Datapoint';
import Canvas from './components/Canvas';
import * as serviceWorker from './serviceWorker';
//import './engine';

let Datapoints = data.map((val, index) => {
  return (
    <Datapoint key = {data[index].key} x = {data[index].x} y = {data[index].y} />
  );
});

ReactDOM.render(
  <React.StrictMode>
    <Menu />
    <Canvas>
      {Datapoints}
    </Canvas>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
