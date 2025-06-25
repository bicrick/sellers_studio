#!/usr/bin/env python3
"""
Enhanced Logo Processing Script for Sellers Studio
Processes all logo variants across all color themes and organizes them into color-based folders
"""

import os
from PIL import Image
import shutil

# Color mapping: file suffix -> folder name
COLOR_MAPPING = {
    '06': 'lavender',
    '07': 'green', 
    '08': 'brown',
    '09': 'yellow',
    '10': 'orange'
}

# Logo types and their target dimensions
LOGO_CONFIGS = {
    'script-logo': {
        'source_pattern': 'SellersStudio-ScriptLogo-{color}.png',
        'target_size': (800, 236),
        'crop_box': (100, 100, 7901, 4401)  # Crop out extra whitespace
    },
    'primary-icon': {
        'source_pattern': 'SellersStudio-PrimaryIcon-{color}.png',
        'target_size': (800, 800),
        'crop_box': (100, 100, 7901, 4401)
    },
    'primary-mark': {
        'source_pattern': 'SellersStudio-PrimaryMark-{color}.png',
        'target_size': (800, 595),
        'crop_box': (100, 100, 7901, 4401)
    },
    'combination-mark': {
        'source_pattern': 'SellersStudio-CombinationMark-{color}.png',
        'target_size': (800, 400),
        'crop_box': (100, 100, 7901, 4401)
    }
}

def create_directory_structure():
    """Create the new color-based directory structure"""
    base_path = 'src/optimized'
    
    # Create base optimized directory if it doesn't exist
    os.makedirs(base_path, exist_ok=True)
    
    # Create color directories
    for color_folder in COLOR_MAPPING.values():
        color_path = os.path.join(base_path, color_folder)
        os.makedirs(color_path, exist_ok=True)
        print(f"✅ Created directory: {color_path}")

def find_source_file(logo_type, color_code):
    """Find the source file for a given logo type and color"""
    possible_paths = [
        f'src/script_logotype/PNG/SellersStudio-ScriptLogo-{color_code}.png',
        f'src/primary_icon/PNG/SellersStudio-PrimaryIcon-{color_code}.png',
        f'src/primary_mark/PNG/SellersStudio-PrimaryMark-{color_code}.png',
        f'src/combination_mark/PNG/SellersStudio-CombinationMark-{color_code}.png'
    ]
    
    # Map logo type to its likely path
    type_mapping = {
        'script-logo': f'src/script_logotype/PNG/SellersStudio-ScriptLogo-{color_code}.png',
        'primary-icon': f'src/primary_icon/PNG/SellersStudio-PrimaryIcon-{color_code}.png',
        'primary-mark': f'src/primary_mark/PNG/SellersStudio-PrimaryMark-{color_code}.png',
        'combination-mark': f'src/combination_mark/PNG/SellersStudio-CombinationMark-{color_code}.png'
    }
    
    expected_path = type_mapping.get(logo_type)
    if expected_path and os.path.exists(expected_path):
        return expected_path
    
    # Fallback: search all possible paths
    for path in possible_paths:
        if logo_type.replace('-', '').lower() in path.lower() and os.path.exists(path):
            return path
    
    return None

def process_logo(source_path, logo_type, color_name, config):
    """Process a single logo file"""
    try:
        # Open and process the image
        with Image.open(source_path) as img:
            print(f"📸 Processing {logo_type} ({color_name}): {img.size}")
            
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Crop if specified
            if config.get('crop_box'):
                # Adjust crop box to image size if needed
                crop_box = config['crop_box']
                max_x = min(crop_box[2], img.size[0])
                max_y = min(crop_box[3], img.size[1])
                actual_crop = (crop_box[0], crop_box[1], max_x, max_y)
                img = img.crop(actual_crop)
                print(f"   ✂️  Cropped to: {img.size}")
            
            # Resize to target size
            img = img.resize(config['target_size'], Image.Resampling.LANCZOS)
            print(f"   📏 Resized to: {img.size}")
            
            # Save to new location
            output_path = f"src/optimized/{color_name}/{logo_type}.png"
            img.save(output_path, 'PNG', optimize=True)
            print(f"   💾 Saved: {output_path}")
            
            return True
            
    except Exception as e:
        print(f"❌ Error processing {source_path}: {str(e)}")
        return False

def copy_existing_optimized_files():
    """Copy existing optimized files to the new structure"""
    # Map existing files to new structure
    existing_files = {
        'src/optimized/script-logo-green.png': 'src/optimized/green/script-logo.png',
        'src/optimized/primary-icon-green.png': 'src/optimized/green/primary-icon.png',  
        'src/optimized/primary-mark-green.png': 'src/optimized/green/primary-mark.png',
        'src/optimized/combination-mark-green.png': 'src/optimized/green/combination-mark.png'
    }
    
    for source, destination in existing_files.items():
        if os.path.exists(source):
            # Create directory if needed
            os.makedirs(os.path.dirname(destination), exist_ok=True)
            shutil.copy2(source, destination)
            print(f"📁 Copied existing: {source} -> {destination}")

def main():
    """Main processing function"""
    print("🎨 Starting Sellers Studio Multi-Color Logo Processing")
    print("=" * 60)
    
    # Create directory structure
    print("\n📁 Creating directory structure...")
    create_directory_structure()
    
    # Copy existing optimized files
    print("\n📋 Copying existing optimized files...")
    copy_existing_optimized_files()
    
    # Process all logo variants
    print("\n🔄 Processing logo variants...")
    
    processed_count = 0
    total_count = len(LOGO_CONFIGS) * len(COLOR_MAPPING)
    
    for color_code, color_name in COLOR_MAPPING.items():
        print(f"\n🎨 Processing {color_name.upper()} theme (variant {color_code})...")
        
        for logo_type, config in LOGO_CONFIGS.items():
            # Skip if file already exists (from copying optimized files)
            output_path = f"src/optimized/{color_name}/{logo_type}.png"
            if os.path.exists(output_path):
                print(f"   ⏭️  Skipping {logo_type} (already exists)")
                processed_count += 1
                continue
            
            # Find source file
            source_path = find_source_file(logo_type, color_code)
            
            if source_path:
                success = process_logo(source_path, logo_type, color_name, config)
                if success:
                    processed_count += 1
            else:
                print(f"   ⚠️  Source file not found for {logo_type}-{color_code}")
    
    print("\n" + "=" * 60)
    print(f"✅ Processing complete! {processed_count}/{total_count} logos processed")
    print("\n📁 New structure created:")
    
    # Show final structure
    for color_name in COLOR_MAPPING.values():
        print(f"   src/optimized/{color_name}/")
        for logo_type in LOGO_CONFIGS.keys():
            output_path = f"src/optimized/{color_name}/{logo_type}.png"
            status = "✅" if os.path.exists(output_path) else "❌"
            print(f"      {status} {logo_type}.png")

if __name__ == "__main__":
    main() 