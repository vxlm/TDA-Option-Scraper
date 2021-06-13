import pandas as pd
import os
df = pd.read_csv('./nasdaq_screener_1623597138806.csv')
print(df)
for index,row in df.iterrows():
    print(row['Symbol'])
    os.system('node optionsData.js ' +str(row['Symbol']))
    print('finished')
    
        

