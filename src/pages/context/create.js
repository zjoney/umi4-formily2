import React, { createContext, useContext, useState } from 'react'

export const Simple = ({useChange}) => {
  const { totalPage, pageSize, changePage } = useChange()
  return <>totalPage: {totalPage}
    pageSize:{pageSize}
    <button onClick={changePage}>click simple</button>
  </>
}
