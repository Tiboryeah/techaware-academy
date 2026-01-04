
from PIL import Image
import os

def make_square(image_path):
    try:
        img = Image.open(image_path)
        width, height = img.size
        print(f"Original dimensions: {width}x{height}")
        
        if width == height:
            print("Image is already square.")
            return

        # Determine new size (min dimension)
        new_size = min(width, height)
        
        # Calculate cropping box (center crop)
        left = (width - new_size) / 2
        top = (height - new_size) / 2
        right = (width + new_size) / 2
        bottom = (height + new_size) / 2
        
        # Crop
        img_cropped = img.crop((left, top, right, bottom))
        
        # Save (overwrite or new file? Let's overwrite to fix the issue directly)
        img_cropped.save(image_path)
        print(f"Cropped to square: {new_size}x{new_size}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    make_square('client/public/favicon.png')
