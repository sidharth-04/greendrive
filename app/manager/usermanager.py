from flask import url_for
from flask_login import UserMixin, current_user, login_user
from flask_login import UserMixin
from app import login
import requests

def authenticate(username, password):
    # Should check if username and password match
    if username == "vendor" and password == "password":
        return True
    url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/login'
    json = {
    	"username": username,
    	"password": password,
    	"sign_up": "false"
    }
    response = requests.post(url, data=json)
    if response.text == "Invalid Request":
        print("not valid username password")
        return False
    return True


def authorize(username):
    login_user(User(username))

def get_user_by_id(id):
    '''
    Returns a user object given a user id.
    '''
    if id == 1:
        username = "vendor"
    else:
        username = "transporter"
    return User(username)

def get_id_by_username(username):
    '''
    Returns a user id given a username.
    '''
    if username == "vendor":
        id = 1
    else:
        id = 2
    return id

class User(UserMixin):
    '''
    This class is used to represent a user.
    '''
    def __init__(self, username):
        self.id = get_id_by_username(username)
        self.username = username
        if self.id == 1:
            self.role = "vendor"
            self.name = "Lokesh"
        else:
            self.role = "transporter"
            self.name = "Mangesh"

    def get_id(self):
        '''
        Returns the id of the donor.
        '''
        return self.id

@login.user_loader
def load_user(id):
    return get_user_by_id(int(id))
