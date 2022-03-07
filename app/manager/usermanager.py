from flask import url_for
from flask_login import UserMixin, current_user, login_user
from flask_login import UserMixin
from app import login
import requests

def authenticate(username, password):
    # Should check if username and password match
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/login'
    json = {
    	"username": username,
    	"password": password,
    	"sign_up": "false"
    }
    response = requests.post(url, params=json)
    if response.text == "Invalid Request":
        return False
    if response.text == "Username does not exist":
        return False
    return True


def authorize(username):
    login_user(User(username))

def get_user_by_id(id):
    '''
    Returns a user object given a user id.
    '''
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/convert'
    info = {'username': id, 'convert': '1'}
    response = requests.post(url, params=info)
    return User(response.text)

def get_id_by_username(username):
    '''
    Returns a user id given a username.
    '''
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/convert'
    info = {'username': username, 'convert': '0'}
    response = requests.post(url, params=info)
    return response.text

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
