from paddleocr import paddleocr, draw_ocr
from PIL import Image
import os
import pandas as pd

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

# 设置源文件夹路径、目标尺寸和目标文件夹路径
source_folder = './JayMe'
target_size = (720, 1280)  # 目标尺寸
target_folder = './processed_images'  # 目标文件夹路径


def clean():
    # 遍历文件夹中的所有图片
    for filename in os.listdir(source_folder):
        # 构建完整的图片路径
        img_path = os.path.join(source_folder, filename)

        # 确保文件是图片格式
        if img_path.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.gif')):
            filename = filename.split('.')[0]
            # 读取图片
            img = Image.open(img_path)

            # 调整图片大小到目标尺寸
            img_resized = img.resize(target_size)

            img_normalized = img_resized.convert('RGB')
            img_normalized_path = os.path.join(target_folder, filename + '.png')
            img_normalized.save(img_normalized_path, format='png')

            print(f'Normalized and saved {filename} to {img_normalized_path}')


def extract(path):
    # 初始化OCR引擎
    ocr = paddleocr.PaddleOCR(use_angle_cls=True, lang='ch')

    # 设置图片文件夹路径
    img_folder_path = path

    # 获取文件夹内的所有图片文件
    img_files = [f for f in os.listdir(img_folder_path) if
                 f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff'))]

    # 创建一个字典来存储OCR提取的文本特征
    ocr_features = {}

    # 遍历所有图片文件
    for img_file in img_files:
        # 构建完整的图片路径
        img_path = './processed_images/' + img_file

        # 读取图像并运行OCR
        result = ocr.ocr(img_path, cls=True)

        print(f"processing {img_path}")

        # 提取文本信息
        ocr_text_list = []
        for line in result:
            if line and len(line) > 1 and line[1]:
                bounding_box = line[0]
                text = line[1][0]
                confidence = line[1][1]
                ocr_text_list.append({'bounding_box': bounding_box, 'text': text, 'confidence': confidence})

        ocr_features[img_file] = ocr_text_list


    return ocr_features


if __name__ == '__main__':
    # clean()
    features = extract('./processed_images')

    df_ocr = pd.DataFrame(list(features.items()), columns=['Image File', 'OCR Text'])

    df_ocr.to_csv('ocr_features.csv', index=False)


