export class UserInfo {
  constructor({userName, userInfo, userAvatar}, api) {
    this._userNameElement = document.querySelector(userName);
    this._userInfoElement = document.querySelector(userInfo);
    this._userAvatarElement = document.querySelector(userAvatar)
    this._api = api;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent
    }
  }

  setAvatar(userAvatar) {
    this._userAvatarElement.src = userAvatar;
  }

  setUserInfo({userName, userInfo}) {
    this._userNameElement.textContent = userName;
    this._userInfoElement.textContent = userInfo;
  }

  initServerInfo() {
    this._api.getUser()
      .then((res) => {
        this.setUserInfo({
          userName: res.name,
          userInfo: res.about
        });
        this.setAvatar(res.avatar)
        this._id = res._id;
      });
  }
}
