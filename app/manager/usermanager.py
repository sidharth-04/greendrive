from flask import url_for
from flask_login import UserMixin, current_user, login_user
from flask_login import UserMixin
from app import login
import requests
import math

def authenticate(username, password):
    # Should check if username and password match
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/login'
    json = {
    	"username": username,
    	"password": password,
    	"sign_up": "false"
    }
    response = requests.post(url, params=json)
    if response.text == "log info is correct":
        return True
    return False


def authorize(username):
    login_user(User(username))

def get_user_by_id(id):
    '''
    Returns a user object given a user id.
    '''
    # url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/convert'
    # info = {'username': id, 'convert': '1'}
    # response = requests.post(url, params=info)
    # return User(response.text)
    # return User('rajprasad')
    username = id.to_bytes(math.ceil(id.bit_length() / 8), 'little').decode()
    return User(username)

def get_id_by_username(username):
    '''
    Returns a user id given a username.
    '''
    # return 1
    # url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/convert'
    # info = {'username': username, 'convert': '0'}
    # response = requests.post(url, params=info)
    # return response.text
    id = int.from_bytes(username.encode(), 'little')
    return str(id)

class User(UserMixin):
    '''
    This class is used to represent a user.
    '''
    def __init__(self, username):
        self.id = get_id_by_username(username)
        self.username = username
        self.role = "vendor"
        self.name = "hello"

    def get_id(self):
        '''
        Returns the id of the donor.
        '''
        return self.id

@login.user_loader
def load_user(id):
    return get_user_by_id(int(id))
