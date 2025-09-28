#!/usr/bin/env node

// Test script to verify home_section_3 filtering is working
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testTopProductsAPI() {
  console.log('🧪 Testing TOP PRODUCTS API (home_section_3 = "Yes")...\n');
  
  const baseUrl = 'http://localhost:8888/blitxpress/api';
  const params = new URLSearchParams({
    page: '1',
    limit: '24',
    sort_by: 'created_at',
    sort_order: 'desc',
    home_section_3: 'Yes'
  });
  
  const url = `${baseUrl}/products?${params.toString()}`;
  console.log('🔗 Request URL:', url);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('✅ API Response Status:', {
      code: data.code,
      status: data.status,
      message: data.message
    });
    
    console.log('📊 Products Data:', {
      currentPage: data.data.current_page,
      totalProducts: data.data.total,
      productsReturned: data.data.data.length,
      perPage: data.data.per_page
    });
    
    console.log('\n🎯 First 5 Products:');
    data.data.data.slice(0, 5).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product.id})`);
      console.log(`   home_section_3: ${product.home_section_3}`);
      console.log(`   Price: ${product.price_1} ${product.currency || 'UGX'}`);
      console.log(`   Category: ${product.category_text || 'N/A'}\n`);
    });
    
    // Validation
    console.log('🔍 Validation Results:');
    const allHaveCorrectSection = data.data.data.every(product => product.home_section_3 === 'Yes');
    console.log(`✅ All products have home_section_3 = "Yes": ${allHaveCorrectSection}`);
    
    if (!allHaveCorrectSection) {
      console.log('❌ Some products do not have home_section_3 = "Yes":');
      data.data.data.forEach(product => {
        if (product.home_section_3 !== 'Yes') {
          console.log(`   - ${product.name} (ID: ${product.id}) has home_section_3: ${product.home_section_3}`);
        }
      });
    }
    
    if (data.data.data.length === 0) {
      console.log('❌ No products returned! This indicates the filtering is not working.');
    } else {
      console.log(`✅ Successfully returned ${data.data.data.length} products with home_section_3 filtering.`);
    }
    
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Make sure the Laravel development server is running on localhost:8888');
    }
  }
}

// Run the test
testTopProductsAPI();