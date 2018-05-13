#-------------------------------------------------------------------
# By Nicholas Alvarez
# The ugliest program I've written. Such a hack job.
# But by god it'll do it's job!
#-------------------------------------------------------------------
#Remove this seeding when actually using it. I have it on for testing.
from numpy.random import seed
seed(1)
from tensorflow import set_random_seed
set_random_seed(2)

import os
from os import path

import csv
from datetime import datetime
from datetime import timedelta
import argparse

#For input formatting
import numpy as np
from sklearn.preprocessing import MinMaxScaler

#Keras stuff
from keras.models import Sequential
from keras.layers.core import Dense, Activation
from keras.layers.recurrent import LSTM
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import math

global inputReversed
inputReversed = False

#This will retrieve the data. Skips the
#   header and assumes its in chronological order (New to old)
#Returns list of vals in chronological order (old to New)
#Expects daily readings...
def ReadData(path):
    dates = []
    data = []
    with open(path, 'rt', ) as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                data.append(float(row[1]))
            except ValueError:
                continue
            try:
                dates.append(datetime.strptime(row[0], '%Y-%m-%d'))
            except ValueError: #Awkward second format.
                try:
                    dates.append(datetime.strptime(row[0], '%Y-%m'))
                except ValueError:
                    continue
    if len(dates) > 1:
        if(dates[0] > dates[1]):
            print("Reversing input data order for processing...")
            data.reverse()
            dates.reverse()
            global inputReversed
            inputReversed = True
    return data, dates

#Get some path stuff
myPath = path.dirname(path.realpath(__file__))
readPath = path.join(myPath, '../data/counties-saturated')
writePath = path.join(myPath, '../data/counties-saturated-predicted')

#Set some vars for the data.
batchSize = 16
verbose = 0
epochs = 2000 #Was 2000
#timeCount = 7 #A week ahead

x = 0
for filename in os.listdir(readPath):
    inputReversed = False
    print("#####################\n#" + filename + "\n#####################")
    x += 1
    #if x > 1:
    #    continue
    

    
    #Read the data
    print("Reading data...")
    filePath = path.join(readPath, filename)
    waterLevels, dates = ReadData(filePath)
    if len(waterLevels) < 2:
        continue

    print("Time Delta Info:\n")
    print("Time delta: " + str(dates[-1] - dates[0]))
    averageTimeDelta = (dates[-1] - dates[0])/len(dates)
    print("Average Time delta: " + str(averageTimeDelta))
    targetDate = datetime(2020, 1, 1)
    timeDifference = targetDate - dates[-1]
    print("Time from target: " + str(timeDifference))
    timeStepsNecessary = math.ceil(timeDifference / averageTimeDelta)
    print("Necessary steps: " + str(timeStepsNecessary))
    print("Timestamps generated:\n")

    for i in range(0, timeStepsNecessary):
        print((dates[-1] + (averageTimeDelta * (i+1))).strftime('%Y-%m'))
    
    timeCount = timeStepsNecessary
    print("\n")
    
    #continue
    
    #Formatting. Refer to original LSTM program for details.
    print("Formatting data...")
    dataScaler = MinMaxScaler(feature_range=(0,1))
    waterLevels = np.array(waterLevels)
    waterLevels = np.reshape(waterLevels, (-1, 1))
    waterLevels = dataScaler.fit_transform(waterLevels)
    times = np.array([x * 1.0 for x in range(0,len(waterLevels)+timeCount)])
    timeScaler = MinMaxScaler(feature_range=(0,1))
    times = timeScaler.fit_transform(times.reshape(-1, 1))
    trainTimes = times[:len(waterLevels)]
    predictTimes = times[len(waterLevels):]
    trainTimes = np.reshape(trainTimes, (trainTimes.shape[0], 1, trainTimes.shape[1]))
    predictTimes = np.reshape(predictTimes, (predictTimes.shape[0], 1, predictTimes.shape[1]))
    trainSamples = np.array(waterLevels)

    ########################################################
    print("Building Keras model...")
    model = Sequential()
    inOutNeurons = 1
    hiddenNeurons = 3

    model.add(LSTM(hiddenNeurons, input_shape=(inOutNeurons, 1), return_sequences=False, activation='tanh', recurrent_activation='sigmoid'))
    #model.add(Activation('hard_sigmoid'))
    model.add(Activation('sigmoid'))

    #model.add(Dense(inOutNeurons))
    model.add(Dense(inOutNeurons, activation='sigmoid'))

    model.compile(loss="mean_squared_error", optimizer="nadam")
    #model.compile(loss="mean_squared_error", optimizer="adam", metrics=['accuracy'])

    print("\nBeginning matrix magic...\n")
    model.fit(trainTimes, trainSamples, epochs=epochs, batch_size=batchSize, verbose=verbose)

    trainPredict = model.predict(trainTimes, batch_size=batchSize)
    testPredict = model.predict(predictTimes, batch_size=batchSize)
    trainPredictActual = dataScaler.inverse_transform(trainPredict)
    waterLevelsActual = dataScaler.inverse_transform(waterLevels)

    error = mean_squared_error(waterLevelsActual, trainPredictActual)
    print("\nMean Squared Error: " + str(error))
    print("Root Mean Squared Error: " + str(math.sqrt(error)))
    error = r2_score(waterLevelsActual, trainPredictActual)
    print("R Squared Error: " + str(error))
    error = mean_absolute_error(waterLevelsActual, trainPredictActual)
    print("Mean Absolute Error: " + str(error))
    
    ########################################################
    #Save the file

    #Prepare the data to be written
    outDates = dates
    outData = dataScaler.inverse_transform(np.concatenate((waterLevels, testPredict)))
    #dateIncrement = dates[1]-dates[0]
    for i in range(len(dates), len(times)):
        outDates.append(outDates[-1] + averageTimeDelta)
    #Flip data to comply with original format.
    if(inputReversed):
        print('Flipping output data back to original order of file...')
        outData = np.flip(outData, 0)
        outDates = np.flip(outDates, 0)
    #Write the data.
    outPath = path.join(writePath, filename)
    with open(outPath, 'w', newline='') as CSV:
        writer = csv.writer(CSV, delimiter=',')
        writer.writerow(['datetime', 'saturated_thickness'])
        for i in range(0, len(outDates)):
            writer.writerow([outDates[i].strftime('%Y-%m'), "{0:.5f}".format(outData[i][0])])


print("Ran LSTM on " + str(x) + " files!")

