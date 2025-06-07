import Product from '../models/products.js';


const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Basketball",
        category: "Sports",
        price: 49,
        inStock: false,
        tags: ["sport", "ball"],
      },
      {
        name: "T-Shirt",
        category: "Fashion",
        price: 129,
        inStock: true,
        tags: ["clothing", "fashion"],
      },
      {
        name: "Jeans",
        category: "Fashion",
        price: 59,
        inStock: false,
        tags: ["clothing", "fashion"],
      },
    ];

    const result = await Product.insertMany(sampleProducts);

    return res.status(200).json({
      success: true,
      message: `Inserted ${result.length} sample products successfully`,
      data: result
    });


  } catch (error) {
    console.error("Error inserting sample products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to insert sample products"
    });

  }
}

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: { $gte: 100 }
        }
      }
    ])
    return res.status(200).json({
      success: true,
      message: "Product stats fetched successfully",
      data: result
    })
  } catch (error) {
    console.error("Error getting product stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get product stats"
    });
  }
}

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics"
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price"
          },
          averagePrice: {
            $avg: "$price"
          },
          maxProductPrice: {
            $max: "$price"
          },
          minProductPrice: {
            $min: "$price"
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"]
          }
        }
      }
    ])
    return res.status(200).json({
      success: true,
      message: "Product analysis fetched successfully",
      data: result
    })
  } catch (error) {
    console.error("Error getting product analysis:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get product analysis"
    });
  }
}

export {
  insertSampleProducts,
  getProductStats,
  getProductAnalysis
};
