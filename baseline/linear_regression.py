import csv
from datetime import datetime, timedelta
from sklearn import linear_model
import numpy as np

from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import math

import matplotlib.pyplot as plt

months = []
water_levels = []

# read data
with open('carson-training.csv', newline='') as csvfile:
    diagnosis_reader = csv.reader(csvfile, delimiter=',')
    header = True
    for row in diagnosis_reader:
        if header:
            header = False
            continue
        months.append(datetime.strptime(row[0], '%Y-%m'))
        water_levels.append(float(row[1]))

water_levels.reverse()

months_num = np.arange(0, len(months), 1)

trainX = months_num

trainX = np.reshape(trainX, (-1, 1))

regr = linear_model.LinearRegression()
regr.fit(trainX, water_levels)


test_true_values = water_levels
testPredict = regr.predict(trainX)

mae = mean_absolute_error(test_true_values, testPredict)
print("Mean Absolute Error: " + str(mae))

mse = mean_squared_error(test_true_values, testPredict)
print("Mean Squared Error: " + str(mse))

print("Root Mean Squared Error: " + str(math.sqrt(mse)))

r2 = r2_score(test_true_values, testPredict)
print("R Squared Error: " + str(r2))

plt.scatter(trainX, test_true_values, color='red')
plt.plot(trainX, test_true_values, color='blue')
plt.plot(trainX, testPredict, color='pink')
plt.show()