import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'dva';
import { useLocation, history } from 'umi';
import { Button  } from 'antd'
import { stringTimeFormatStamp } from '../../../utils'
const simpleHoc = WrappedComponent => (children) => {
 
  return <div className="list-wrap">
    我是高阶组件
    <WrappedComponent handleClick={handleClick}>
      {children}
    </WrappedComponent>
  </div>
}
export default simpleHoc;
/**
 * 钩子 翻页
 * @parms namePase - string models 名称
 * @return [{ querying, list, pagination }, onChange,]
 */
export const usePagination = (namePase) => {
  const { query, pathname } = useLocation();
  const { pagination: prevPagin = {}, loading: querying, list: prevList } = useSelector((state) => {
    return {
      pagination: state[namePase]?.pagination,
      list: state[namePase]?.list,
      // loading: state.loading.effects[`${namePase}/query`],
      loading: false,
    };
  });

  const [list, setList] = useState(prevList);

  const [pagination, setPagination] = useState({
    showTotal: (total) => `共 ${total} 条`,
    simple: document.body.clientWidth < 769,
    current: Number(query?.pageNo) || 1,
    total: prevPagin?.total || 0,
    pageSize: Number(query?.pageSize) || 20,
    showSizeChanger: true,
    showQuickJumper: {
      goButton: (
        <Button style={{ marginLeft: 10 }} type="default">
          确定
        </Button>
      ),
    },
  });

  useEffect(() => {
    const newPagin = { ...pagination, ...prevPagin, total: +prevPagin?.total || 0 };
    setPagination(newPagin);
    setList(prevList);
  }, [prevPagin.total, prevList]);

  const onChange = (type, value, filters, sorter = {}) => {
    if (value) {
      console.log('usePagination', type, filters)
      switch (type) {
        case 'pagination':
          if (filters) {
            Object.keys(filters).forEach(item => {
              if (filters[item]?.toString()) {
                query[item] = filters[item].toString();
              } else {
                delete query[item];
              }
            });
          }
          query.pageNo = value.current;
          query.pageSize = value.pageSize;
          break;
        case 'range':
          if (filters.length !== 0) {
            query[filters[0]] = stringTimeFormatStamp(value[0], 'start');
            query[filters[1]] = stringTimeFormatStamp(value[1], 'end');
            if (!value[0]) {
              delete query[filters[0]];
              delete query[filters[1]];
            }
          } else {
            Object.keys(value).forEach(item => {
              if (value[item]) query[item] = stringTimeFormatStamp(value[item], item.includes('start') ? 'start' : 'end');
              else delete query[item];
            });
          }

          delete query.pageNo;
          delete query.pageSize;
          break;
        default:
          query[type] = value;
          delete query.pageNo;
          delete query.pageSize;
          break;
      }
    } else {
      delete query[type];
    }
    const newPagin = { ...pagination, current: +query?.pageNo || 1, total: +prevPagin?.total || 0, pageSize: +query?.pageSize || 20 };
    setPagination(newPagin);
    // 增加排序处理
    if (sorter?.field) {
      query[sorter.field] = sorter.order;
    }
    history.replace({ pathname, query });
  };

  const state = { querying, list, pagination };
  return [state, onChange];
}
/**
 * 路由router
 * @parms Com - 组件 Component
 * @parms namePase - string models 名称
 * @parms distype - models effects
 */
 export const PaginationRoute=(Com, namePase)=> function Childrn(props){
  const { query, pathname } = useLocation();
  const { pagination: prevPagin = {}, loading: querying, list } = useSelector((state) => {
    return {
      pagination: state[namePase].pagination,
      list: state[namePase].list,
      loading: state.loading.effects[`${namePase}/query`],
    };
  });

  const [pagination, setPagination] = useState({
    showTotal: (total) => `共 ${total} 条`,
    simple: document.body.clientWidth < 769,
    current: Number(query?.pageNo) || 1,
    total: prevPagin?.total || 0,
    pageSize: Number(query?.pageSize) || 20,
    showSizeChanger: true,
    showQuickJumper: {
      goButton: (
        <Button style={{ marginLeft: 10 }} type="default">
          确定
        </Button>
      ),
    },
  });
  useEffect(() => {
    const newPagin = { ...prevPagin, ...pagination };
    newPagin.total = +prevPagin?.total || 0;
    setPagination(newPagin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevPagin.total]);

  const onChange = (type, value, filters = []) => {
    if (value) {
      console.log('PaginationRoute', type)
      switch (type) {
        case 'pagination':
          Object.keys(filters).forEach(item => {
            if (filters[item]?.toString()) {
              query[item] = filters[item].toString();
            } else {
              delete query[item];
            }
          });

          query.pageNo = value.current;
          query.pageSize = value.pageSize;
          break;
        case 'range':
          if (filters.length !== 0) {
            query[filters[0]] = stringTimeFormatStamp(value[0], 'start');
            query[filters[1]] = stringTimeFormatStamp(value[1], 'end');
            if (!value[0]) {
              delete query[filters[0]];
              delete query[filters[1]];
            }
          } else {
            Object.keys(value).forEach(item => {
              if (value[item]) query[item] = stringTimeFormatStamp(value[item], item.includes('start') ? 'start' : 'end');
              else delete query[item];
            });
          }

          delete query.pageNo;
          delete query.pageSize;
          break;
        default:
          query[type] = value;
          delete query.pageNo;
          delete query.pageSize;
          break;
      }
    } else {
      delete query[type];
    }
    const newPagin = { ...pagination, current: +query?.pageNo || 1, total: +prevPagin?.total || 0, pageSize: +query?.pageSize || 20 };
    setPagination(newPagin);
    history.replace({ pathname, query });
  };

  return <Com {...props} pagination={pagination} onChange={onChange} querying={querying} list={list} />;
}