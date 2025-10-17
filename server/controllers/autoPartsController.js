const AutoParts = require('../models/autoPartsModel');

// Get all auto parts with filtering and search
const getAllAutoParts = async (req, res) => {
  try {
    const {
      search,
      company,
      category,
      vehicleType,
      fuelType,
      transmission,
      stockStatus,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    // Text search across multiple fields
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { vehicleName: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { partNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by company (can be multiple)
    if (company) {
      const companies = Array.isArray(company) ? company : company.split(',');
      filter.company = { $in: companies };
    }

    // Filter by category (can be multiple)
    if (category) {
      const categories = Array.isArray(category) ? category : category.split(',');
      filter.category = { $in: categories };
    }

    // Filter by vehicle type (can be multiple)
    if (vehicleType) {
      const vehicleTypes = Array.isArray(vehicleType) ? vehicleType : vehicleType.split(',');
      filter.vehicleType = { $in: vehicleTypes };
    }

    // Filter by fuel type (can be multiple)
    if (fuelType) {
      const fuelTypes = Array.isArray(fuelType) ? fuelType : fuelType.split(',');
      filter.fuelType = { $in: fuelTypes };
    }

    // Filter by transmission
    if (transmission) {
      const transmissions = Array.isArray(transmission) ? transmission : transmission.split(',');
      filter.transmission = { $in: transmissions };
    }

    // Filter by stock status
    if (stockStatus) {
      filter.stockStatus = stockStatus;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const parts = await AutoParts.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalParts = await AutoParts.countDocuments(filter);
    const totalPages = Math.ceil(totalParts / parseInt(limit));

    res.json({
      success: true,
      data: parts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: totalParts,
        itemsPerPage: parseInt(limit),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching auto parts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching auto parts',
      error: error.message
    });
  }
};

// Get single auto part by ID
const getAutoPartById = async (req, res) => {
  try {
    const { id } = req.params;
    const part = await AutoParts.findById(id);

    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Auto part not found'
      });
    }

    res.json({
      success: true,
      data: part
    });
  } catch (error) {
    console.error('Error fetching auto part:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching auto part',
      error: error.message
    });
  }
};

// Get filter options (for dropdown menus)
const getFilterOptions = async (req, res) => {
  try {
    const [companies, categories, vehicleTypes, fuelTypes, transmissions] = await Promise.all([
      AutoParts.distinct('company', { isActive: true }),
      AutoParts.distinct('category', { isActive: true }),
      AutoParts.distinct('vehicleType', { isActive: true }),
      AutoParts.distinct('fuelType', { isActive: true }),
      AutoParts.distinct('transmission', { isActive: true })
    ]);

    // Get counts for each filter option
    const companyCounts = await AutoParts.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$company', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const categoryCounts = await AutoParts.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const vehicleTypeCounts = await AutoParts.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$vehicleType', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const fuelTypeCounts = await AutoParts.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$fuelType', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        companies: companyCounts.map(item => ({ name: item._id, count: item.count })),
        categories: categoryCounts.map(item => ({ name: item._id, count: item.count })),
        vehicleTypes: vehicleTypeCounts.map(item => ({ name: item._id, count: item.count })),
        fuelTypes: fuelTypeCounts.map(item => ({ name: item._id, count: item.count })),
        transmissions: transmissions
      }
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
};

// Create new auto part (admin only)
const createAutoPart = async (req, res) => {
  try {
    const part = new AutoParts(req.body);
    await part.save();

    res.status(201).json({
      success: true,
      message: 'Auto part created successfully',
      data: part
    });
  } catch (error) {
    console.error('Error creating auto part:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating auto part',
      error: error.message
    });
  }
};

// Update auto part (admin only)
const updateAutoPart = async (req, res) => {
  try {
    const { id } = req.params;
    const part = await AutoParts.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Auto part not found'
      });
    }

    res.json({
      success: true,
      message: 'Auto part updated successfully',
      data: part
    });
  } catch (error) {
    console.error('Error updating auto part:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating auto part',
      error: error.message
    });
  }
};

// Delete auto part (admin only)
const deleteAutoPart = async (req, res) => {
  try {
    const { id } = req.params;
    const part = await AutoParts.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Auto part not found'
      });
    }

    res.json({
      success: true,
      message: 'Auto part deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting auto part:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting auto part',
      error: error.message
    });
  }
};

