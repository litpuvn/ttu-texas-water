import csv
from datetime import datetime, timedelta
from sklearn import linear_model
import numpy as np
# import sklearn.cross_validation as cv

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

size = int(len(water_levels) * 0.66)
months_num = np.arange(0, len(months), 1)


# X_train, X_test, y_train, y_test = cv.train_test_split(months_num, water_levels, test_size=0.25, random_state=0)

trainX = testX = months_num

trainX = np.reshape(trainX, (-1, 1))
testX = np.reshape(testX, (-1, 1))

#regr = linear_model.LassoCV(normalize=True, max_iter=1e5)
regr = linear_model.LassoCV(normalize=True, max_iter=1e5)
regr.fit(trainX, water_levels)

regr_score = regr.score(trainX, water_levels)
regr_alpha = regr.alpha_
print('score:', regr_score, "; alpha:", regr_alpha)
print('CV', regr.coef_)


test_true_values = water_levels
testPredict = regr.predict(testX)

mae = mean_absolute_error(test_true_values, testPredict)
print("Mean Absolute Error: " + str(mae))

mse = mean_squared_error(test_true_values, testPredict)
print("Mean Squared Error: " + str(mse))

print("Root Mean Squared Error: " + str(math.sqrt(mse)))

r2 = r2_score(test_true_values, testPredict)
print("R Squared Error: " + str(r2))

plt.scatter(testX, test_true_values, color='red')
plt.plot(testX, test_true_values, color='blue')
plt.plot(testX, testPredict, color='pink')
plt.show()