import pandas as pd
import re
import jieba
import jieba.analyse


def clean(excel_path):
    # 定义一个正则表达式模式，匹配无意义的字母组合和数字
    patterns = {
        'pure_digits': r'^\d+$',
        'pure_letters': r'^[a-zA-Z]+$',
        'pure_punctuations': r'^[!-/:-@[-`{-~]+$'
    }

    df = pd.read_excel(excel_path)

    # 遍历表格的每一列
    for column in df.columns:
        # 如果该列是description
        if column == "description":
            for pattern_name, pattern in patterns.items():
                df[column] = df[column].apply(lambda x: re.sub(pattern, '', str(x)) if pd.notnull(x) else x)
                df = df[df[column].apply(lambda x: len(x) > 5)]

    df['description'].replace('', pd.NA, inplace=True)

    cleaned_df = df.dropna(subset='description')
    return cleaned_df


def segment_and_preprocess(excel_path):
    df = pd.read_excel(excel_path)
    id_to_features_dict = {}

    # Loop through each row in the DataFrame
    for index, row in preprocessed_df.iterrows():
        # Check if the column name is "id"
        if row['id'] not in id_to_features_dict:
            # If not, add the id with the value set to None
            id_to_features_dict[row['id']] = None

        row["description"] = row["description"].apply(lambda x: " ".join(jieba.cut(str(x))) if isinstance(x, str) else x)
        keywords = jieba.analyse.extract_tags(row["description"], topK=10)
        id_to_features_dict[row['id']] = keywords

    return id_to_features_dict


if __name__ == "__main__":
    cleaned_df = clean(r"./JayMe.xlsx")
    cleaned_df.to_excel('cleaned_table.xlsx', index=False)
    features = segment_and_preprocess('cleaned_table.xlsx')
    id_to_features_df = pd.DataFrame(list(features.items()), columns=['id', 'features'])
    id_to_features_df.to_csv('text_features.csv', index=False)


