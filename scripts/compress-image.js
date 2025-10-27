/**
 * Enhanced Image Compression Script for The Applique
 * 
 * Features:
 * - Aggressive WebP compression
 * - Multiple responsive variants including mobile
 * - Maintains aspect ratio
 * - Optimizes for mobile-first
 * 
 * Usage:
 * npm install --save-dev sharp glob
 * node scripts/compress-images.js
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

// Configuration
const QUALITY = 75; // Standard quality
const MOBILE_QUALITY = 70; // Mobile quality (smaller files)

// Responsive breakpoints with descriptive names
const SIZES = [
  { width: 400, suffix: 'mobile', quality: MOBILE_QUALITY, desc: 'Mobile Portrait' },
  { width: 640, suffix: 'sm', quality: MOBILE_QUALITY, desc: 'Mobile Landscape' },
  { width: 768, suffix: 'md', quality: QUALITY, desc: 'Tablet' },
  { width: 1024, suffix: 'lg', quality: QUALITY, desc: 'Desktop' },
  { width: 1280, suffix: 'xl', quality: QUALITY, desc: 'Large Desktop' },
  { width: 1600, suffix: '2xl', quality: QUALITY, desc: 'Extra Large' },
];

// Check if file is already a processed variant
const isProcessedVariant = (filename) => {
  const variantPattern = /-(mobile|sm|md|lg|xl|2xl)\.webp$/;
  return variantPattern.test(filename);
};

// Get base name without variant suffix
const getBaseName = (filename) => {
  return filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/-(mobile|sm|md|lg|xl|2xl)$/, '');
};

const compressImage = async (inputPath, skipOriginal = false) => {
  const ext = path.extname(inputPath);
  const fileName = path.basename(inputPath, ext);
  const baseName = getBaseName(fileName);
  const dirName = path.dirname(inputPath);
  const isWebP = ext.toLowerCase() === '.webp';
  
  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`\n📸 Processing: ${path.basename(inputPath)}`);
    console.log(`   Size: ${metadata.width}x${metadata.height}`);
    console.log(`   Format: ${metadata.format}`);
    
    const originalSize = (await fs.stat(inputPath)).size;
    let totalSavings = 0;
    let filesCreated = 0;
    
    // Create WebP version at original size (unless it's already WebP and we're skipping)
    if (!skipOriginal || !isWebP) {
      const webpPath = path.join(dirName, `${baseName}.webp`);
      
      // Skip if it's the input file itself
      if (inputPath !== webpPath) {
        await sharp(inputPath)
          .webp({ 
            quality: QUALITY,
            effort: 6,
            smartSubsample: true,
          })
          .toFile(webpPath);
        
        const webpSize = (await fs.stat(webpPath)).size;
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        
        console.log(`   ✓ Base: ${baseName}.webp (${(webpSize / 1024).toFixed(1)}KB)`);
        
        if (savings > 0) {
          console.log(`   ↓ ${savings}% smaller than original`);
          totalSavings += parseFloat(savings);
        }
        filesCreated++;
      } else {
        console.log(`   ℹ Already WebP: ${baseName}.webp`);
      }
    }
    
    // Create responsive variants
    console.log(`   📱 Creating responsive variants...`);
    for (const size of SIZES) {
      if (size.width < metadata.width) {
        const variantPath = path.join(dirName, `${baseName}-${size.suffix}.webp`);
        
        // Check if variant already exists
        try {
          await fs.access(variantPath);
          console.log(`   ⏭ Skipping ${size.suffix} (already exists)`);
          continue;
        } catch {
          // File doesn't exist, create it
        }
        
        await sharp(inputPath)
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
        console.log(`   ✓ ${size.desc} (${size.suffix}): ${(variantSize / 1024).toFixed(1)}KB`);
        filesCreated++;
      }
    }
    
    console.log(`   🎉 Created ${filesCreated} files`);
    
    return { success: true, savings: totalSavings, files: filesCreated };
  } catch (error) {
    console.error(`   ✗ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const main = async () => {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║   Image Compression & Responsive Variants      ║');
  console.log('║   Handles: JPG, PNG, WebP                      ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  
  // Find all images (including existing WebP)
  const patterns = [
    'public/images/**/*.jpg',
    'public/images/**/*.jpeg',
    'public/images/**/*.png',
    'public/images/**/*.webp'
  ];
  
  let allImages = [];
  for (const pattern of patterns) {
    const images = await glob(pattern);
    allImages = [...allImages, ...images];
  }
  
  // Filter out already processed variants
  allImages = allImages.filter(img => !isProcessedVariant(img));
  
  // Group by base name to avoid processing same image multiple times
  const uniqueImages = new Map();
  allImages.forEach(img => {
    const base = getBaseName(path.basename(img));
    const ext = path.extname(img).toLowerCase();
    
    // Prefer WebP if exists, otherwise use first found
    if (!uniqueImages.has(base) || ext === '.webp') {
      uniqueImages.set(base, img);
    }
  });
  
  const imagesToProcess = Array.from(uniqueImages.values());
  
  console.log(`Found ${allImages.length} total images`);
  console.log(`Processing ${imagesToProcess.length} unique images`);
  console.log(`(Skipping ${allImages.length - imagesToProcess.length} duplicates/variants)\n`);
  console.log('═══════════════════════════════════════════════\n');
  
  if (imagesToProcess.length === 0) {
    console.log('⚠️  No new images to process!');
    console.log('   All images are already optimized.\n');
    return;
  }
  
  let totalSavings = 0;
  let successCount = 0;
  let totalFiles = 0;
  
  // Process each unique image
  for (let i = 0; i < imagesToProcess.length; i++) {
    console.log(`[${i + 1}/${imagesToProcess.length}]`);
    const isWebP = path.extname(imagesToProcess[i]).toLowerCase() === '.webp';
    const result = await compressImage(imagesToProcess[i], isWebP);
    
    if (result.success) {
      successCount++;
      totalSavings += result.savings;
      totalFiles += result.files;
    }
  }
  
  // Summary
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║                   SUMMARY                      ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log(`✓ Successfully processed: ${successCount}/${imagesToProcess.length} images`);
  console.log(`📦 Total files created: ${totalFiles}`);
  if (totalSavings > 0) {
    console.log(`↓ Average compression: ${(totalSavings / successCount).toFixed(1)}%`);
  }
  console.log('═══════════════════════════════════════════════\n');
  
  console.log('📱 Responsive Variants Created:');
  console.log('   • 400w (mobile) - For phones portrait');
  console.log('   • 640w (sm) - For phones landscape');
  console.log('   • 768w (md) - For tablets');
  console.log('   • 1024w (lg) - For desktop');
  console.log('   • 1280w (xl) - For large screens');
  console.log('   • 1600w (2xl) - For extra large screens\n');
  
  console.log('🔧 How to Use These Images:');
  console.log('   The OptimizedImage component automatically');
  console.log('   selects the right size based on screen width!\n');
  
  console.log('📁 File Structure:');
  console.log('   image.webp         ← Original quality');
  console.log('   image-mobile.webp  ← 400w (phones)');
  console.log('   image-sm.webp      ← 640w (phones landscape)');
  console.log('   image-md.webp      ← 768w (tablets)');
  console.log('   image-lg.webp      ← 1024w (desktop)');
  console.log('   image-xl.webp      ← 1280w (large desktop)');
  console.log('   image-2xl.webp     ← 1600w (extra large)\n');
  
  console.log('✅ Done! Your images are now optimized for all devices!\n');
};

main().catch(console.error);
