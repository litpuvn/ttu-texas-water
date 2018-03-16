# This code collects monthly data from https://waterdatafortexas.org
import urllib
import json
import codecs
import sys
reload(sys)
sys.setdefaultencoding('utf8')
##for YEAR in range(2017,2018):
##    for MONTH in range(1,2):
#      with codecs.open((YEAR + "-" + MONTH + ".json"), 'w') as outF:
with codecs.open((2017 + "-" + 12 + ".json"), 'w') as outF:
#with codecs.open("2017-12.json", 'w') as outF:
#            writer = json.DictWriter(outF)
#            url = "https://waterdatafortexas.org/drought/spi1/monthly/data?end=" + YEAR + "-" + MONTH + "&maxValues=1&start=" + YEAR + "-" + MONTH
            url = "https://waterdatafortexas.org/drought/spi1/monthly/data?end=2017-12&maxValues=1&start=2017-12"
            response = urllib.urlopen(url)
#            outF.write(json.loads(response.read()))
            data = json.loads(response.read())
            json.dump(data,outF)
  #    sleep(2s)
