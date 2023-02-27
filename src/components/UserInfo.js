export class UserInfo {
  constructor({userName, userInfo, userAvatar}) {
    this._userNameElement = document.querySelector(userName);
    this._userInfoElement = document.querySelector(userInfo);
    this._userAvatarElement = document.querySelector(userAvatar)
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent,
      userId: this._userId,
    }
  }

  setUserInfo({name, about, _id, avatar}) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
    this._userId = _id;
    this._userAvatarElement.src = avatar;
  }
}
