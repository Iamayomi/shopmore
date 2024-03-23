class appFeatures {

  constructor(query, model) {
    this.query = query;
    this.model = model;
    this.queryObj = {};
  };

  filter() {
    const queryFields = { ...this.query };
    const filterLists = ['sortBy', 'page', 'limit', 'fields'];

    filterLists.filter(val => delete queryFields[val]);

    this.queryObj.where = queryFields;

    return this;
  };

  limiting() {
    if (this.query.limit) {
      const limitFields = this.query.limit.split(',');
      this.queryObj.attributes = limitFields;
      this.queryObj.raw = true;

    };

    return this;

  };

  sorting() {
    if (this.query.sortBy) {

      const orderBy = 'DESC' || 'ASC';

      const sortBy = this.query.sortBy.split(',');

      sortBy.push(orderBy);
      sortBy.pop();
      this.queryObj.order = [sortBy];

    };

    return this;

  };

  paginate() {
    const page = this.query.page * 1 || 1;

    const limit = this.query.limit * 1 || 5;

    const skip = (page - 1) * limit;

    this.queryObj.limit = limit;
    this.queryObj.offset = skip;

    return this;
  }


  async searchProducts() {
    return await this.model.findAll(this.queryObj);
  }

};


module.exports = appFeatures;