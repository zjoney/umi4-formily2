import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva'
import { useLocation, history, Link } from 'umi';
import { Table, Select } from 'antd'
import SimpleHoc, { usePagination, PaginationRoute } from './SimpleHoc';
const Usual = () => {
  const { query, search, pathname } = useLocation();
  const dispatch = useDispatch();
  const [{ pagination, list, querying }, onChange] = usePagination('table');
  const fetchList = useCallback(() => {
    dispatch({
      type: 'table/query',
      payload: {
        status: 1,
        ...query,
      },
    });
  }, [dispatch, query])
  useEffect(() => {
    fetchList()
  }, [query])
  const columns = [
    {
      key: 'cert_no',
      title: '编号',
      dataIndex: 'cert_no',
      render: (text, record) => (
        <div>
          <Link className="mr-15" to={`/deaths/process?cert_id=${record.cert_id}`}>
            {text}
          </Link>
          {/* <Tag style={{ border: 'none', margin: 0, color: '#ED8558', background: 'rgba(237, 133, 88,.08)' }} className="font-size-14">
            {ApplyStatus[+record.apply_status] && Status[+record.apply_biz_type]}
            {ApplyStatus[+record.apply_status]}
          </Tag> */}
        </div>
      ),
      tabsKey: ['未申领', '未使用', '已签发', '已作废', '已遗失', '已退回', '已停用'],
    },
    {
      key: 'biz_dept_name',
      title: '领用科室',
      dataIndex: 'biz_dept_name',
      filterDropdown: (
        <Select
          placeholder="请选择科室"
          allowClear
          style={{ width: 240 }}
          onChange={(value) => onChange('biz_dept_id', value)}
          defaultValue={query?.biz_dept_id}
        >
          {[{id: 'xx', name: 'TODO'}].map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      ),
      tabsKey: ['未使用'],
    },
  ]
  return (
    <div>
      {/* 我是父组件 */}
      <Table
        columns={columns}
        dataSource={[{
          id: '123',
          cert_no: '1',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '2',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '3',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '4',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '5',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '6',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '7',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '8',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '9',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '10',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '11',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '12',
          biz_dept_name: 'bbb'
        }, {
          id: Math.random(),
          cert_no: '13',
          biz_dept_name: 'bbb'
        }] ||
          list}
        rowKey="cert_id"
        pagination={pagination}
        loading={querying}
        scroll={{ y: window.document.documentElement.clientHeight - 300 }}
        onChange={(page, filters) => onChange('pagination', page, filters)}
      />
    </div>
  )
}
export default PaginationRoute(Usual, 'table');
