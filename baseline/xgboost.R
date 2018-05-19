library(xgboost)
library(readr)
library(stringr)
library(caret)
library(Metrics)

#devtools::install_github("ellisp/forecastxgb-r-package/pkg")
#library(forecastxgb)


set.seed(100)
setwd("/home/long/TTU-SOURCES/ttu-texas-water")
# load data
df = read.csv(file="baseline/carson-training.csv", header = TRUE, sep = ',')

# reverse order
df<- df[seq(dim(df)[1],1),]

size = as.integer(nrow(df) * 0.66)

df_train = df[0:size,]
df_test = df[size:nrow(df),]
x_train = array(1:size)

x_test = array(size:nrow(df))
y_test = df_test$saturated_thickness
# Train the xgboost model using the "xgboost" function
dtrain = xgb.DMatrix(data = data.matrix(x_train), label = df_train$saturated_thickness)
xgModel = xgboost(data = dtrain, nround = 10000, booster = "gblinear", objective = "reg:linear")

xgb_predict = predict(xgModel, data.matrix(x_test))

# compute RMSE, MAE and R-squared
postResample(pred = xgb_predict, obs = y_test)


message('mae: ', mae(y_test, xgb_predict), '; mse: ', mse(y_test, xgb_predict), '; rmse: ', rmse(y_test, xgb_predict), '; r2: ', caret::R2(xgb_predict, y_test) )