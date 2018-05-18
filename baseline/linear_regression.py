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
monts_num = np.reshape(months_num, (-1, 1))

regr = linear_model.LinearRegression()
regr.fit(monts_num, water_levels)


trainPredict = regr.predict(monts_num)

mae = mean_absolute_error(water_levels, trainPredict)
print("Mean Absolute Error: " + str(mae))

mse = mean_squared_error(water_levels, trainPredict)
print("Mean Squared Error: " + str(mse))

print("Root Mean Squared Error: " + str(math.sqrt(mse)))

r2 = r2_score(water_levels, trainPredict)
print("R Squared Error: " + str(r2))

plt.scatter(months_num, water_levels, color='red')
plt.plot(months_num, water_levels, color='blue')
plt.plot(months_num, trainPredict, color='pink')
plt.show()