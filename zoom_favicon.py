
from PIL import Image

def zoom_image(image_path, zoom_factor=1.15):
    try:
        img = Image.open(image_path).convert("RGBA")
        width, height = img.size
        print(f"Original Size: {width}x{height}")
        
        # Calculate new size
        new_width = int(width * zoom_factor)
        new_height = int(height * zoom_factor)
        
        # Resize (Scale Up)
        print(f"Scaling up to: {new_width}x{new_height} (Zoom: {zoom_factor}x)")
        img_scaled = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Center Crop back to original size
        left = (new_width - width) // 2
        top = (new_height - height) // 2
        right = left + width
        bottom = top + height
        
        img_cropped = img_scaled.crop((left, top, right, bottom))
        
        # Save
        img_cropped.save(image_path)
        print("Favicon zoomed effectively.")

    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # Applying a 15% zoom to cut off potential padding/borders and fill the view more
    zoom_image('client/public/favicon.png', zoom_factor=1.15)
