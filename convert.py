import pandas as pd
import numpy as np

# البيانات التي قدمتها (نموذج من السجلات)
data = {
    'RoadNumber': [901, 804, 307],
    'Latitude': [42.91, 42.84, 39.58],
    'Longitude': [16.89, 19.28, 20.99],
    'DeadNumber': [0, 0, 0],
    'InjuriesNum': [0, 0, 0],
    'Costaccident': [7538, 7538, 7538]
}

df = pd.DataFrame(data)

# توليد بيانات محاكية للمتغيرات الناقصة (الطقس والإضاءة)
np.random.seed(42)
df['Temperature'] = np.random.uniform(30, 48, size=len(df))  # درجة حرارة الرياض
df['Visibility'] = np.random.choice([2, 5, 10], size=len(df)) # مدى الرؤية
df['WindSpeed'] = np.random.uniform(5, 20, size=len(df))    # سرعة الرياح
df['IsDangerous'] = ((df['Temperature'] > 40) | (df['Visibility'] < 5)).astype(int)

# حفظ الملف للتدريب
df.to_csv('training_data.csv', index=False)
print("تم إنشاء ملف training_data.csv بنجاح.")