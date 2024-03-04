const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories
  try {

    const categoryData = await Category.findAll({
   
      // be sure to include its associated Products
      include: {model: Product}

    });

    res.status(200).json({categoryData});

  } catch (err) {
    
    res.status(500).json(err);

  }
});

router.get('/:id', async (req, res) => {

  try {
    
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {

      // be sure to include its associated Products
      include: {model: Product}

    });

    if (!categoryData) {
      res.status(404).json({message: "No product found with that id"});
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {

  try {

    // create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  
});

router.put('/:id', async (req, res) => {

  try {

    // update a category by its `id` value
    const categoryData = await Category.update(req.body,
      {
      where: {id: req.params.id},
      });

    if (!categoryData[0]) {
      res.status(404).json({message: 'No categories with this id'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {

  try {
    
    // delete a category by its `id` value
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      return res.status(404).json({message: 'Category not found'});
    }

    await categoryData.destroy()

    res.status(200).json({message: 'Category deleted successfully'});
    
  } catch (err) {
    console.error('Error deleting category: ', err);
    res.status(500).json({ error: 'Internal server error'});
  }
});

module.exports = router;
