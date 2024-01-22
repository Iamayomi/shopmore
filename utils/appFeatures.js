// class APISerach {
//     constructor(query, queryStr) {
//             this.query = query,
//             this.queryStr = queryStr;
//     };

//     filter() {
//         const queryObj = { ...this.queryStr };
//         const queryField = ['sort', 'limit', 'page', 'fields'];
//         queryField.forEach(val => delete queryObj[val]);

//         let strQuery = JSON.stringify(queryObj);
// 		console.log(strQuery);
		

//         return this;
//     };
// };


// module.exports = APISerach;
