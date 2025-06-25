#!/usr/bin/env python3
"""
Script to crop white space from Sellers Studio logo images (Green versions -07)
and create optimized versions for web use.
"""

from PIL import Image, ImageChops
import os

def trim_whitespace(image):
    """Remove white/transparent borders from an image"""
    # Convert to RGBA if not already
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Create a background image filled with white
    bg = Image.new('RGBA', image.size, (255, 255, 255, 0))
    
    # Get the difference between the image and the background
    diff = ImageChops.difference(image, bg)
    
    # Get the bounding box of non-transparent pixels
    bbox = diff.getbbox()
    
    if bbox:
        return image.crop(bbox)
    else:
        return image

def process_logo(input_path, output_path, max_width=800):
    """Process a logo image: crop whitespace and resize for web"""
    print(f"Processing {input_path}...")
    
    # Open the image
    img = Image.open(input_path)
    print(f"Original size: {img.size}")
    
    # Crop whitespace
    cropped = trim_whitespace(img)
    print(f"After cropping: {cropped.size}")
    
    # Resize if too large (maintain aspect ratio)
    if cropped.width > max_width:
        ratio = max_width / cropped.width
        new_height = int(cropped.height * ratio)
        cropped = cropped.resize((max_width, new_height), Image.Resampling.LANCZOS)
        print(f"After resizing: {cropped.size}")
    
    # Save the optimized image
    cropped.save(output_path, 'PNG', optimize=True)
    print(f"Saved to {output_path}")
    print()

# Create output directory
os.makedirs('src/optimized', exist_ok=True)

# Process each green logo variant (-07)
logos = [
    ('src/script_logotype/PNG/SellersStudio-ScriptLogo-07.png', 'src/optimized/script-logo-green.png'),
    ('src/primary_icon/PNG/SellersStudio-PrimaryIcon-07.png', 'src/optimized/primary-icon-green.png'),
    ('src/primary_mark/PNG/SellersStudio-PrimaryMark-07.png', 'src/optimized/primary-mark-green.png'),
    ('src/combination_mark/PNG/SellersStudio-CombinationMark-07.png', 'src/optimized/combination-mark-green.png')
]

print("Starting optimization of green logo variants (-07)...")
print("=" * 50)

for input_path, output_path in logos:
    if os.path.exists(input_path):
        process_logo(input_path, output_path)
    else:
        print(f"File not found: {input_path}")

print("Green logo optimization complete!")
print("Files saved in: src/optimized/")
print("Ready to update website with green color scheme!") 