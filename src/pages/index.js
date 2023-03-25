
import React, { useState, useEffect, useRef } from "react";
import { history } from 'umi'
import '../global.less'

const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
const useTimeout = (cb, time) => {
  // 初始 时间戳
    const stRef = useRef(+new Date());
  // 每一次更新的 t   
    const [t, setT] = useState(stRef.current);
  // 避免更新时间的时候过快导致两次t一样，不能再继续计时的情况 
    const [r, setR] = useState(0);
    useEffect(() => {
      let leave = t - stRef.current;
      if (leave >= time) {
        cb();
      } else {
        setT(+new Date());
  // 保证更新      
        setR(r + 1);
      }
  // 添加依赖    
    }, [r]);
}

const HomePage = () => {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(0);

  useInterval(()=>{
    setCount(count + 1)
  }, 500)
  useInterval(()=>{
    setAge(age => age + 1)
  }, 500)
  // useTimeout(()=>{
  //   setCount(count + 1) // 其实会造成useTimeout的多次,但是定时器的原本实现是另起一个线程去实现计时的功能
  // }, 500)

  // useTimeout(()=>{
  //   setAge(age => age + 1) // 其实会造成useTimeout的多次,但是定时器的原本实现是另起一个线程去实现计时的功能
  // }, 500)

  // const handleParamClick = () => {
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   setCount(count + 1);
  // };

  // const handleCbClick = () => {
  //   setAge(age => age + 1);
  //   setAge(age => age + 1);
  //   setAge(age => age + 1);
  // };
  useEffect(() => {
    // const timer = setInterval(() => {
    //   setCount(count + 1);
    // }, 500);
    // return () => clearInterval(timer);
    
  }, []);
  useEffect(() => {
    // const timer = setInterval(() => {
    //   setAge(age => age + 1);
    // }, 500);
    // return () => clearInterval(timer);
    
  }, []);

  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <button onClick={() => history.push({ pathname: '/details', search: `?type=3` })}>跳转detail</button>
      <h2>Hooks组件-高阶组件</h2>
      <button onClick={() => history.push({ pathname: '/hooks' })}>跳转Hooks组件</button>
      <h2>Context</h2>
      <button onClick={() => history.push({ pathname: '/context' })}>跳转Context组件</button>
      <div>count:{count} age:{age}</div>
      {/* <button onClick={handleParamClick}>测试Count</button>
      <button onClick={handleCbClick}>测试age</button> */}
    </div>
  );
}
export default HomePage
