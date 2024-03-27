const { faker } = require('@faker-js/faker')
const fs = require('fs')

const randomCategoryList = (n) => {
  if (n <=0 ) return []

  const categoryList = []

  
  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(), 
      updatedAt: Date.now()
    }
    categoryList.push(category)
  })

  return categoryList
}

const randomProductList = (categoryList, n) => {
  if (n <=0 ) return []

  const productList = []

  // random data
  for(const category of categoryList) {
    Array.from(new Array(n)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        color: faker.color.human(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnail: faker.image.url(400, 400),
      }

      productList.push(product)
    })
  }

  return productList
}

// IFFE
(() => {
  // generate random data
  const categoryList = randomCategoryList(4)
  const productList = randomProductList(categoryList, 5)
  // prepare db
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Catman'
    }
  }

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), function (err) {
    console.log('Data generated successfully');
  })
})()