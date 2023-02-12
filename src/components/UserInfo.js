export class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
    return {
      userName: document.querySelector(this._userName).textContent,
      userInfo: document.querySelector(this._userInfo).textContent
    }
  }

  setUserInfo({userName, userInfo}) {
    document.querySelector(this._userName).textContent = userName;
    document.querySelector((this._userInfo)).textContent = userInfo;
  }
}
