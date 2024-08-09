import os

import pandas as pd
from PIL import Image

text_features_path = './text_features.csv'
image_features_path = './ocr_features.csv'

fusion_path = './fusion_features.csv'
fusions = {}


def fusion():
    text_features = pd.read_csv(text_features_path)

    # Load the CSV file into a DataFrame
    ocr_features_df = pd.read_csv(image_features_path)

    # Convert the string representation of the OCR Text to actual dictionaries
    ocr_features_df['OCR Text'] = ocr_features_df['OCR Text'].apply(eval)

    # Extract the 'id' part from the 'Image File' column
    ocr_features_df['ID'] = ocr_features_df['Image File'].str.extract('(\d+)-\d+\.png')

    # Group the DataFrame by 'ID' and aggregate the 'OCR Text' into lists
    grouped_ocr_features = ocr_features_df.groupby('ID')['OCR Text'].apply(list).to_dict()

    for index, row in text_features.iterrows():
        id = row['id']
        id_str = str(id)
        if id_str in grouped_ocr_features.keys():
            fusions[id] = {row['features'] + (str)(feature) for feature in grouped_ocr_features[id_str]}


if __name__ == '__main__':
    fusion()

    # Normalize the nested dictionary to a flat table
    fusion_df = pd.DataFrame(list(fusions.items()), columns=['id', 'features'])

    # Save the fusion features to a new CSV file
    fusion_df.to_csv(fusion_path, index=False)

    print(f'Fusion features saved to {fusion_path}')