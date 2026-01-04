
from PIL import Image

def force_square_maximize(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        
        # 1. Get the bounding box of the non-transparent content
        bbox = img.getbbox()
        if not bbox:
            print("Image is completely transparent!")
            return

        print(f"Original Size: {img.size}")
        print(f"Content Bounding Box: {bbox}")
        
        # Crop to the content (which we know is likely rectangular/oval: ~577x682)
        img_cropped = img.crop(bbox)
        
        width, height = img_cropped.size
        print(f"Cropped Content Size: {width}x{height}")
        
        # 2. Determine target size (the largest dimension)
        # We want to force this content to be a SQUARE to fill the area and fix any 'squashed' oval look
        target_size = max(width, height)
        
        print(f"Resizing content to: {target_size}x{target_size}")
        
        # Resize/Stretch the content to fill the square
        # This solves two problems:
        # 1. Maximizes size (fills the box completely)
        # 2. Fixes "oval" issue if the source was squashed
        img_resized = img_cropped.resize((target_size, target_size), Image.Resampling.LANCZOS)
        
        # Save overwrite
        img_resized.save(image_path)
        print("Favicon forced to square and maximized.")

    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    force_square_maximize('client/public/favicon.png')