// Seed dummy data
const seedDummyData = async (req, res) => {
  try {
    // Clear existing data
    await AutoParts.deleteMany({});

    const dummyData = [
      {
        title: "Hyundai Creta Brake Pad Set",
        brand: "Hyundai",
        category: "Braking System",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Compatibility": "Front and Rear Wheels",
          "Material": "Ceramic",
          "Durability": "50000 km",
          "Warranty": "2 Years"
        },
        stockStatus: "in-stock",
        reviews: 178,
        price: 4200.0,
        discountedPrice: 4000.0,
        partNumber: "CRETA-BRKPAD-2024",
        warranty: "2 Years",
        imgs: {
          thumbnails: ["/images/parts/brakepad-thumb.png"],
          previews: ["/images/parts/brakepad-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Air Filter",
        brand: "Hyundai",
        category: "Engine Components",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Filter Type": "Paper Pleated",
          "Change Interval": "10000 km",
          "Compatibility": "1.5L MPi Engine",
          "Manufacturer": "Hyundai Genuine"
        },
        stockStatus: "in-stock",
        reviews: 95,
        price: 950.0,
        discountedPrice: 890.0,
        partNumber: "CRETA-AIRFLT-2024",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/airfilter-thumb.jpg"],
          previews: ["/images/parts/airfilter-prev.jpg"]
        }
      },
      {
        title: "Hyundai Creta Oil Filter",
        brand: "Hyundai",
        category: "Engine Components",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Filter Type": "Spin-On",
          "Micron Rating": "25",
          "Material": "High-Grade Steel",
          "Recommended Change": "5000 km"
        },
        stockStatus: "in-stock",
        reviews: 102,
        price: 650.0,
        discountedPrice: 600.0,
        partNumber: "CRETA-OILFLT-2024",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/oilfilter-thumb.png"],
          previews: ["/images/parts/oilfilter-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Front Bumper",
        brand: "Hyundai",
        category: "Body Parts",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Color": "Primed (Unpainted)",
          "Material": "ABS Plastic",
          "Type": "OEM Fit",
          "Includes": "Mounting Clips"
        },
        stockStatus: "in-stock",
        reviews: 67,
        price: 11500.0,
        discountedPrice: 10900.0,
        partNumber: "CRETA-FBUMP-2024",
        warranty: "6 Months",
        imgs: {
          thumbnails: ["/images/parts/frontbumper-thumb.png"],
          previews: ["/images/parts/frontbumper-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Headlamp Assembly (Left)",
        brand: "Hyundai",
        category: "Lighting",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Type": "Projector LED",
          "Position": "Left",
          "Voltage": "12V",
          "Warranty": "1 Year"
        },
        stockStatus: "in-stock",
        reviews: 222,
        price: 18500.0,
        discountedPrice: 17700.0,
        partNumber: "CRETA-HDLMP-L-2024",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/headlamp-thumb.png"],
          previews: ["/images/parts/headlamp-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Tail Light (Right)",
        brand: "Hyundai",
        category: "Lighting",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Type": "LED",
          "Compatibility": "2017-2025 Models",
          "Position": "Right Rear",
          "Power": "15W"
        },
        stockStatus: "in-stock",
        reviews: 185,
        price: 9400.0,
        discountedPrice: 9000.0,
        partNumber: "CRETA-TAILLMP-R-2024",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/taillamp-thumb.png"],
          previews: ["/images/parts/taillamp-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Side Mirror Assembly (Left)",
        brand: "Hyundai",
        category: "Mirrors and Exteriors",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Folding": "Electric",
          "Color": "Body Colored",
          "Heating Function": "Yes",
          "Turn Indicator": "Integrated LED"
        },
        stockStatus: "in-stock",
        reviews: 132,
        price: 7200.0,
        discountedPrice: 6900.0,
        partNumber: "CRETA-SMIR-L-2024",
        warranty: "2 Years",
        imgs: {
          thumbnails: ["/images/parts/sidemirror-thumb.png"],
          previews: ["/images/parts/sidemirror-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Wiper Blade Set",
        brand: "Hyundai",
        category: "Accessories",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Length": "24 + 16 inch",
          "Material": "Rubber + Silicone",
          "UV Resistant": "Yes",
          "Fit Type": "Direct Fit"
        },
        stockStatus: "in-stock",
        reviews: 300,
        price: 1200.0,
        discountedPrice: 1100.0,
        partNumber: "CRETA-WIPER-2024",
        warranty: "6 Months",
        imgs: {
          thumbnails: ["/images/parts/wiper-thumb.png"],
          previews: ["/images/parts/wiper-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Engine Mount",
        brand: "Hyundai",
        category: "Engine Components",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Material": "Rubber + Metal",
          "Position": "Front Left",
          "Durability": "80000 km",
          "OEM Certified": "Yes"
        },
        stockStatus: "in-stock",
        reviews: 71,
        price: 5500.0,
        discountedPrice: 5200.0,
        partNumber: "CRETA-ENGMNT-2024",
        warranty: "2 Years",
        imgs: {
          thumbnails: ["/images/parts/enginemount-thumb.png"],
          previews: ["/images/parts/enginemount-prev.png"]
        }
      },
      {
        title: "Hyundai Creta Rear Shock Absorber Set",
        brand: "Hyundai",
        category: "Suspension System",
        vehicleType: "Car",
        vehicleName: "Hyundai Creta",
        company: "Hyundai",
        model: "Creta2017",
        variant: "SX Executive",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Type": "Hydraulic Gas Filled",
          "Position": "Rear",
          "Durability": "70000 km",
          "Material": "Steel"
        },
        stockStatus: "in-stock",
        reviews: 188,
        price: 8800.0,
        discountedPrice: 8300.0,
        partNumber: "CRETA-SHCKABS-2024",
        warranty: "1.5 Years",
        imgs: {
          thumbnails: ["/images/parts/shock-abs-thumb.png"],
          previews: ["/images/parts/shock-abs-prev.png"]
        }
      },
      // Additional auto parts data
      {
        title: "Maruti Alto Engine Oil Filter",
        brand: "Maruti",
        category: "Engine Components",
        vehicleType: "Car",
        vehicleName: "Maruti Alto",
        company: "Maruti Suzuki",
        model: "Alto2018",
        variant: "Standard",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Filter Type": "Spin-On",
          "Micron Rating": "20",
          "Material": "Steel",
          "Recommended Change": "5000 km"
        },
        stockStatus: "in-stock",
        reviews: 120,
        price: 450.0,
        discountedPrice: 430.0,
        partNumber: "ALTO-OILFLT-2018",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/oilfilter-alto-thumb.png"],
          previews: ["/images/parts/oilfilter-alto-prev.png"]
        }
      },
      {
        title: "Hyundai i20 Headlamp Assembly (Right)",
        brand: "Hyundai",
        category: "Lighting",
        vehicleType: "Car",
        vehicleName: "Hyundai i20",
        company: "Hyundai",
        model: "i202019",
        variant: "Asta",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Type": "Halogen",
          "Position": "Right",
          "Voltage": "12V",
          "Warranty": "1 Year"
        },
        stockStatus: "in-stock",
        reviews: 95,
        price: 12500.0,
        discountedPrice: 11800.0,
        partNumber: "I20-HDLMP-R-2019",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/headlamp-i20-thumb.png"],
          previews: ["/images/parts/headlamp-i20-prev.png"]
        }
      },
      {
        title: "Tata Nexon Brake Disc",
        brand: "Tata",
        category: "Braking System",
        vehicleType: "SUV",
        vehicleName: "Tata Nexon",
        company: "Tata Motors",
        model: "Nexon2020",
        variant: "XE",
        fuelType: "Diesel",
        transmission: "Manual",
        specifications: {
          "Material": "Cast Iron",
          "Diameter": "240 mm",
          "Thickness": "22 mm",
          "Warranty": "2 Years"
        },
        stockStatus: "in-stock",
        reviews: 77,
        price: 5250.0,
        discountedPrice: 5000.0,
        partNumber: "NEXON-BRDISC-2020",
        warranty: "2 Years",
        imgs: {
          thumbnails: ["/images/parts/brakedisc-nexon-thumb.png"],
          previews: ["/images/parts/brakedisc-nexon-prev.png"]
        }
      },
      {
        title: "Mahindra Thar Front Grill",
        brand: "Mahindra",
        category: "Body Parts",
        vehicleType: "SUV",
        vehicleName: "Mahindra Thar",
        company: "Mahindra",
        model: "Thar2021",
        variant: "LX",
        fuelType: "Diesel",
        transmission: "Manual",
        specifications: {
          "Material": "ABS Plastic",
          "Color": "Black",
          "Finish": "Matte",
          "OEM Certified": "Yes"
        },
        stockStatus: "in-stock",
        reviews: 54,
        price: 8900.0,
        discountedPrice: 8500.0,
        partNumber: "THAR-GRILL-FR-2021",
        warranty: "6 Months",
        imgs: {
          thumbnails: ["/images/parts/grill-thar-thumb.png"],
          previews: ["/images/parts/grill-thar-prev.png"]
        }
      },
      {
        title: "Toyota Innova Fuel Pump",
        brand: "Toyota",
        category: "Fuel System",
        vehicleType: "Van",
        vehicleName: "Toyota Innova",
        company: "Toyota",
        model: "Innova2018",
        variant: "Crysta",
        fuelType: "Diesel",
        transmission: "Automatic",
        specifications: {
          "Type": "Electric",
          "Voltage": "12V",
          "Flow Rate": "130 LPH",
          "Warranty": "2 Years"
        },
        stockStatus: "in-stock",
        reviews: 101,
        price: 14500.0,
        discountedPrice: 13900.0,
        partNumber: "INNOVA-FUELPMP-2018",
        warranty: "2 Years",
        imgs: {
          thumbnails: ["/images/parts/fuelpump-innova-thumb.png"],
          previews: ["/images/parts/fuelpump-innova-prev.png"]
        }
      },
      {
        title: "Honda Amaze Radiator",
        brand: "Honda",
        category: "Cooling System",
        vehicleType: "Car",
        vehicleName: "Honda Amaze",
        company: "Honda",
        model: "Amaze2019",
        variant: "VX",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Material": "Aluminum",
          "Core Thickness": "30 mm",
          "Cooling Capacity": "10 kW",
          "Warranty": "1 Year"
        },
        stockStatus: "in-stock",
        reviews: 86,
        price: 9800.0,
        discountedPrice: 9400.0,
        partNumber: "AMAZE-RADIATOR-2019",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/radiator-amaze-thumb.png"],
          previews: ["/images/parts/radiator-amaze-prev.png"]
        }
      },
      {
        title: "Kia Seltos Alloy Wheel 16 inch",
        brand: "Kia",
        category: "Wheels and Tires",
        vehicleType: "SUV",
        vehicleName: "Kia Seltos",
        company: "Kia",
        model: "Seltos2020",
        variant: "HTK Plus",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Size": "16 inch",
          "Material": "Aluminum Alloy",
          "Finish": "Gunmetal",
          "Fitment": "5x114.3"
        },
        stockStatus: "in-stock",
        reviews: 144,
        price: 11250.0,
        discountedPrice: 10800.0,
        partNumber: "SELTOS-ALWHE-16-2020",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/alloywheel-seltos-thumb.png"],
          previews: ["/images/parts/alloywheel-seltos-prev.png"]
        }
      },
      {
        title: "Maruti Eeco Front Brake Caliper",
        brand: "Maruti",
        category: "Braking System",
        vehicleType: "Van",
        vehicleName: "Maruti Eeco",
        company: "Maruti Suzuki",
        model: "Eeco2017",
        variant: "Standard",
        fuelType: "Petrol",
        transmission: "Manual",
        specifications: {
          "Type": "Single Piston",
          "Material": "Aluminum",
          "Position": "Front Left",
          "Warranty": "1 Year"
        },
        stockStatus: "in-stock",
        reviews: 64,
        price: 5500.0,
        discountedPrice: 5200.0,
        partNumber: "EECO-BRCALIP-F-2017",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/brakecaliper-eeco-thumb.png"],
          previews: ["/images/parts/brakecaliper-eeco-prev.png"]
        }
      },
      {
        title: "Tata Harrier Power Steering Pump",
        brand: "Tata",
        category: "Steering System",
        vehicleType: "SUV",
        vehicleName: "Tata Harrier",
        company: "Tata Motors",
        model: "Harrier2020",
        variant: "XE",
        fuelType: "Diesel",
        transmission: "Automatic",
        specifications: {
          "Type": "Hydraulic",
          "Pressure": "1200 PSI",
          "Warranty": "2 Years"
        },
        stockStatus: "in-stock",
        reviews: 50,
        price: 16500.0,
        discountedPrice: 16000.0,
        partNumber: "HARRIER-PSPUMP-2020",
        warranty: "2 Years",
        imgs: {
          thumbnails: ["/images/parts/steeringpump-harrier-thumb.png"],
          previews: ["/images/parts/steeringpump-harrier-prev.png"]
        }
      },
      {
        title: "Mahindra Bolero Tailgate Door",
        brand: "Mahindra",
        category: "Body Parts",
        vehicleType: "SUV",
        vehicleName: "Mahindra Bolero",
        company: "Mahindra",
        model: "Bolero2018",
        variant: "SLX",
        fuelType: "Diesel",
        transmission: "Manual",
        specifications: {
          "Material": "Steel",
          "Painted": "Yes",
          "Color": "White",
          "OEM Certified": "Yes"
        },
        stockStatus: "in-stock",
        reviews: 73,
        price: 14900.0,
        discountedPrice: 14300.0,
        partNumber: "BOLERO-TGATE-2018",
        warranty: "1 Year",
        imgs: {
          thumbnails: ["/images/parts/tailgate-bolero-thumb.png"],
          previews: ["/images/parts/tailgate-bolero-prev.png"]
        }
      }
    ];

    await AutoParts.insertMany(dummyData);

    res.json({
      success: true,
      message: 'Dummy data seeded successfully',
      count: dummyData.length
    });
  } catch (error) {
    console.error('Error seeding dummy data:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding dummy data',
      error: error.message
    });
  }
};

module.exports = {
  getAllAutoParts,
  getAutoPartById,
  getFilterOptions,
  createAutoPart,
  updateAutoPart,
  deleteAutoPart,
  seedDummyData
};