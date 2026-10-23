from PIL import Image, ImageDraw
import glob, os

files = sorted(glob.glob('_extracted/images/Screenshot_*.png'),
               key=lambda p: int(p.split('_')[-1].split('.')[0]))
for f in files:
    im = Image.open(f)
    print(os.path.basename(f), im.size, im.mode)

cols, tw, th = 3, 760, 560
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * th), '#111111')
draw = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB')
    im.thumbnail((tw - 20, th - 40))
    x = (i % cols) * tw + 10
    y = (i // cols) * th + 30
    sheet.paste(im, (x, y))
    draw.text((x, (i // cols) * th + 8), os.path.basename(f), fill='white')
sheet.save('_extracted/contact_sheet.jpg', quality=85)
print('sheet', sheet.size)
