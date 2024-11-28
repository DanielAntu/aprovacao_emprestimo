import joblib
import numpy as np


def clf(predictors):
    model = joblib.load('model_clf.pkl')
    scaler = joblib.load('scaler.pkl')
    predictors_sc = scaler.transform(np.array(predictors).reshape(1, -1))
    predict = model.predict(predictors_sc)[0]
    predict = 'Aprovado' if predict == 1 else 'Reprovado'
    return predict

if __name__ == '__main__':
    val = [22.0, 71948.0, 0.0, 35000.0, 16.02, 0.49, 3.0, 561.0, 0.0, 4.0, 0.0, 4.0, 0.0]
    print(clf(val))