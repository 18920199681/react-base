import request from '@/utils/request';

const prefix = 'service';

export default {
  // test
  queryTest: (params = {}) => {
    request.get({
      url: `${prefix}/test`,
      payload: params
    })
  }

}