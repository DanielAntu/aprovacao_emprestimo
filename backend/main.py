from flask import Flask, jsonify, request
from flask_cors import CORS

from db import *
from model_clf import clf
from utils import error_message
from validation import validation_data

app = Flask(__name__)
CORS(app)

@app.route('/genders')
def get_genders():
    return jsonify(list_gender)

@app.route('/schools')
def get_schools():
    return jsonify(list_sch)

@app.route('/home')
def get_home():
    return jsonify(list_home_situation)

@app.route('/purpose')
def get_purpose():
    return jsonify(list_purpose)

@app.route('/confirmation')
def get_confirmation():
    return jsonify(list_conf)

@app.route('/aprovation', methods=['POST'])
def post_aprovation():
    data = request.get_json()

    size_gender = len(list_gender)
    size_education = len(list_sch)
    size_home = len(list_home_situation)
    size_purpose = len(list_purpose)
    size_conf = len(list_conf)

    age = validation_data(data, 'age', type_date=True)
    income = validation_data(data, 'income')
    experience = validation_data(data, 'experience')
    requested_loan = validation_data(data, 'requested_loan')
    interest_rate = validation_data(data, 'interest_rate')
    historical_duration = validation_data(data, 'historical_duration', type_date=True)
    credit_point = validation_data(data, 'credit_point')
    gender = validation_data(data, 'gender', size_list=size_gender)
    educational_level = validation_data(data, 'educational_level', size_list=size_education)
    home_situation = validation_data(data, 'home_situation', size_list=size_home)
    purpose = validation_data(data, 'purpose', size_list=size_purpose)
    default = validation_data(data, 'default', size_list=size_conf)

    if not age:
        return jsonify(error_message('idade')), 400
    
    if not income:
        return jsonify(error_message('renda anual')), 400
    
    if experience == '':
        return jsonify(error_message('tempo de experiência')), 400
    
    if not requested_loan:
        return jsonify(error_message('empréstimo solicitado')), 400
    
    if not interest_rate:
        return jsonify(error_message('taxa de juro')), 400
    
    if not historical_duration:
        return jsonify(error_message('duração do histórico')), 400
    
    if not credit_point:
        return jsonify(error_message('pontuação de crédito')), 400
    
    if gender == '':
        return jsonify(error_message('gênero')), 400
    
    if educational_level == '':
        return jsonify(error_message('nível de educação')), 400
    
    if home_situation == '':
        return jsonify(error_message('situação da casa')), 400
    
    if purpose == '':
        return jsonify(error_message('finalidade do empréstimo')), 400
    
    if default == '':
        return jsonify(error_message('inadimplência')), 400
    
    if historical_duration > age:
        return jsonify({'err': 'A duração do historico não pode ser maior do que a idade'}), 400
    
    if experience > age:
        return jsonify({'err': 'A experiência não pode ser maior do que a idade'}), 400

    emp_val_ra = round(requested_loan / income, 2)

    predictors = [age, income, experience, requested_loan, interest_rate, emp_val_ra, historical_duration, credit_point, gender, educational_level, home_situation, purpose, default]

    resp = clf(predictors)
    return jsonify({'status': resp})

if __name__ == '__main__':
    app.run(debug=True)
