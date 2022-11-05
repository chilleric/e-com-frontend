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
    updatePassword: '/settings/update-password',
    updateGeneralSettings: '/settings/update-general-settings',
    updateAccountSettings: '/settings/update-account-settings',
    getGeneralSettings: '/settings/get-general-settings',
  },
}
