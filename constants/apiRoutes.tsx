export const apiRoute = {
  user: {
    getListUser: 'user/get-list-users',
    getDetailUser: 'user/get-detail-user',
    changeStatus: 'user/change-status-user',
    addNewUser: 'user/add-new-user',
    updateUser: 'user/update-user',
  },
  auth: {
    login: '/auth/login',
    signUp: '/auth/register',
    verifySignUp: '/auth/verify-email',
    logout: '/auth/logout',
  },
  settings: {
    updatePassword: 'settings/update-password',
    updateGeneralSettings: 'settings/update-general-settings',
    updateAccountSettings: 'settings/update-account-settings',
    getGeneralSettings: 'settings/get-general-settings',
  },
  permissions: {
    updatePermission: 'permission/update-permission',
    deletePermission: 'permission/delete-permission',
    addPermission: 'permission/add-new-permission',
    getListPermission: '/permission/get-list-permissions',
  },
  feature: {
    getFeatureList: 'feature/get-list-feature',
    changeStatusFeature: 'feature/change-status',
  },
  message: {
    toChatRoom: 'message/to-chat-room',
    outChatRoom: 'message/out-chat-room',
    sendMessage: 'message/send-message',
    onlineUser: 'message/online-users',
    getLastMessage: 'message/get-last-messages',
    getOldMessage: 'message/get-old-messages',
    getChatRooms: 'message/get-chat-room',
  },
  language: {
    getLanguageSelectList: 'language/get-language-select-list',
    getLanguageList: 'language/get-language-list',
    getLanguageByKey: 'language/get-language-by-key',
    getDefaultDictionary: 'language/get-default-dictionary',
    addNewLanguage: 'language/add-new-language',
    updateLanguage: 'language/update-language',
  },
}
