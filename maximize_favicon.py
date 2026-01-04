
from PIL import Image
import numpy as np

def maximize_logo(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        
        # 1. Get the bounding box of the non-transparent content
        # This effectively trims any outer transparent whitespace
        bbox = img.getbbox()
        
        if not bbox:
            print("Image is completely transparent!")
            return

        print(f"Original Size: {img.size}")
        print(f"Content Bounding Box: {bbox}")
        
        # Crop to the content
        img_cropped = img.crop(bbox)
        
        # 2. Now make it square again, but tightly
        # Determine the maximum dimension
        width, height = img_cropped.size
        max_dim = max(width, height)
        
        # Create a new blank square image with the max dimension
        # (Transparent background)
        new_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
        
        # Paste the cropped content into the center
        left = (max_dim - width) // 2
        top = (max_dim - height) // 2
        new_img.paste(img_cropped, (left, top))
        
        print(f"New Maximized Size: {max_dim}x{max_dim}")
        
        # Save back to the same path
        new_img.save(image_path)
        print("Favicon maximized successfully.")

    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    maximize_logo('client/public/favicon.png')
