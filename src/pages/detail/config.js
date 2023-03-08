import { Button } from 'antd';
import {
  FormGrid,
  FormDrawer
} from '@formily/antd'
import AddProduct from './components/AddProduct'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

// ingredient列
const ingredientGroupColumnList = [{ width: 200, title: 'Ingredient Desc' }, { width: 200, title: 'ingredient Strength Desc' }, { width: 200, title: 'ingredient Strength Value' }, { width: 200, title: 'ingredient Strength Unit' }, { width: 200, title: 'volume Value' }, { width: 200, title: 'volume Unit' }, { width: 120, title: '' }];

// ingredient宽度之和
const ingredientWidth = ingredientGroupColumnList.reduce((acc, current) => {
  return acc + Number(current.width);
}, 0);

/**
 * 添加产品
 * @param {*} data 
 * @param {*} formConfig 
 */
 const handleAddProduct = async (data, formConfig) => {
  const drawer = FormDrawer('add-Drug Class', (resolve) => {
    return <AddProduct
      resolve={resolve}
      drawer={drawer}
      data={data}
      formConfig={formConfig}
    />
  });
  await drawer.open();
}
/**
 * 删除Product
 */
const handleDeleteProduct = (record, formConfig, data) => {
  const { tradeMasterModelList = [] } = data;
  const { handleDetail = () => { } } = formConfig;
  const index = tradeMasterModelList.findIndex((item) => item.ampCode === record.ampCode);
  index > -1 && tradeMasterModelList.splice(index, 1);
  handleDetail && handleDetail({ ...data, tradeMasterModelList: [...data.tradeMasterModelList] });
}

const handleProductColumn = (type) => {
  const columns = [
    { title: 'Code', dataIndex: 'ampCode', key: '1', width: '10%', },
    { title: 'Product tallman display name', dataIndex: 'ampDisplayName', key: '2', width: '85%', },
  ];
  if (+type !== 1) {
    columns.push(
      {
        title: '', key: '12', width: '5%',
        render: (text, record) => (
          <a onClick={() => handleDeleteProduct(record, formConfig, data)}>Delete</a>
        )
      })
  }
  return columns;
}

/**
 * 生成配置
 * @param {*} type 
 * @param {*} data 
 * @param {*} formConfig 
 * @returns 
 */
