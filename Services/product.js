const Product = require('../Model/product');

module.exports = {
  async createProduct(product) {
    let result = await Product.create(product);
    if (result) {
      return {
        data: product,
        message: "Product successfully created!"
      };
    }
    return "Error creating new product"
  },

  async getAllProduct() {
    var resultArray = [];
    // let product = await Product.find();
    // if (product) return product;
    const options = {
      page: 1,
      limit: 5,
      collation: {
        locale: 'en'
      }
    };
    await Product.paginate({}, options).then(function (result) {
      resultArray.push(result);
    })
    if (resultArray) return resultArray;
    // console.log(result.docs)
    // result.totalDocs = 100
    // result.limit = 10
    // result.page = 1
    // result.totalPages = 10
    // result.hasNextPage = true
    // result.nextPage = 2
    // result.hasPrevPage = false
    // result.prevPage = null
    // result.pagingCounter = 1
    return "Error fetching products from db"
  },

  async getProductById(productId) {
    //console.log(productId);
    let product = await Product.findOne(productId);
    if (product) return product;
    return "Error fetching product from db";
  },
};