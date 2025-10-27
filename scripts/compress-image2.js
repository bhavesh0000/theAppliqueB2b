/**
 * Fix Ab6 Image - Recover and Optimize
 * 
 * This script will:
 * 1. Find the original Ab6 source file (jpg/png)
 * 2. Create optimized WebP version
 * 3. Create responsive variants
 * 
 * Usage: node scripts/fix-ab6.js
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const QUALITY = 85; // High quality for about page
const MOBILE_QUALITY = 80;

const SIZES = [
  { width: 400, suffix: 'mobile', quality: MOBILE_QUALITY },
  { width: 640, suffix: 'sm', quality: MOBILE_QUALITY },
  { width: 768, suffix: 'md', quality: QUALITY },
  { width: 1024, suffix: 'lg', quality: QUALITY },
];

const fixAb6 = async () => {
  console.log('🔧 Finding and Fixing Ab6 Image\n');
  console.log('═══════════════════════════════════════════════\n');
  
  // Step 1: Find the original source file
  console.log('📂 Step 1: Looking for source file...\n');
  
  const patterns = [
    'public/images/**/Ab6.jpg',
    'public/images/**/Ab6.jpeg',
    'public/images/**/Ab6.png',
    'public/images/**/Ab6.JPG',
    'public/images/**/Ab6.JPEG',
    'public/images/**/Ab6.PNG',
  ];
  
  let sourceFile = null;
  
  for (const pattern of patterns) {
    const files = await glob(pattern);
    if (files.length > 0) {
      sourceFile = files[0];
      break;
    }
  }
  
  if (!sourceFile) {
    console.log('❌ ERROR: Cannot find original Ab6 source file!\n');
    console.log('Looking for:');
    console.log('   - public/images/about/Ab6.jpg');
    console.log('   - public/images/about/Ab6.jpeg');
    console.log('   - public/images/about/Ab6.png\n');
    console.log('📋 What to do:');
    console.log('   1. Check if you have the ORIGINAL Ab6 image (not .webp)');
    console.log('   2. Make sure it\'s in public/images/about/');
    console.log('   3. If you don\'t have it, restore from backup');
    console.log('   4. Run this script again\n');
    return false;
  }
  
  console.log(`✅ Found source: ${sourceFile}\n`);
  
  // Step 2: Get image info
  const metadata = await sharp(sourceFile).metadata();
  console.log('📊 Image Info:');
  console.log(`   Size: ${metadata.width}x${metadata.height}`);
  console.log(`   Format: ${metadata.format}`);
  
  if (metadata.orientation && metadata.orientation !== 1) {
    console.log(`   🔄 EXIF Orientation: ${metadata.orientation} (will auto-rotate)`);
  }
  console.log('');
  
  const dirName = path.dirname(sourceFile);
  const baseName = 'Ab6';
  
  // Step 3: Create main WebP
  console.log('🎨 Step 2: Creating optimized WebP...\n');
  
  const webpPath = path.join(dirName, `${baseName}.webp`);
  
  // Delete old webp if exists
  try {
    await fs.access(webpPath);
    await fs.unlink(webpPath);
    console.log('   🗑️  Deleted old Ab6.webp');
  } catch {
    // File doesn't exist, that's fine
  }
  
  await sharp(sourceFile)
    .rotate() // Auto-rotate based on EXIF
    .webp({ 
      quality: QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(webpPath);
  
  const webpSize = (await fs.stat(webpPath)).size;
  console.log(`   ✅ Created: ${baseName}.webp (${(webpSize / 1024).toFixed(1)}KB)`);
  
  // Step 4: Create responsive variants
  console.log('\n📱 Step 3: Creating responsive variants...\n');
  
  let variantsCreated = 0;
  
  for (const size of SIZES) {
    if (size.width < metadata.width) {
      const variantPath = path.join(dirName, `${baseName}-${size.suffix}.webp`);
      
      // Delete old variant if exists
      try {
        await fs.access(variantPath);
        await fs.unlink(variantPath);
      } catch {
        // Doesn't exist
      }
      
      await sharp(sourceFile)
        .rotate()
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside',
          kernel: sharp.kernel.lanczos3,
        })
        .webp({ 
          quality: size.quality,
          effort: 6,
          smartSubsample: true,
        })
        .toFile(variantPath);
      
      const variantSize = (await fs.stat(variantPath)).size;
      console.log(`   ✅ ${size.suffix} (${size.width}w): ${(variantSize / 1024).toFixed(1)}KB`);
      variantsCreated++;
    }
  }
  
  console.log('\n═══════════════════════════════════════════════');
  console.log('                  SUCCESS! ✨                   ');
  console.log('═══════════════════════════════════════════════\n');
  
  console.log(`✅ Created Ab6.webp + ${variantsCreated} variants\n`);
  
  console.log('📋 Files created:');
  console.log(`   - ${baseName}.webp (main image)`);
  if (variantsCreated > 0) {
    SIZES.forEach(size => {
      if (size.width < metadata.width) {
        console.log(`   - ${baseName}-${size.suffix}.webp`);
      }
    });
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('   1. Check your website - Ab6 image should now display');
  console.log('   2. Hard refresh browser (Ctrl+Shift+R)');
  console.log('   3. Image should load correctly!\n');
  
  return true;
};

// Main
fixAb6().catch(error => {
  console.error('\n❌ Fatal Error:', error.message);
  console.error('\nStack:', error.stack);
});