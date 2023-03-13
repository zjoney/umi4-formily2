
import React from "react";
import { history } from 'umi'
import '../global.less'

const HomePage = () => {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <button onClick={() => history.push({ pathname: '/details', search: `?type=3` })}>跳转detail</button>
      <h2>Hooks组件-高阶组件</h2>
      <button onClick={() => history.push({ pathname: '/hooks'})}>跳转Hooks组件</button>
      <h2>Context</h2>
      <button onClick={() => history.push({ pathname: '/context'})}>跳转Context组件</button>
    </div>
  );
}
export default HomePage
