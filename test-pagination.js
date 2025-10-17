// Test pagination functionality and Redux state management
const testPagination = () => {
    console.log('Testing pagination functionality...');

    // Test pagination calculation
    const calculatePagination = (totalItems, currentPage, itemsPerPage) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const hasNextPage = currentPage < totalPages;
        const hasPrevPage = currentPage > 1;

        return {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            hasNextPage,
            hasPrevPage,
        };
    };

    // Test cases
    const testCases = [
        { totalItems: 20, currentPage: 1, itemsPerPage: 9 },
        { totalItems: 20, currentPage: 2, itemsPerPage: 9 },
        { totalItems: 20, currentPage: 3, itemsPerPage: 9 },
        { totalItems: 0, currentPage: 1, itemsPerPage: 9 },
        { totalItems: 5, currentPage: 1, itemsPerPage: 9 },
    ];

    testCases.forEach((testCase, index) => {
        const result = calculatePagination(testCase.totalItems, testCase.currentPage, testCase.itemsPerPage);
        console.log(`Test Case ${index + 1}:`, testCase);
        console.log('Result:', result);
        console.log('---');
    });

    // Test array slicing for pagination
    const mockData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
    
    const testPagination = (data, page, itemsPerPage) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    console.log('Page 1 items:', testPagination(mockData, 1, 9).map(item => item.name));
    console.log('Page 2 items:', testPagination(mockData, 2, 9).map(item => item.name));
    console.log('Page 3 items:', testPagination(mockData, 3, 9).map(item => item.name));

    console.log('Pagination test completed!');
};

// Test Redux state change detection
const testStateChangeDetection = () => {
    console.log('Testing state change detection...');

    const testArrayEquality = (arr1, arr2) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    };

    // Test cases
    console.log('[] === []:', testArrayEquality([], [])); // true
    console.log('[1] === [1]:', testArrayEquality([1], [1])); // true
    console.log('[1] === [2]:', testArrayEquality([1], [2])); // false
    console.log('[1,2] === [2,1]:', testArrayEquality([1,2], [2,1])); // false
    console.log('["a"] === ["a"]:', testArrayEquality(["a"], ["a"])); // true

    console.log('State change detection test completed!');
};

// Test ShopWithoutSidebar pagination behavior
const testShopWithoutSidebarPagination = () => {
    console.log('Testing ShopWithoutSidebar pagination behavior...');
    
    // Simulate the behavior of ShopWithoutSidebar
    const mockState = {
        allParts: Array.from({ length: 25 }, (_, i) => ({ 
            _id: `part-${i + 1}`, 
            title: `Auto Part ${i + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        })),
        filters: {
            search: '',
            companies: [],
            categories: [],
            vehicleTypes: [],
            fuelTypes: [],
            transmissions: [],
            stockStatus: '',
            minPrice: null,
            maxPrice: null,
            sortBy: 'createdAt',
            sortOrder: 'desc',
        },
        itemsPerPage: 9
    };

    // Test filtering (should return all parts since no filters)
    const applyFiltersAndSort = (parts, filters) => {
        let filtered = [...parts];
        
        // Apply sorting
        filtered.sort((a, b) => {
            let aValue = a[filters.sortBy];
            let bValue = b[filters.sortBy];

            if (filters.sortBy === 'price') {
                aValue = Number(aValue);
                bValue = Number(bValue);
            } else if (filters.sortBy === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (filters.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    };

    const filteredParts = applyFiltersAndSort(mockState.allParts, mockState.filters);
    console.log('Total parts after filtering:', filteredParts.length);
    console.log('Should equal total parts (no filters):', mockState.allParts.length);

    // Test pagination calculation
    const calculatePagination = (totalItems, currentPage, itemsPerPage) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
        };
    };

    const pagination = calculatePagination(filteredParts.length, 1, mockState.itemsPerPage);
    console.log('Pagination for page 1:', pagination);

    // Test displayed parts calculation
    const getDisplayedParts = (parts, page, itemsPerPage) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return parts.slice(startIndex, endIndex);
    };

    const page1Parts = getDisplayedParts(filteredParts, 1, mockState.itemsPerPage);
    const page2Parts = getDisplayedParts(filteredParts, 2, mockState.itemsPerPage);
    const page3Parts = getDisplayedParts(filteredParts, 3, mockState.itemsPerPage);

    console.log('Page 1 parts count:', page1Parts.length, '(should be 9)');
    console.log('Page 2 parts count:', page2Parts.length, '(should be 9)');
    console.log('Page 3 parts count:', page3Parts.length, '(should be 7)');

    console.log('ShopWithoutSidebar pagination test completed!');
};

testPagination();
testStateChangeDetection();
testShopWithoutSidebarPagination();
