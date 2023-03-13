import React, { createContext, useContext, useState } from 'react'
const ChangeContext = createContext({})
const useChange = () => {
  return useContext(ChangeContext)
}

export const Simple = () => {
  const { totalPage, pageSize, changePage } = useChange()
  return <>totalPage: {totalPage}
    pageSize:{pageSize}
    <button onClick={changePage}>click simple</button>
  </>
}

const Demo = () => {
  const [totalPage, settotalPage] = useState(1)
  const [pageSize, setpageSize] = useState(12)
  const handleChange = () => {
    settotalPage(10)
    setpageSize(16)
  }
  return <ChangeContext.Provider
    value={{ totalPage, pageSize, changePage: handleChange }}
  >
   
    <Simple />
  </ChangeContext.Provider>
}


export default Demo