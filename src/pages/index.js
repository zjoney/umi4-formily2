
import React from "react";
import { history } from 'umi'

const HomePage = () => {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <button onClick={() => history.push({ pathname: '/detail', search: `?type=3` })}>跳转detail</button>
    </div>
  );
}
export default HomePage
