# TDA-Option-Scraper
This is a script for scraping Option chain data using the TDA API. The script uses node to request data from the API and store it in a mongodb instance. Each ticker will have a separate collection created for it.
# Getting Started
First, you need to get a TDA API key, which is completely free. First, create a developer account [here](https://developer.tdameritrade.com/user/register). Next, create an application [here](https://developer.tdameritrade.com/user/me/apps/add) , the details do not matter. Take note of your API key and replace it in optionsData.js, on line 21.

Second, you need to have Python 3 installed, along with the pandas library. Python can be downloaded [here](https://www.python.org/downloads/), and run
```
pip install pandas
```
in your command line/terminal to install pandas.

Next, you need to have node and npm installed, which you can get [here](https://nodejs.org/en/download/). After installing it, run 
```
npm -v
node -v
```
to check if node and npm are installed. Next, install the libraries you will need for this,
```
npm install express
npm install node-fetch
npm install mongodb
```

Lastly, you need to set up a mongodb server where your data will be stored. It is free for personal use, and you sign up on their [website](https://www.mongodb.com/cloud/atlas).
After setting up a mongodb database, you will have a access url to access your database from applications. Replace the variable uri with this link in optionsData.js on line 5.

After everything is set up, simply run 
```
python runOptionScraper.py
```
and you are done. The script will keep running until it finishes scraping all 7000+ stocks on the NASDAQ.
