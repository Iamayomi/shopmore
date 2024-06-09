const sequelize = require("../config/db");


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
    console.log(searchObjectKey)

    function priceOperator(OP){
         const operators = { gt: '>', gte: '>=', lt: '<', lte: '<=' };
          
          for(const key in Op) {
            if(Op.hasOwnProperty(key) && operators[key]){
               this.queryList.push(`price ${( operators[key] )} ${( Op[key] )}`);
            }
          };

          if(!Object.Values(price)) {
         this.queryList.push(`price = ${( Op[key])}`);
          }
    };
 
    for(const searchKey of searchObjectKey){
      if(searchKey === 'price'){
          const price = queryObject[searchKey];       
          operatorPrice(price);

      }
      if(searchKey === 'name') {
          const name = queryObject[searchKey];
          this.queryList.push(`name = '${name}'`);
      }
      if(searchKey === 'category'){
          const category = queryObject[searchKey];
            this.queryList.push(`c."categoryName" = '${category}'`);
      }
      if(searchKey === 'subcategory'){
          const subcategory = queryObject[searchKey];
          console.log(subcategory)
            this.queryList.push(`s."subCategoryName" = '${subcategory}'`);
      }
    }


    return this;
  };


   async search() {

    let searchQuery = `SELECT p.*, s.id AS subcategoryId, s."subCategoryName" AS subcategoryName, c.id AS categoryId, c."categoryName" AS categoryName FROM products p JOIN subcategories s ON p."subcategoryId" = s.id JOIN categories c ON s."categoryId" = c.id `;

    if(this.queryList.length > 0){
         searchQuery += ' WHERE ' + this.queryList.join(' AND ');
    }

     return await sequelize.query(searchQuery);
  };

};


// const sequelize = require("../config/db");

// module.exports = class AppFeatures {
//   constructor(query, model) {
//     this.query = query;
//     this.model = model;
//     this.queryList = [];
//   };

//   filter() {
//     const queryObject = { ...this.query };
//     const filterLists = ['sortBy', 'page', 'limit', 'fields'];
    
//     filterLists.forEach(val => delete queryObject[val]);
    
//     const searchObjectKey = Object.keys(queryObject);

//     searchObjectKey.forEach(searchKey => {
//       switch (searchKey) {
//         case 'price':
//           this.handlePriceQuery(queryObject[searchKey]);
//           break;
//         case 'name':
//           this.queryList.push(`name = '${queryObject[searchKey]}'`);
//           break;
//         case 'category':
//           this.queryList.push(`c."categoryName" = '${queryObject[searchKey]}'`);
//           break;
//         case 'subcategory':
//           this.queryList.push(`s."subCategoryName" = '${queryObject[searchKey]}'`);
//           break;
//         default:
//           break;
//       }
//     });

//     return this;
//   };

//   handlePriceQuery(priceQuery) {
//     const { gt, gte, lt, lte } = priceQuery;
//     const operators = { gt: '>', gte: '>=', lt: '<', lte: '<=' };
    
//     for (const key in operators) {
//       if (priceQuery.hasOwnProperty(key) && priceQuery[key]) {
//         this.queryList.push(`price ${operators[key]} ${priceQuery[key]}`);
//       }
//     }

//     if (!Object.values(priceQuery).some(val => val)) {
//       this.queryList.push(`price = '${priceQuery}'`);
//     }
//   }

//   async search() {
//     const searchQuery = `SELECT p.*, s.id AS subcategoryId, s."subCategoryName" AS subcategoryName, c.id AS categoryId, c."categoryName" AS categoryName FROM products p JOIN subcategories s ON p."subcategoryId" = s.id JOIN categories c ON s."categoryId" = c.id ` + this.queryList.join(' AND ');
    
//     console.log(searchQuery);
//     return await sequelize.query(searchQuery);
//   };
// };

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