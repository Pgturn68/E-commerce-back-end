const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
        id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
})
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'There is no category with the id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
});


  router.post("/", (req, res) => {
    // create a new category
    Category.create({
      category_name: req.body.category_name
    })
      .then(dbProductData => res.json(dbProductData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
})
.then(dbCatData => {
    if (!dbCatData) {
        res.status(404).json({ message: 'There is no category with this id' });
        return;
    }
    res.json(dbCatData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'There is no category with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // delete a category by its `id` value
});

module.exports = router;
