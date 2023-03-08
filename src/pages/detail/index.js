
import React, { useEffect, useState, useMemo } from "react";
import { Button, Space, Select as AntdSelect, message } from 'antd';
import {
  FormButtonGroup,
  FormGrid,
} from '@formily/antd';
import {
  createForm, onFieldReact,
} from '@formily/core'
import { useLocation } from 'umi';
import handleConfig from './config';
import AddOrDetail from './components/AddOrDetail';
import { history } from 'umi';
import './index.less';


const Detail = () => {
  const location = useLocation();
  const { search } = location;
  const { type=3, fluidCode } = search;
  const [detailList, setDetailList] = useState([]); // 详情数据
  const [versionList, setVersionList] = useState([]); // version的列表
  const [detail, setDetail] = useState({});
  const [tradeMasterModelList, setTradeMasterModelList] = useState([]);

  const formConfig = {
    handleDetail: (data) => {
      const { tradeMasterModelList = [] } = data;
      setTradeMasterModelList(tradeMasterModelList)
      // 处理数据
      handleDetailList(data);
    }
  }

  /**
   * 处理数据变成schema
   * @param {* 配置} config 
   * @param {* 详情数据} data 
   */
  const handleSchema = (config, data) => {
    const { fields = [] } = config;
    // console.log('fields', fields)
    const result = {
      type: 'object',
      properties: {}
    }
    fields.forEach((field) => {
      const { fieldName, fieldLabel, required, fieldType, disabled, type: usedType, addonAfter, addonBefore, visible } = field;
      result.properties[fieldName] = {
        type: usedType,
        name: fieldName,
        title: fieldLabel || '',
        required: required || false,
        // disabled: +type === 1 && fieldType === 'Checkbox.Group' ? true : disabled,
        enum: field.enum,
        // default: data[fieldName] || '',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          labelWidth: 150,
          wrapperAlign: 'right',
          addonAfter: addonAfter,
          addonBefore: addonBefore
        },
        'x-disabled': +type === 1 && fieldType === 'Checkbox.Group' ? true : disabled,
        'x-hidden': visible,
        'x-component': `${(+type === 1 && fieldType !== 'Checkbox.Group') ? `PreviewText.Input` : `${fieldType}`}`,
        // type: 'string',
        // name: 'select',
        // title: 'Route' || '',
        // required: true || false,
        // enum:  [
        //   { label: '选项1', value: 1 },
        //   { label: '选项2', value: 2 },
        // ],
        // 'x-decorator': 'FormItem',
        // 'x-decorator-props': {
        //   labelWidth: 150,
        //   wrapperAlign: 'right',
        //   addonAfter: addonAfter,
        //   addonBefore: addonBefore
        // },
        // 'x-disabled': +type === 1 && fieldType === 'Checkbox.Group' ? true : disabled,
        // 'x-hidden': visible,
        // 'x-component': `Select`,
      };
    });
    return result;
  }
  /**
   * 处理详情数据
   * @param {*} data 
   */
  const handleDetailList = (data) => {
    const result = handleConfig(type, data, formConfig).map((item) => {
      // 将fields里面的字段结合type变成相应的schema，以及从对应的data里拿到对应的值赋值为default值
      const schema = item.used === 'formily' ? handleSchema(item, data) : item.schema;
      return { ...item, schema }
    });
    console.log('detailList', result)
    // 存储详情数据
    setDetailList(result)
  }


  useEffect(() => {
    (async () => {
      // 获取version列表
      handleVersionList();
      console.log('type=3', type)
      if (type) {
        // 详情数据
        let detailData = {};
        // 有code代表Detail页面
        if (fluidCode) {
          // 获取详情
          // const { object = {} } = await getFluidDetail({ fluidCode });
          const { object = [] } = {};
          detailData = object;
        }
        setDetail(detailData);
        // 处理数据
        handleDetailList(detailData);
      }
    })()
  }, [type]);
  console.log('detail={}', detail)
  /**
   * group分类
   * @param {*} list 
   */
  const handleGroupList = (list = []) => {
    const result = list.reduce((result, item) => {
      if (!result[item.ingredientGroup]) {
        result[item.ingredientGroup] = [item];
        return result;
      }
      result[item.ingredientGroup].push(item)
      return result;
    }, {});
    const lastResult = Object.entries(result).reduce((result, [key, value]) => {
      result.push({ group: `group ${key}`, groupList: value });
      return result;
    }, []);
    return lastResult;
  }

  const form = useMemo(() => {
  
    return createForm({
      initialValues: {
        ...detail,
        basicCheckGroup: ['asIvFluidAlone', 'asIvFluidConstituent', 'asSolventConventional', 'defaultBlackList'].reduce((result, item) => {
          if (detail[item] === '1') result.push(item);
          return result;
        }, []),
        fluidIngredientRelationModelList: handleGroupList(detail.fluidIngredientRelationModelList),
        ivFluidCommonDosageModelList: (detail.ivFluidCommonDosageModelList || []).map((item) => {
          return { ...item, doseUnitId: 'mL', parenteralMethodsId: 'intravenous continuous infusion' }
        }),
      },
      effects: () => {
        onFieldReact('routeId', async (field) => {
          // const result = await commonDict({ dictNo: "2", statusFlagArr: [2, 5] });
          const result = {};
          const { object = {} } = result;
          const { list = [] } = object || {};
          field.dataSource = list.map((item) => {
            return { ...item, label: item.dictSubDisplayDesc, value: item.dictSubNo }
          });
        })
        onFieldReact('formId', async (field) => {
          // const result = await commonDict({ dictNo: "4", statusFlagArr: [2, 5] }) || {};
          const result = {};
          const { object = {} } = result;
          const { list = [] } = object || {};
          field.dataSource = list.map((item) => {
            return { ...item, label: item.dictSubDisplayDesc, value: item.dictSubNo }
          });
        })
        onFieldReact('formExtraId', async (field) => {
          // const result = await commonDict({ dictNo: "6", statusFlagArr: [2, 5] });
          const result = {};
          const { object = {} } = result;
          const { list = [] } = object || {};
          field.dataSource = list.map((item) => {
            return { ...item, label: item.dictSubDisplayDesc, value: item.dictSubNo }
          });
        })
        onFieldReact('frequencyId', async (field) => {
          // const { object = [] } = await queryFrequencyList({ statusFlagArr: [2, 5] });
          const object = [];
          field.dataSource = object.map((item) => {
            return { ...item, label: item.freqAbbreviation, value: item.freqId }
          });
        })
      },
    })
  }, [type, detail]);
  /**
   * 获取历史Version的列表
   */
  const handleVersionList = async () => {
    // const result = await getChangeDataList({ code: fluidCode, itemLevel: 7 }) || {};
    const result = {};
    const { object = {} } = result;
    const { list = [] } = object || {};
    
    setVersionList(list);
  }
  console.log('versionList=[]', versionList)
  // 提交
  const handleSubmit = () => {
    return form.submit().then((values) => {
      let { fluidIngredientRelationModelList = [], basicCheckGroup = [], ivFluidCommonDosageModelList = [] } = values;
      // ingredient列表数据
      fluidIngredientRelationModelList = fluidIngredientRelationModelList.map((item, index) => {
        let { groupList = [] } = item;
        groupList = groupList.map((group) => {
          return { ...group, ingredientGroup: `${index + 1}` }
        });
        return { ...item, groupList };
      }).map((item_) => {
        return item_.groupList
      }).flat(Infinity);
      // common dosage数据
      ivFluidCommonDosageModelList = ivFluidCommonDosageModelList.map((item) => {
        return { ...item, doseUnitId: 'UN000159', parenteralMethodsId: 'PM000017' }
      })
      const result = { ...detail, ...values, tradeMasterModelList, fluidIngredientRelationModelList, ivFluidCommonDosageModelList };
      ['asIvFluidAlone', 'asIvFluidConstituent', 'asSolventConventional', 'defaultBlackList'].forEach((item => {
        result[item] = `${+(basicCheckGroup.includes(item))}`
      }));
      // 请求
      const promise = ['', fluidUpdate, fluidUpdate, fluidAdd][+type];
      // 提交
      promise({ ...result }).then((res) => {
        const { object } = res;
        if (object === 1) message.success('Save Success');
      }).catch(() => {
        message.error('Save Failed');
      }).finally(() => {
        // 修改路由
        history.replace({
          pathname: '/drugKnowledge.ivFluid',
        });
      })
    });
  }
  /**
   * 编辑
   */
  const handleEdit = () => {
    // 修改路由
    history.replace({
      pathname: '/drugKnowledge.ivFluidDetail',
      search: `?type=2&fluidCode=${fluidCode}`,
    });
  }

  /**
   * 改变版本号
   * @param {*} value 
   */
  const handleChangeVeision = (value, option) => {
    const { itemValue: { json = '{}' } = {} } = option;
    const formValue = JSON.parse(json);
    const { tradeMasterModelList } = formValue;
    // 存储详情数据
    setDetail(formValue);
    // 设置Product的列表数据
    setTradeMasterModelList(tradeMasterModelList)
    // 处理数据
    handleDetailList(formValue);
  }

  /**
   * 
   */
  const handleSuspend = () => {
    util.getMessageText({ code: 'BER0036', message: 'Confirm to Suspend?', type: 2, OkText: 'Confirm', CancelText: 'Back' }, (querys) => {
      if (querys.status > 0) {
        fluidSuspend({ serialNo: detail.serialNo }).then(() => {
          // 修改路由
          history.replace({
            pathname: '/drugKnowledge.ivFluid',
          });
        })
      }
    })

  }

  return (
    <div className="fluidAddOrDetailContainer">
      {/* 详情、编辑、新增 */}
      {(form && detailList.length > 0) && <AddOrDetail data={detailList} form={form} />}
    </div>
  )
}

export default Detail;
