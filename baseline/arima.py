from pandas import read_csv
from pandas import datetime
from pandas import DataFrame
from statsmodels.tsa.arima_model import ARIMA
from matplotlib import pyplot
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import math
import numpy as np

def parser(x):
    return datetime.strptime( x, '%Y-%m')


series = read_csv('carson-training.csv', header=0, parse_dates=[0], index_col=0, squeeze=True, date_parser=parser)
series = series.reindex(index=series.index[::-1])

# # fit model
# model = ARIMA(series, order=(5, 1, 0))
# model_fit = model.fit(disp=0)
# print(model_fit.summary())
# # plot residual errors
# residuals = DataFrame(model_fit.resid)
# residuals.plot()
# pyplot.show()
# residuals.plot(kind='kde')
# pyplot.show()
# print(residuals.describe())

X = series.values
size = int(len(X) * 0.66)
train, test = X[0:size], X[size:len(X)]
history = [x for x in train]
predictions = list()

for t in range(len(test)):
    model = ARIMA(history, order=(5,1,0))
    model_fit = model.fit(disp=0)
    output = model_fit.forecast()
    yhat = output[0]
    predictions.append(yhat)
    obs = test[t]
    history.append(obs)
    print('predicted=%f, expected=%f' % (yhat, obs))


mae = mean_absolute_error(test, predictions)
print("Mean Absolute Error: " + str(mae))

mse = mean_squared_error(test, predictions)
print("Mean Squared Error: " + str(mse))

print("Root Mean Squared Error: " + str(math.sqrt(mse)))

r2 = r2_score(test, predictions)
print("R Squared Error: " + str(r2))

# plot
pyplot.scatter(np.arange(0, len(test), 1), test, color='red')
pyplot.plot(test, color='blue')
pyplot.plot(predictions, color='pink')
pyplot.show()

