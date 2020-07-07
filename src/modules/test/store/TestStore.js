import { observable, action, computed } from "mobx";
// import service from "../service";

class TestStore {
  @observable mobxDataTest = 'mobxDataTest';

  @computed get computedTest() {
    return 'computed-test';
  }

  @action async actionTest() {
    console.log('action-test');

    // const result = await service.queryTest();
    // if (result) {
    //   console.log('success');
    // }
  }
};

export default new TestStore();
