const sequelize = require("../config/db");

module.exports = class AppFeatures {
  constructor(query, model) {
    this.query = query;
    this.model = model;
    this.filterQuery = [];
    this.querySort = [];
    this.queryPaginate = [];
    this.queryLimit = [];
  }

  filter() {
    const queryObject = { ...this.query };

    const filterLists = ["sortBy", "page", "limit", "fields"];

    filterLists.forEach((val) => delete queryObject[val]);

    const searchObjectKey = Object.keys(queryObject);

    function priceOperator(price, filterQuery) {
      const operators = { gt: ">", gte: ">=", lt: "<", lte: "<=" };

      for (const key in price) {
        if (price.hasOwnProperty(key) && operators[key]) {
          filterQuery.push(`price ${operators[key]} ${price[key]}`);
        } else {
          filterQuery.push(`price = ${key}`);
        }
      }

      // return filterQuery;
    }

    searchObjectKey.forEach((val) => {
      if (val === "price") {
        priceOperator(queryObject[val], this.filterQuery);
      }
    });

    function otherObject(filterQuery, value) {
      searchObjectKey.forEach((val) => {
        if (val === value) {
          return filterQuery.push(
            `${value === "category" ? 'c."categoryName"' : value}  ILIKE '%${
              queryObject[val]
            }%'`
          );
        }
      });
    }

    ["name", "category", "category"].forEach((val) =>
      otherObject(this.filterQuery, val)
    );

    return this;
  }

  sort() {
    if (this.query.sort) {
      const splitSort = this.query.sort.split(",");
      let sort = [];

      splitSort.forEach((val) => {
        if (val.includes("-")) {
          sort.push(` ${val.replace("-", "")} DESC`);
        } else {
          sort.push(` ${val} ASC`);
        }
      });

      this.querySort.push(` ORDER BY ${sort}`);
    }

    return this;
  }

  limit() {
    if (this.query.limit) {
      const splitLimit = this.query.limit.split(",");

      splitLimit.forEach((val) => {
        this.queryLimit.push(`p."${val}" AS ${val}`);
      });
    }

    return this;
  }

  paginate() {
    const page = this.query.page * 1 || 1;

    const limit = this.query.limit * 1 || 2;

    const skip = (page - 1) * limit;

    this.queryPaginate.push(` LIMIT ${limit} OFFSET ${skip}`);

    return this;
  }

  async searchProducts() {
    let searchQuery = `SELECT p.*, s.id AS subcategoryId, s."subcategoryName" AS subcategoryName, 
    c.id AS categoryId, c."categoryName" AS categoryName FROM products p JOIN subcategories s 
    ON p."subcategoryId" = s.id JOIN categories c ON s."categoryId" = c.id `;

    searchQuery =
      this.queryLimit.length > 0
        ? (searchQuery = searchQuery.replace("p.*", this.queryLimit))
        : (searchQuery += "");

    searchQuery =
      this.filterQuery.length > 0
        ? (searchQuery +=
            " WHERE " + this.filterQuery.join(" AND ") + this.querySort)
        : (searchQuery += this.querySort + this.queryPaginate);

    return await sequelize.query(searchQuery);
  }
};

// class appFeatures {

//   constructor(query, model) {
//     this.query = query;
//     this.model = model;
//     this.queryObj = {};
//   };

//   filter() {
//     const queryObject = { ...this.query };

//     const filterLists = ['sortBy', 'page', 'limit', 'fields'];

//     filterLists.forEach(val => delete queryObject[val]);

//     this.queryObj.where = queryObject;

//     return this;
//   };

//   limiting() {
//     if (this.query.limit) {
//       const limitFields = this.query.limit.split(',');
//       this.queryObj.attributes = limitFields;
//       this.queryObj.raw = true;

//     };

//     return this;

//   };

//   sorting() {
//     if (this.query.sortBy) {

//       const orderBy = 'DESC' || 'ASC';

//       const sortBy = this.query.sortBy.split(',');

//       sortBy.push(orderBy);
//       sortBy.pop();
//       this.queryObj.order = [sortBy];

//     };

//     return this;

//   };

//   paginate() {
//     const page = this.query.page * 1 || 1;

//     const limit = this.query.limit * 1 || 5;

//     const skip = (page - 1) * limit;

//     this.queryObj.limit = limit;
//     this.queryObj.offset = skip;

//     return this;
//   }

//   async searchProducts() {
//     return await this.model.findAll(this.queryObj);
//   }

// };

// module.exports = appFeatures;
