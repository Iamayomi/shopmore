// const sequelize = require("../config/db");


module.exports = class AppFeatures{

  constructor(query, model) {
    this.query = query;
    this.model = model;
    this.queryList = [];
  };

  filter() {
    const queryObject = { ...this.query };

    const filterLists = ['sortBy', 'page', 'limit', 'fields'];

    filterLists.forEach(val => delete queryObject[val]);
  
    const searchObjectKey = Object.keys(queryObject);

    function operator(Op, queryList){
      let op, val;
      if(Op.gt){
        op = '>';
        val = Op.gt;
      }if(Op.gte){
        op = '>=';
        val = Op.gt;
      } if(Op.lt){
        op = '<'
        val = Op.gt;
      } if(Op.lte){
        op = '<=';
        val = Op.gt;
      };
      
      queryList.push(`price ${( op ? op : '')} ${( val ? val : '')}`);

    };
 
    for(const searchKey of searchObjectKey){
      if(searchKey === 'price'){
          const price = queryObject[searchKey];
          operator(price, this.queryList);
      }
      if(searchKey === 'name') {
          const name = queryObject[searchKey];
          this.queryList.push(`name = '${name}'`);
      }
    }

    return this;
  };


   async search() {
    let searchQuery = "SELECT * FROM products WHERE " + this.queryList;
    searchQuery = searchQuery.replace(',', ' AND ');

     return await sequelize.query(searchQuery);
  };

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