import React from 'react';
import {
  FormProvider,
  createSchemaField,
} from '@formily/react';
import { Table, Space } from 'antd';
import {
  FormButtonGroup,
  Submit,
  Reset,
  FormItem,
  FormLayout,
  Input,
  Cascader,
  Select,
  ArrayCards,
  FormGrid,
  DatePicker,
  Checkbox,
  Radio,
  NumberPicker,
  Password,
  Switch,
  TimePicker,
  Upload,
  Transfer,
  TreeSelect,
  FormStep,
  Editable,
  PreviewText,
  ArrayTable,
} from '@formily/antd';
import SelfTableArray from '../ArrayTableSelf';
// import { queryFrequencyList, queryRateUnitAndDesc, listIngredientDict, listGroupUnit } from '@/services/drugKnowledge';
import './index.less';


const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Cascader,
    Select,
    ArrayCards,
    FormGrid,
    FormButtonGroup,
    Submit,
    Reset,
    FormLayout,
    DatePicker,
    Checkbox,
    Radio,
    NumberPicker,
    Password,
    Switch,
    TimePicker,
    Upload,
    Transfer,
    TreeSelect,
    FormStep,
    Editable,
    PreviewText,
    ArrayTable,
    Space,
    SelfTableArray
  },
  scope: {
    /**
     * 获取频次列表
     * @param {*} field 
     */
    handleFreqencyList: async (field) => {
      // const { object = [] } = await queryFrequencyList({ statusFlagArr: [2, 5] }) ?? {};
      const { object = [] } = {};
      field.dataSource = object.map((item) => {
        return { label: item.freqAbbreviation, value: item.freqId }
      });
    },
    /**
     * 获取rate单位列表
     * @param {*} field 
     */
    handleRateUnitList: async (field) => {
      // const { object = [] } = await queryRateUnitAndDesc({ dictNo: 27 }) ?? {};
      const { object = [] } = {};
      field.dataSource = (object ?? []).map((item) => {
        return { label: item.unitDisplayDesc, value: item.unitId }
      });
    },
    /**
     * 获取Ingredient单位列表
     * @param {*} field 
     */
    handleIngredientDictList: async (field) => {
      // const { object: { list = [] } = {} } = await listIngredientDict({ dictNo: 27 }) ?? {};
      const { list = [] } = {};
      field.dataSource = list.map((item) => {
        return { label: item.ingredientFullDesc, value: item.ingredientCode }
      });
    },
    /**
     * 获取Ingredient单位列表
     * @param {*} field 
     */
    handleVolumeUnitList: async (field) => {
      // const { object = [] } = await listGroupUnit({ subGroupId: "US000005", statusFlagArr: [2, 5] }) ?? {};
      const { object = [] } = {};
      field.dataSource = object.map((item) => {
        return { label: item.unitDisplayDesc, value: item.unitId }
      });
    },
    /**
     * 获取Ingredient单位列表
     * @param {*} field 
     */
    handleIngredientStrengthUnitIdList: async (field) => {
      // const { object = [] } = await listGroupUnit({ subGroupId: "US000004", statusFlagArr: [2, 5] }) ?? {};
      const { object = [] } = {};
      field.dataSource = object.map((item) => {
        return { label: item.unitDisplayDesc, value: item.unitId }
      });
    },
  }
});

const AddOrDetail = (props) => {
  const { data = [], form } = props;
  return (
    <FormProvider form={form}>
      {
        data.map((item, index) => {
          return (
            <div key={`${index + 1}`} className="container">
              <div className="header">
                <h4 className="tips">{item.name}</h4>
                {item.optionElement && React.cloneElement(item.optionElement)}
              </div>
              {
                item.used === 'table' ?
                  <Table
                    columns={item.columns}
                    rowKey={item.rowKey || 'index'}
                    dataSource={item.dataSource || []}
                    pagination={false}
                  />
                  :
                  <FormGrid
                    minWidth={item.minWidth || 150}
                    maxColumns={item.maxColumns || 4}
                    columnGap={item.columnGap || 16}
                  >
                    <SchemaField schema={item.schema} />
                  </FormGrid >
              }
            </div>
          )
        })
      }
    </FormProvider>
  )
}
export default AddOrDetail;