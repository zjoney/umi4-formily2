import { tableS as tableServices } from '../services';

export default {
  namespace: 'table',
  state: {
    list: [], 
    pagination: {},
  },

  effects:{
    //list
    *query({ payload, callback }, { call, put }) {
      const result = yield call(tableServices.query, payload);
      // if (result.status !== 0) {
        yield put({
          type: 'save',
          payload: {
            list: data.rows || [],
            pagination: {
              current: Number(payload.pageNo) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
        callback && callback(result.object);
      // }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
}