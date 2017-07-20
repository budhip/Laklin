module.exports = {
  userRole(role) {
    let menuDashboard = [];
    switch (role) {
      case "admin":
        menuDashboard = ['dashboard', 'users', 'packets']
        return menuDashboard
        break;
      case "customer":
        menuDashboard = ['dashboard', 'users']
        return menuDashboard
        break;
      default:
      return 'dashboard'
    }
  }
};
