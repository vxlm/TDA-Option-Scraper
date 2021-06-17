import pandas as pd
import os
import datetime
import multiprocessing
from multiprocessing import Pool


#Old scrape function, which is much less efficient for multiprocessing than scrape_ticker. Takes in as input a whole dataframe
#with a column symbols to scrape.
# def scrape_data(df):
#     for index,row in df.iterrows():
#         endTime = datetime.datetime.now() + datetime.timedelta(seconds=1)
#         print(row['Symbol'])
#         os.system('node optionsData.js ' +str(row['Symbol']))
#         while datetime.datetime.now() <= endTime:
#             pass
#         print('done with ' + row['Symbol'])

def scrape_ticker(ticker):
    """
    Scrape ticker will take in a ticker, and start scraping data into mongodb. It makes sure that each function call takes
    at least one second, this guarantees that you can run 20 pool instances of it without rate limiting yourself on the TDA api.
    """
    endTime = datetime.datetime.now() + datetime.timedelta(seconds=1)
    print(ticker)
    os.system('node optionsData.js ' +str(ticker))
    while datetime.datetime.now() <= endTime:
        pass
    print('done with ' + ticker)
            
if __name__ == '__main__':
    #Change this csv for a custom symbol collection
    df = pd.read_csv('./nasdaq_screener_1623597138806.csv')
    #Modify this for however many concurrent scrapers you want going off at once, but remember you cannot exceed 20. 
    workers = 2
    with Pool(workers) as p:
         results = p.map(scrape_ticker, df['Symbol'].tolist())

