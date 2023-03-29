import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import "./index.scss";
import { Header } from "./components";
import { Router } from './router/Routes';

export const App = () => {
  return (
    <>
      <Header />
      <Router />
    </>
  );
};
