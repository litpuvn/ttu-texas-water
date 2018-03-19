import csv
from datetime import datetime
from datetime import timedelta
import numpy as np
import argparse
import time

lookback = 1

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
                #We know its in order, so just need actual num...
                data.append(float(row[1]))
                dates.append(datetime.strptime(row[0], '%Y-%m-%d'))
            except ValueError:
                continue
    #Again, data assumed to be in order from newest to oldest.
    data.reverse()
    dates.reverse()
    return data, dates

'''

Maybe construct input as
[401, 0, ..., 0],
[401, 402, 0, ..., 0],
...,
[401, 402, ..., 500]

Then split as test input and train input.
Need to design Y to match.
'''

#-------------------------------------------------------------------
#ARG PARSING!
#-------------------------------------------------------------------

parser = argparse.ArgumentParser(description='Run a linear regression to predict the future of a sequence.')
#This expects it with two columns, the date then the data.
parser.add_argument('path', type=str, help='Path to the input file.')
#Use same time units as the data. Got daily readings? Look ahead in days.
parser.add_argument('timeCount', type=int, help='Number of time units to look ahead.')
parser.add_argument('-g', '--graph', action='store_true', help='Display a graph.')
parser.add_argument('-s', '--save', action='store_true', help='Toggle saving an output file with predicted values.')
parser.add_argument('-o', '--output', type=str, default=None, help='Saves output file with name provided. Make sure to also use -s!')
args = parser.parse_args()

    
#-------------------------------------------------------------------
#DATA FORMATTING!
#-------------------------------------------------------------------    


waterLevels, dates = ReadData(args.path)
times = np.array(range(0, len(waterLevels) + args.timeCount))

trainX, predictX = times[0:len(waterLevels)], times[len(waterLevels):]
trainY = waterLevels

trainX = np.reshape(np.array(trainX), (-1, 1))
predictX = np.reshape(np.array(predictX), (-1, 1))


#-------------------------------------------------------------------
#BUILD AND FIT MODEL!
#-------------------------------------------------------------------
from sklearn.kernel_ridge import KernelRidge
from sklearn.model_selection import GridSearchCV
import matplotlib.pyplot as plt


KRR_RBF = GridSearchCV(KernelRidge(kernel='rbf', gamma=0.1), cv=5,
                       param_grid={"alpha": [1e0, 0.1, 1e-2, 1e-3],
                                   "gamma": np.logspace(-2, 2, 5)})


KRR_RBF.fit(trainX, trainY)


#-------------------------------------------------------------------
#PREDICT!   ERROR SCORE!
#-------------------------------------------------------------------
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import math


trainPredict = KRR_RBF.predict(trainX)
outPredict = KRR_RBF.predict(predictX)

error = mean_squared_error(waterLevels, trainPredict)
print("\nMean Squared Error: " + str(error))

print("Root Mean Squared Error: " + str(math.sqrt(error)))

error = r2_score(waterLevels, trainPredict)
print("R Squared Error: " + str(error))

error = mean_absolute_error(waterLevels, trainPredict)
print("Mean Absolute Error: " + str(error))


#-------------------------------------------------------------------
#SAVING OPTION
#-------------------------------------------------------------------


if(args.save):
    #Get the name for the output file
    outName = ""
    if(args.output == None):
        pathParts = args.path.split('\\')
        inName = pathParts[len(pathParts)-1]
        outName = inName.split('.')[0]
        outName = outName + '_KRRpreditions.csv'
    else:
        outName = args.output

    #Prepare the data to be written
    outData = np.concatenate([waterLevels, outPredict])

    #Prepare the dates to be written
    outDates = []
    firstDate = dates[0]
    dateIncrement = dates[1]-dates[0]
    for i in range(0, len(times)):
        outDates.append(firstDate + dateIncrement*(i))
    
    #Flip data to comply with original format.
    outData = np.flip(outData, 0)
    outDates = np.flip(outDates, 0)
        
    #Write the data.
    with open(outName, 'w', newline='') as CSV:
        writer = csv.writer(CSV, delimiter=',')
        writer.writerow(['datetime', 'water_level(ft below land surface)'])
        for i in range(0, len(outDates)):
            writer.writerow([outDates[i].strftime('%Y-%m-%d'), "{0:.2f}".format(outData[i])])#[0])])
    

#-------------------------------------------------------------------
#GRAPHING OPTION
#-------------------------------------------------------------------


if(args.graph):
    import matplotlib.pyplot as plt

    outPlot = np.concatenate([trainPredict, outPredict])

    plt.plot(waterLevels)
    plt.plot(outPlot)
    plt.show()































































































