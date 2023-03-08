
import React from "react";
import { history } from 'umi'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import '../global.less'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})
const form = createForm()
const HomePage = () => {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <button onClick={() => history.push({ pathname: '/detail', search: `?type=3` })}>跳转detail</button>
      {/* <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Number
            name="select"
            title="选择框"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
            ]}
            x-component-props={{
              style: {
                width: 120,
              },
            }}
          />
          <FormButtonGroup>
            <Submit onSubmit={console.log}>提交</Submit>
          </FormButtonGroup>
        </SchemaField>
      </FormProvider> */}
    </div>
  );
}
export default HomePage
