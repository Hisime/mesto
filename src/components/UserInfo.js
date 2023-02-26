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

  setUserInfo({userName, userInfo, userId, userAvatar}) {
    this._userNameElement.textContent = userName;
    this._userInfoElement.textContent = userInfo;
    this._userId = userId;
    this._userAvatarElement.src = userAvatar;
  }
}
