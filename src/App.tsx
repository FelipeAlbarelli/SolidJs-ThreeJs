import type { Component } from 'solid-js';
import logo from './logo.svg';
import styles from './App.module.css';
import { Header } from './components/Header';
import { MainScene } from './components/MainScene';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div class="container">
      <Header></Header>
      <MainScene />
      </div>
    </div>
  );
};

export default App;
