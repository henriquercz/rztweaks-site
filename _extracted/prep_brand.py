from PIL import Image, ImageFilter
import numpy as np

im = Image.open('_extracted/images/rz.jpg').convert('RGB')
a = np.array(im)
lum = a.max(axis=2)
mask = lum > 90
ys, xs = np.where(mask)
print('bbox bright', xs.min(), ys.min(), xs.max(), ys.max())
# red mask
r, g, b = a[:,:,0].astype(int), a[:,:,1].astype(int), a[:,:,2].astype(int)
red = (r > 130) & (r - g > 50) & (r - b > 50)
ys, xs = np.where(red)
print('bbox red', xs.min(), ys.min(), xs.max(), ys.max())

# Crop logo with padding, pad to square on brand background
box = (240, 330, 820, 710)
logo = im.crop(box)
side = max(logo.size)
sq = Image.new('RGB', (side, side), (11, 11, 11))
sq.paste(logo, ((side - logo.width)//2, (side - logo.height)//2))
sq = sq.resize((560, 560), Image.LANCZOS)
sq.save('assets/brand/logo-mark.jpg', quality=92)
sq.resize((64, 64), Image.LANCZOS).save('assets/brand/favicon.png')
print('logo saved', sq.size)
