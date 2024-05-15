from PIL import Image


def loadImage(src):
    img = Image.open(src, 'r').convert('RGB')
    width, height = img.size
    pixel_values = list(img.getdata())
    return (width, height, pixel_values)


def convertMessageToBits(message):
    return ''.join(format(ord(i), '08b') for i in message)


def convertIntToBits(rgb):
    return "{:08b}".format(rgb)


def base2ToBase10(string):
    sum = 0
    iter = 0
    string = string[::-1]
    for i in range(len(string)):
        sum += int(string[i]) * pow(2, iter)
        iter += 1
    return sum


def changeRGB(messageBits, data, position):
    rgbPixel = data[position]
    rgbTmp = []
    for i in range(len(messageBits)):
        if i % 3 == 0 and i != 0:
            data[position] = (rgbTmp[0], rgbTmp[1], rgbTmp[2])
            rgbTmp.clear()
            position += 1
            rgbPixel = data[position]
        color = convertIntToBits(rgbPixel[i % 3])
        color = color[0:len(color)-1]
        color += messageBits[i]
        color = base2ToBase10(color)
        rgbTmp.append(color)
        if i == len(messageBits)-1 and len(rgbTmp) > 0:
            missing = 3 - len(rgbTmp)
            if missing == 0:
                data[position] = (rgbTmp[0], rgbTmp[1], rgbTmp[2])
            elif missing == 1:
                data[position] = (rgbTmp[0], rgbTmp[1], rgbPixel[2])
            elif missing == 2:
                data[position] = (rgbTmp[0], rgbPixel[1], rgbPixel[2])


def saveImage(data, width, height, path):
    im = Image.new('1', (width, height)).convert('RGB')
    for i in range(width):
        for j in range(height):
            im.putpixel((j, i), data[i*width + j])
    im.save(path)


def readsLastBits(data, width, height):
    lastBits = ""
    for i in range(width):
        for j in range(height):
            rgbPixel = data[i*width + j]
            lastBits += "1" if rgbPixel[0] % 2 == 1 else "0"
            lastBits += "1" if rgbPixel[1] % 2 == 1 else "0"
            lastBits += "1" if rgbPixel[2] % 2 == 1 else "0"
    return lastBits


def readMessage(imgPath):
    msg = ""
    width, height, data = loadImage(imgPath)
    lastBits = readsLastBits(data, width, height)
    for i in range(int(len(lastBits)/8)):
        msg += chr(int(lastBits[8*i:8*i+8], 2))
    return msg


def main():
    width, height, img = loadImage("./100.png")
    rawMessage = "All of your base are belong to us."
    messageBits = convertMessageToBits(rawMessage)
    assert len(messageBits) <= width * height * 3
    print("rawMessage:  " + rawMessage)
    print("messageBits: " + messageBits)
    startPosition = 0
    changeRGB(messageBits, img, startPosition)
    saveImage(img, width, height, "./encrypted.png")
    encryptedMessage = readMessage("./encrypted.png")
    encryptedMessage = encryptedMessage[0:len(rawMessage)]
    print(encryptedMessage)


main()
