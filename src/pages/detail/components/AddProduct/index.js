import React, { useEffect, useState, useMemo, useRef } from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable, FormDrawer } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, Field, FormConsumer } from '@formily/react'
import { Table, Input, Button } from 'antd';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    SelectTable,
    // SelectTableSelf,
  },
})

const AddProduct = (props) => {
  const { drawer, resolve, formConfig = {}, data = {} } = props;
  const { handleDetail = () => { } } = formConfig;
  const [tableData, setTableData] = useState({ list: [] });
  const [selectProductList, setSelectProductList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const tableQuery = useRef({ pageSize: 17, pageNum: 1, currentPage: 1 })

  const form = createForm()

  useEffect(() => {
    handleProductList();
  }, []);
  const columns = [
    { title: 'Code', dataIndex: 'ampCode', key: '1', width: 120, },
    { title: 'Product tallman display name', dataIndex: 'ampDisplayName', key: '2', },
  ]

  /**
   * 查询列表
   */
  const handleProductList = async (params) => {
    // const result = await listTradeMasterRelationByPage({ ...tableQuery.current, itemLevel: 5, statusFlagArr: [5, 6], ...params }) ?? {};
    const result = {};
    const { object = {} } = result;
    const { list = [] } = object || {};
    setTableData(object)
  }
  /**
   * 提交
   * @param {*} values 
   */
  const handleSubmit = async (values) => {
    const { selectProductList = [] } = values;
    const { tradeMasterModelList = [] } = data;
    handleDetail({ ...data, tradeMasterModelList: [...tradeMasterModelList, ...selectProductList] })
    drawer.close();
  }

  /**
   * 分页
   * @param {*} page 
   * @param {*} filters 
   * @param {*} sorter 
   */
  const handleProductChange = (page, pageSize) => {
    tableQuery.current = { pageNum: page, currentPage: page, pageSize: pageSize }
    // 查询
    handleProductList();
  }
  /**
   * 搜索
   * @param {*} e 
   */
  const handleSearch = (value) => {
    value.length >= 4 && handleProductList({ keyWord: value })
  }
  /**
   * 勾选
   * @param {*} selectedRowKeys 
   * @param {*} selectedRows 
   */
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys)
    setSelectProductList(selectedRows);
  }
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          type="array"
          name="selectProductList"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            bordered: false,
            showSearch: true,
            optionAsValue: true,
            mode: 'multiple',
            primaryKey: "ampCode",
            scroll: { y: 'calc(100vh - 310px)' },
            onSearch: (value) => {
              tableQuery.current = { pageSize: 17, pageNum: 1, currentPage: 1 };
              handleProductList({ keyWord: value })
            },
            pagination: {
              // ...utils.pagination({ ...tableData, ...tableQuery.current }),
              onChange: handleProductChange
            },
          }}
          enum={tableData?.list || []}
        >
          <SchemaField.Object>
            <SchemaField.Void
              name="ampCode"
              title="Code"
              x-component="SelectTable.Column"
            />
            <SchemaField.Void
              name="ampDisplayName"
              title="Product tallman display name"
              x-component="SelectTable.Column"
            />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup.Sticky align="center">
        <FormButtonGroup>
          <FormConsumer>{(form) => {
            return <Submit onSubmit={handleSubmit}>{`Select ${form?.values?.selectProductList?.length}`}</Submit>
          }}</FormConsumer>
        </FormButtonGroup>
      </FormButtonGroup.Sticky>
    </FormProvider>
  )
}

export default AddProduct;