const handleConfig = (type, data = {}, formConfig) => {
  const fluidDetailConfig = [
    {
      name: 'General Information',
      used: 'formily',
      maxColumns: 2,
      fields: [
        {
          fieldName: 'fluidTypeDescription',
          fieldLabel: 'Fluid description',
          fieldType: 'Input',
          required: true,
          type: 'string',
        },
        {
          fieldName: 'fluidTypeShortDescription',
          fieldLabel: 'Fluid abbreviation',
          fieldType: 'Input',
          required: true,
          type: 'string',
        },
        {
          fieldName: 'fluidCode',
          fieldLabel: 'Code',
          fieldType: 'Input',
          disabled: true,
          type: 'string',
          visible: +type === 3
        },
        {
          fieldName: 'select',
          fieldLabel: 'Route',
          fieldType: 'Select',
          type: 'string',
          required: true,
          enum: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
          ],
        },
        {
          fieldName: 'formId',
          fieldLabel: 'Dose form',
          fieldType: 'Select',
          type: 'string',
          required: true,
        },
        {
          fieldName: 'formExtraId',
          fieldLabel: 'Dose form extra',
          fieldType: 'Select',
          type: 'string',
        },
        {
          fieldName: 'strength',
          fieldLabel: 'Strength description',
          fieldType: 'Input',
          type: 'string',
        },
        {
          fieldName: 'osmolarity',
          fieldLabel: 'Osmolarity',
          fieldType: 'NumberPicker',
          type: 'string',
          addonAfter: 'mOsm',
        },
        {
          fieldName: 'basicCheckGroup',
          fieldLabel: '',
          fieldType: 'Checkbox.Group',
          type: 'array',
          enum: [{ label: 'As IV fluid', value: 'asIvFluidAlone' },
          { label: 'Common IV fluid', value: 'asIvFluidConstituent' },
          { label: 'As diluent', value: 'asSolventConventional' },
          { label: 'Default blacklist', value: 'defaultBlackList' },
          ],
        },
      ]
    },
    // {
    //   name: 'Common Dosage',
    //   used: 'formilyArray',
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       ivFluidCommonDosageModelList: {
    //         type: 'array',
    //         'x-decorator': 'FormItem',
    //         'x-component': 'ArrayTable',
    //         'x-read-pretty': +type === 1,
    //         'x-component-props': {
    //           pagination: false,
    //           scroll: { x: '100%' },
    //         },
    //         items: {
    //           type: 'object',
    //           properties: {
    //             column1: {
    //               type: 'void',
    //               'x-component': 'ArrayTable.Column',
    //               'x-component-props': { width: 120, title: <>Dosage<span style={{ color: 'red' }}>*</span></> },
    //               properties: {
    //                 doseValue: {
    //                   type: 'string',
    //                   required: true,
    //                   'x-decorator': 'FormItem',
    //                   'x-component': 'NumberPicker',
    //                 },
    //               },
    //             },
    //             column2: {
    //               type: 'void',
    //               'x-component': 'ArrayTable.Column',
    //               'x-component-props': { width: 200, title: 'Dosage Unit' },
    //               properties: {
    //                 doseUnitId: {
    //                   type: 'string',
    //                   'x-decorator': 'FormItem',
    //                   'x-disabled': true,
    //                   'x-component': 'Input',
    //                 },
    //               },
    //             },
    //             column3: {
    //               type: 'void',
    //               'x-component': 'ArrayTable.Column',
    //               'x-component-props': { width: 100, title: 'Rate' },
    //               properties: {
    //                 rateValueLower: {
    //                   type: 'string',
    //                   'x-decorator': 'FormItem',
    //                   'x-component': 'Input',
    //                 },
    //               },
    //             },
    //             column4: {
    //               type: 'void',
    //               'x-component': 'ArrayTable.Column',
    //               'x-component-props': { width: 100, title: '' },
    //               properties: {
    //                 rateUnitId: {
    //                   type: 'string',
    //                   'x-decorator': 'FormItem',
    //                   'x-component': 'Select',
    //                   'x-reactions': ['{{handleRateUnitList}}'],
    //                 },
    //               },
    //             },
    //             column5: {
    //               type: 'void',
    //               'x-component': 'ArrayTable.Column',
    //               'x-component-props': { width: 200, title: 'Parenteral Method' },
    //               properties: {
    //                 parenteralMethodsId: {
    //                   type: 'string',
    //                   'x-decorator': 'FormItem',
    //                   'x-component': 'Input',
    //                   'x-disabled': true,
    //                 },
    //               },
    //             },
    //             column6: {
    //               type: 'void',
    //               'x-component': 'ArrayTable.Column',
    //               'x-component-props': { width: 200, title: 'Frequency' },
    //               properties: {
    //                 frequencyId: {
    //                   type: 'string',
    //                   'x-decorator': 'FormItem',
    //                   'x-component': 'Select',
    //                   'x-reactions': ['{{handleFreqencyList}}'],
    //                 },
    //               },
    //             },
    //             column7: {
    //               type: 'void',
    //               'x-component': 'ArrayTable.Column',
    //               'x-component-props': {
    //                 title: '',
    //                 dataIndex: 'operations',
    //                 width: 60,
    //                 fixed: 'right',
    //               },
    //               'x-hidden': +type === 1,
    //               properties: {
    //                 item: {
    //                   type: 'void',
    //                   'x-component': 'FormItem',
    //                   properties: {
    //                     remove: {
    //                       type: 'void',
    //                       'x-component': 'ArrayTable.Remove',
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //         properties: {
    //           addCommonDosage: {
    //             type: 'void',
    //             'x-component': 'ArrayTable.Addition', 'x-component-props': {
    //               defaultValue: { doseUnitId: 'mL', parenteralMethodsId: 'intravenous continuous infusion' },
    //             },
    //             title: 'Add',
    //             'x-hidden': +type === 1,
    //           },
    //         },
    //       },
    //     },
    //   }
    // },
    // {
    //   name: 'Ingredient', 
    //   used: 'formilyArray', 
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       fluidIngredientRelationModelList: {
    //         type: 'array',
    //         'x-decorator': 'FormItem',
    //         'x-component': 'SelfTableArray',
    //         'x-read-pretty': +type === 1,
    //         'x-component-props': {
    //           pagination: false,
    //           scroll: { x: '100%' },
    //         },
    //         items: {
    //           type: 'object',
    //           properties: {
    //             column1: {
    //               type: 'void',
    //               'x-component': 'SelfTableArray.Column',
    //               'x-component-props': { width: 80, title: 'Group' },
    //               properties: {
    //                 ingredientGroup: {
    //                   type: 'string',
    //                   'x-decorator': 'FormItem',
    //                   'x-component': 'SelfTableArray.Index',
    //                 },
    //               },
    //             },
    //             column2: {
    //               type: 'void',
    //               'x-component': 'SelfTableArray.Column',
    //               'x-component-props': {
    //                 width: ingredientWidth,
    //                 title: <FormGrid>
    //                   {
    //                     ingredientGroupColumnList.map((item, index) => {
    //                       return <FormGrid.GridColumn key={`${index}`} gridSpan={Math.ceil(item.width / ingredientWidth)}>{item.title}</FormGrid.GridColumn>
    //                     })
    //                   }
    //                 </FormGrid>,
    //                 dataIndex: 'group',
    //               },
    //               properties: {
    //                 groupList: {
    //                   type: 'array',
    //                   'x-decorator': 'FormItem',
    //                   'x-component': 'SelfTableArray',
    //                   'x-read-pretty': +type === 1,
    //                   'x-component-props': {
    //                     pagination: false,
    //                     // scroll: { x: '100%' },
    //                     showHeader: false
    //                   },
    //                   items: {
    //                     type: 'object',
    //                     properties: {
    //                       column1: {
    //                         type: 'void',
    //                         'x-component': 'SelfTableArray.Column',
    //                         'x-component-props': { width: 200, title: '' },
    //                         properties: {
    //                           ingredientCode: {
    //                             type: 'string',
    //                             'x-decorator': 'FormItem',
    //                             'x-component': 'Select',
    //                             'x-reactions': ['{{handleIngredientDictList}}'],
    //                           },
    //                         },
    //                       },
    //                       column2: {
    //                         type: 'void',
    //                         'x-component': 'SelfTableArray.Column',
    //                         'x-component-props': { width: 200, title: '' },
    //                         properties: {
    //                           ingredientStrengthDesc: {
    //                             type: 'string',
    //                             'x-decorator': 'FormItem',
    //                             'x-component': 'Input',
    //                           },
    //                         },
    //                       },
    //                       column3: {
    //                         type: 'void',
    //                         'x-component': 'SelfTableArray.Column',
    //                         'x-component-props': { width: 200, title: '' },
    //                         properties: {
    //                           ingredientStrengthValue: {
    //                             type: 'string',
    //                             'x-decorator': 'FormItem',
    //                             'x-component': 'NumberPicker',
    //                           },
    //                         },
    //                       },
    //                       column4: {
    //                         type: 'void',
    //                         'x-component': 'SelfTableArray.Column',
    //                         'x-component-props': { width: 200, title: '' },
    //                         properties: {
    //                           ingredientStrengthUnitId: {
    //                             type: 'string',
    //                             'x-decorator': 'FormItem',
    //                             'x-component': 'Select',
    //                             'x-reactions': ['{{handleIngredientStrengthUnitIdList}}'],
    //                           },
    //                         },
    //                       },
    //                       column5: {
    //                         type: 'void',
    //                         'x-component': 'SelfTableArray.Column',
    //                         'x-component-props': { width: 200, title: '' },
    //                         properties: {
    //                           volumnValue: {
    //                             type: 'string',
    //                             'x-decorator': 'FormItem',
    //                             'x-component': 'NumberPicker',
    //                             'addonBefore': '/'
    //                           },
    //                         },
    //                       },
    //                       column6: {
    //                         type: 'void',
    //                         'x-component': 'SelfTableArray.Column',
    //                         'x-component-props': { width: 200, title: '' },
    //                         properties: {
    //                           volumnUnitId: {
    //                             type: 'string',
    //                             'x-decorator': 'FormItem',
    //                             'x-component': 'Select',
    //                             'x-reactions': ['{{handleVolumeUnitList}}'],
    //                           },
    //                         },
    //                       },
    //                       column7: {
    //                         type: 'void',
    //                         'x-component': 'SelfTableArray.Column',
    //                         'x-component-props': {
    //                           title: '',
    //                           dataIndex: 'operations',
    //                           width: 120,
    //                           fixed: 'right',
    //                         },
    //                         'x-hidden': +type === 1,
    //                         properties: {
    //                           item: {
    //                             type: 'void',
    //                             'x-component': 'FormItem',
    //                             'x-hidden': +type === 1,
    //                             properties: {
    //                               addGroup: {
    //                                 type: 'void',
    //                                 'x-component': 'SelfTableArray.Addition',
    //                                 'x-component-props': {
    //                                   type: "text",
    //                                   size: "small",
    //                                   shape: "circle",
    //                                   icon: <PlusCircleOutlined />,
    //                                   defaultValue: { ingredientGroup: '' },
    //                                   color: '#0F9096'
    //                                 },
    //                               },
    //                               remove: {
    //                                 type: 'void',
    //                                 'x-component': 'SelfTableArray.Remove',
    //                                 'x-component-props': {
    //                                   type: "text",
    //                                   size: "small",
    //                                   shape: "circle",
    //                                   icon: <MinusCircleOutlined />,
    //                                   color: '#0F9096'
    //                                 },
    //                               },
    //                             },
    //                           },
    //                         },
    //                       },
    //                     }
    //                   },
    //                 },
    //               },
    //             },
    //             column3: {
    //               type: 'void',
    //               'x-component': 'SelfTableArray.Column',
    //               'x-component-props': {
    //                 title: '',
    //                 dataIndex: 'operations',
    //                 width: 120,
    //                 fixed: 'right',
    //               },
    //               properties: {
    //                 item: {
    //                   type: 'void',
    //                   'x-component': 'FormItem',
    //                   'x-hidden': +type === 1,
    //                   properties: {
    //                     remove: {
    //                       type: 'void',
    //                       'x-component': 'SelfTableArray.Remove',
    //                       'x-component-props': {
    //                         title: 'Delete',
    //                         color: '#0F9096'
    //                       }
    //                     }
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //         properties: {
    //           addIngredient: {
    //             type: 'void',
    //             defaultValue: { groupList: [{}] },
    //             'x-component': 'SelfTableArray.Addition',
    //             'x-component-props': {
    //               defaultValue: { groupList: [{ ingredientGroup: '' }] },
    //             },
    //             title: 'Add',
    //             'x-hidden': +type === 1,
    //           },
    //         },
    //       },
    //     },
    //   }
    // },
    // {
    //   name: 'Product',
    //   used: 'table',
    //   optionElement: +type === 1 ? '' : <Button type="default" onClick={() => handleAddProduct(data, formConfig)}>Add</Button>,
    //   columns: handleProductColumn(type),
    //   dataSource: data?.tradeMasterModelList || [],
    //   rowKey: 'ampCode'
    // }
  ]
  return fluidDetailConfig;
}
export default handleConfig;