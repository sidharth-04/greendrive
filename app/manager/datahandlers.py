import requests
from flask import jsonify

def create_new_user(info):
    first_json = info
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/function-1'
    response = requests.post(url, params=first_json)

    second_json = {
        'username': info['username'],
        'password': info['password'],
        'sign_up': 'true'
    }
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/login'
    response = requests.post(url, params=second_json)
    if response.text == "Username already exists":
        return "alreadyExists"
    return "allGood"

def get_vendor_data(username):
    info = {
        "vendor": username,
        "time": 0,
        "sustainability": 0
    }
    url = "https://us-central1-eng-oven-342617.cloudfunctions.net/function-2"
    response = requests.post(url, params=info)
    return response.json()

def create_new_shipment(info):
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/new_shipment'
    print(info)
    response = requests.post(url, params=info)
    print(response.text)
    if response.text == "Invalid Request":
        return False
    return True
