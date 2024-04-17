from PIL import Image
import numpy as np
import random


def loadImage(src):
    return np.asarray(Image.open(src).convert('L'))


def splitPixel(p):
    splits = [(1, 0), (0, 1)]
    if (p == 255):
        pixel = random.choice(splits)
        return (pixel, pixel)
    else:
        random.shuffle(splits)
        return (splits[0], splits[1])


def createShares(img):
    height, width = img.shape
    s1 = [[0] * width for _ in range(height)]
    s2 = [[0] * width for _ in range(height)]
    for i in range(width):
        for j in range(height):
            s1P, s2P = splitPixel(img[i][j])
            if s1P != s2P:
                print(s1P, s2P)
            s1[i][j] = s1P
            s2[i][j] = s2P
    return (s1, s2)

def compareShares(s1, s2):
    height, width = len(s1), len(s1[0])
    diff = 0
    for i in range(width):
        for j in range(height):
            if s1[i][j] != s2[i][j]:
                diff += 1
    return diff


def combineShares(s1, s2, img):
    height, width = img.shape
    combined = []
    for i in range(width):
        row = []
        for j in range(height):
            s1_pixel = s1[i][j]
            s2_pixel = s2[i][j]
            if s1_pixel == s2_pixel:
                row.append(s1_pixel)
            else:
                row.append((0, 0))
        combined.append(row)
    return combined


def saveImage(img, path):
    width, height = len(img[0]), len(img)
    image = Image.new('1', (width * 2, height)).convert("L")
    for i in range(width):
        for j in range(height):
            lP, rP = img[i][j]
            image.putpixel((j * 2, i), 255 if lP == 1 else 0)
            image.putpixel((j * 2 + 1, i), 255 if rP == 1 else 0)
    image.save(path)

