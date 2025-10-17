const AutoParts = require('../models/autoPartsModel');

const autoPartsData = [];

const seedAutoPartsData = async () => {
    try {
        console.log('🔍 Checking auto parts data in database...');

        // Check if data already exists
        const existingCount = await AutoParts.countDocuments();

        if (existingCount > 0) {
            console.log(`✅ Auto parts data already exists (${existingCount} items found)`);
            console.log('📊 Database seeding skipped - data already present');
            return;
        }

        console.log('📦 No auto parts data found, starting seeding process...');
        console.log(`🚀 Inserting ${autoPartsData.length} auto parts into database...`);

        // Insert all data
        const insertedParts = await AutoParts.insertMany(autoPartsData);

        console.log('✅ Auto parts data seeded successfully!');
        console.log(`📊 Total parts inserted: ${insertedParts.length}`);

        // Log summary by category
        const categories = {};
        insertedParts.forEach(part => {
            categories[part.category] = (categories[part.category] || 0) + 1;
        });

        console.log('📋 Parts by category:');
        Object.entries(categories).forEach(([category, count]) => {
            console.log(`   • ${category}: ${count} items`);
        });

        // Log summary by company
        const companies = {};
        insertedParts.forEach(part => {
            companies[part.company] = (companies[part.company] || 0) + 1;
        });

        console.log('🏢 Parts by company:');
        Object.entries(companies).forEach(([company, count]) => {
            console.log(`   • ${company}: ${count} items`);
        });

        console.log('🎉 Auto parts database initialization completed!');

    } catch (error) {
        console.error('❌ Error seeding auto parts data:', error.message);

        // If it's a duplicate key error, it means data already exists
        if (error.code === 11000) {
            console.log('ℹ️  Some data already exists in database, skipping duplicates');
        } else {
            console.error('🔥 Full error details:', error);
        }
    }
};

module.exports = {
    seedAutoPartsData,
    autoPartsData
};