export class UserInfo {
  constructor({userName, userInfo}) {
    this._userNameElement = document.querySelector(userName);
    this._userInfoElement = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent
    }
  }

  setUserInfo({userName, userInfo}) {
    this._userNameElement.textContent = userName;
    this._userInfoElement.textContent = userInfo;
  }
}
