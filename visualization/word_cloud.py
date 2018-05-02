import os
from os import path
from wordcloud import WordCloud

d = path.dirname(path.realpath(__file__))
dirPath = path.join(d, '../data/tweets/twdb_monthly')

#Have 1 word cloud with no hashtags, just cut out the hashtag part.
#Have another with only the hashtags
outputDataWords = []
outputDataHashtags = []


for filename in os.listdir(dirPath):
    dataPath = path.join(dirPath, filename)
    text = open(dataPath).read()
    lines = text.split('\n')
    del lines[0] #Remove the legend at the top of the file.

    for line in lines:
        #print(line)
        lineParts = line.split(',')
        if len(lineParts) < 5:
            continue
        #Remove the first, and last 3 elements.
        #Probably a cleaner way to do this. This is faster than slicing.
        del lineParts[0]
        del lineParts[-1]
        del lineParts[-1]
        del lineParts[-1]
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

#Plot and show the actual word cloud.
import matplotlib.pyplot as plt

#wordcloud = WordCloud(max_font_size=40).generate(' '.join(outputDataWords))
wordcloud = WordCloud().generate(' '.join(outputDataWords))
plt.figure()
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.title("Word WordCloud")

#wordcloud = WordCloud(max_font_size=40).generate(' '.join(outputDataHashtags))
wordcloud = WordCloud().generate(' '.join(outputDataHashtags))
plt.figure()
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.title("Hashtag WordCloud")
plt.show()







