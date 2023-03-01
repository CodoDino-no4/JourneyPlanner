import {MongoClient} from 'mongodb';
let users: any;

class Users {
  static async injectDB(conn: MongoClient) {
    if (users) {
      return;
    }
    try {
      users = await conn.db('sample_mflix').collection('users');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in Users class: ${e}`,
      );
    }
  }

  static async getUsers({
    filters = null,
    page = 0,
    usersPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } };
      } else if ('email' in filters) {
        query = { 'email': { $eq: filters['email'] } };
      }
    }

    let cursor;
    
    try {
      cursor = await users
        .find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { userssList: [], totalNumUsers: 0 };
    }

    const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page);

    try {
      const usersList = await displayCursor.toArray();
      const totalNumUsers = await users.countDocuments(query);

      return { usersList, totalNumUsers };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      );
      return { usersList: [], totalNumUsers: 0 };
    }
  }

// static async getUserByID(id) {
//     try {
//       const pipeline = [
//         {
//             $match: {
//                 _id: new ObjectId(id),
//             },
//         },
//               {
//                   $lookup: {
//                       from: "reviews",
//                       let: {
//                           id: "$_id",
//                       },
//                       pipeline: [
//                           {
//                               $match: {
//                                   $expr: {
//                                       $eq: ["$restaurant_id", "$$id"],
//                                   },
//                               },
//                           },
//                           {
//                               $sort: {
//                                   date: -1,
//                               },
//                           },
//                       ],
//                       as: "reviews",
//                   },
//               },
//               {
//                   $addFields: {
//                       reviews: "$reviews",
//                   },
//               },
//           ]
//       return await restaurants.aggregate(pipeline).next()
//     } catch (e) {
//       console.error(`Something went wrong in getRestaurantByID: ${e}`)
//       throw e
//     }
}

export { Users as UsersDAO };