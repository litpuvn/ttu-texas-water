import os
from os import path
from dateutil.parser import parse
from wordcloud import WordCloud, STOPWORDS


#For parsing whether a line is a date.
def isDate(string):
    try:
        parse(string)
        return True
    except ValueError:
        return False


d = path.dirname(path.realpath(__file__))
dirPath = path.join(d, '../data/tweets/twdb_monthly')

#Have 1 word cloud with no hashtags.
#Have another with only the hashtags.
outputDataWords = []
outputDataHashtags = []


for filename in os.listdir(dirPath):

    #if not filename == "2016-12.csv": continue
    
    dataPath = path.join(dirPath, filename)
    #text = open(dataPath).read()
    with open(dataPath) as file:
        text = file.read()
        lines = text.split('\n')
        del lines[0] #Remove the legend at the top of the file.

        for line in lines:
            #print(line)
            lineParts = line.split(',')
            if len(lineParts) < 5: #Bad line
                continue
            elif len(lineParts) == 5:
                #Remove the first, and last 3 elements.
                #Probably a cleaner way to do this. This is faster than slicing.
                del lineParts[0] #Clear the ID
                del lineParts[-1] #Clear the timestamp
                del lineParts[-1] #Clear place
                del lineParts[-1] #Clear coordinates
            else:
                del lineParts[0] #Clear the ID
                del lineParts[-1] #Clear the timestamp
                del lineParts[-1] #Clear place
                del lineParts[-1] #Clear coordinates
                indexesToDelete = []
                tracingToEnd = False # Handles the crazy JSON object.
                for i in range(0, len(lineParts)):
                    if tracingToEnd: #For removing the JSON object, if it's there.
                        if lineParts[i].endswith('}"'):
                            tracingToEnd = False
                        indexesToDelete.append(i)
                        continue
                    elif lineParts[i].startswith('None'): #Remove None line parts
                        indexesToDelete.append(i)
                    elif isDate(lineParts[i]): #Remove line parts that are just dates
                        indexesToDelete.append(i)
                    elif lineParts[i].startswith('"{'): #For removing the JSON object.
                        tracingToEnd = True
                        indexesToDelete.append(i)
                for i in range(0, len(indexesToDelete)):
                    del lineParts[indexesToDelete[i] - i]
            trimmedLine = ','.join(lineParts)          
            #Trim quotes if they're there.
            if trimmedLine[0] == '"':
                trimmedLine = trimmedLine[1:-1]

            #Remove 'RT' for retweets
            if trimmedLine.startswith('RT'):
                trimmedLine = trimmedLine[3:]

            #Word by Word processing
            #processedWords = []
            words = trimmedLine.split(' ')
            for word in words:
                #Ignore empty 'words'
                if len(word) < 1:
                    continue
                #Fix & encoding
                if word == '&amp;':
                    word = '&'
                #Remove hyperlinks
                httpIndex = word.find('http')
                if httpIndex == 0: #Remove hyperlinks
                    continue #Just keep going. Don't add the word to the result.
                elif httpIndex > 0: #Some hyperlinks typed into the word. Cut out link
                    word = word[0:httpIndex] #Cut out the link.
                #Remove handles
                if word[0] == '@':
                    continue
                #Hashtags. Added to own list for separate word cloud
                #Removed from normal word cloud.
                if word[0] == '#':
                    #word = word[1:]
                    outputDataHashtags.append(word)
                    continue #Don't add hashtags to the word wordcloud
                #After all the processing, if it got here, it's a good word.
                #Append it to the list.
                outputDataWords.append(word)
                #processedWords.append(word)
            #print(' '.join(processedWords) + '\n')





    
    





print("Length of word list: " + str(len(outputDataWords)))
print("Length of hashtag list: " + str(len(outputDataHashtags)))

#Seems like it's cutting Texas and Texans into 'Texa' or something.
#Will work on that later.

#Stopwords
stopWords = set(STOPWORDS)
with open(path.join(d, 'stopwords.txt')) as stopWordsFile:
    words = stopWordsFile.read().split('\n')
    for word in words:
        if not word.startswith(';'):
            stopWords.add(word)
    

#stopWords.add("TEXA")

#Plot and show the actual word cloud.
import matplotlib.pyplot as plt

wordcloud = WordCloud(collocations=False, width=1280, height=720, mode='RGBA', background_color=None, stopwords=stopWords).generate(' '.join(outputDataWords))
plt.figure(figsize=(12.8, 7.2))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.title("Word WordCloud")

wordcloud = WordCloud(collocations=False, width=1280, height=720, mode='RGBA', background_color=None, stopwords=stopWords).generate(' '.join(outputDataHashtags))
plt.figure(figsize=(12.8, 7.2))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.title("Hashtag WordCloud")
plt.show()







