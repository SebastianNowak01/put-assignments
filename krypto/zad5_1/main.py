from helpers import loadImage, createShares, combineShares, saveImage, compareShares


def main():
    img = loadImage("100.png")
    s1, s2 = createShares(img)
    combined = combineShares(s1, s2, img)
    print(compareShares(s1, s2))
    saveImage(s1, "s1.png")
    saveImage(s2, "s2.png")
    saveImage(combined, "combined.png")


main()
