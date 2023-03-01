import { UsersDAO } from '../dao';

class UsersCtrl {

  static async apiGetUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    const filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.zipcode) {
      filters.email = req.query.email;
    }
    const { usersList, totalNumUsers } = await UsersDAO.getUsers({
      filters,
      page,
      usersPerPage,
    });

    const response = {
      restaurants: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    };
    res.json(response);
  }
  static async apiGetRestaurantById(req, res, next) {
    try {
      const id = req.params.id || {};
      const restaurant = await UsersDAO.getUserById(id);
      if (!restaurant) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(restaurant);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetUserEmail(req, res, next) {
    try {
      const emails = await UsersDAO.getEmails();
      res.json(emails);
    } catch (err) {
      console.log(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }
}

export { UsersCtrl };