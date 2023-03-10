import { defineConfig } from "umi";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  dva:{},
  routes: [
    { path: "/", component: "index" },
    {path: '/details', component: 'detail'},
    {path: '/hooks', component: 'hook'},
  ],
  npmClient: 'npm',
});
