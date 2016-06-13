import json
import requests

# Uses Quandl's API and currency codes
# https://www.quandl.com/blog/api-for-currency-data

CURRENCY_CODES = [

  # Bank of England rates
  #   To USD         To GBP
  "XUDLADD",  "XUDLADS",  # Australian dollar
  "XUDLGBD",  "XUDLGBG",  # British pound
  "XUDLCDD",  "XUDLCDS",  # Canadian dollar
  "XUDLBK73", "XUDLBK89", # Chinese yuan
  "XUDLERD",  "XUDLERS",  # European euro
  "XUDLJYD",  "XUDLJYS",  # Japanese yen
  "XUDLBK69", "XUDLBK85", # Russian ruble
  "XUDLSFD",  "XUDLSFS",  # Swiss franc
  "XUDLUSD",  "XUDLUSS",  # US dollar
]

URL_BASE = "http://www.quandl.com/api/v3/datasets/BOE/"

for code in CURRENCY_CODES:
  url = URL_BASE + code
  print url

  r = requests.get(url)

  json = r.text

  f = open("../data/" + code + ".json", "a")
  f.write(json.encode("utf-8"))
  f.close()
