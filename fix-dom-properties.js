// Script to fix invalid DOM properties in React/JSX files
const fs = require('fs');
const path = require('path');

// Files that need fixing based on the search results
const filesToFix = [
  'src/components/Orders/OrderActions.tsx',
  'src/components/MyAccount/AddressModal.tsx', 
  'src/components/Common/PreviewSlider.tsx',
  'src/components/Common/CartSidebarModal/EmptyCart.tsx'
];

function fixDOMProperties(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace fill-rule with fillRule
    content = content.replace(/fill-rule="/g, 'fillRule="');
    
    // Replace clip-rule with clipRule  
    content = content.replace(/clip-rule="/g, 'clipRule="');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

console.log('🔧 Fixing invalid DOM properties...\n');

filesToFix.forEach(fixDOMProperties);

console.log('\n✅ All DOM properties fixed!');
console.log('\nFixed properties:');
console.log('- fill-rule → fillRule');
console.log('- clip-rule → clipRule');