/** @format */

import "mobx-react/batchingForReactDom";
import { observable, action, makeObservable } from "mobx";

class UserStore {
  user = null;
  bol = null;
  name = null;

  setUser = (user) => {
    console.log("user", user);
    this.user = user;
  };

  setBol = (val) => {
    this.bol = val;
  };
  setName = (val) => {
    this.name = val;
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      bol: observable,
      name: observable,
      setUser: action,
      setBol: action,
      setName: action,
    });
  }
}

export default new UserStore();
