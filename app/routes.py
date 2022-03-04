from flask import render_template, redirect, url_for, request
from flask_login import current_user,login_user,login_required,logout_user
from app import app
from app.manager.usermanager import *

@app.route('/')
@app.route('/landing')
def landing():
    if current_user.is_authenticated:
        if current_user.role == "vendor":
            return redirect(url_for("vendor_home"))
        else:
            return redirect(url_for("transporter_home"))
    return render_template('landing.html')

@app.route('/get_started', methods=["GET", "POST"])
def get_started():
    '''
    If the user is already logged in, redirects to the landing page. Otherwise, it renders the get started page. Here, the user can create a new account.
    '''
    if current_user.is_authenticated:
        if current_user.role == "vendor":
            return redirect(url_for("vendor_home"))
        else:
            return redirect(url_for("transporter_home"))
    if request.method == "POST":
        pass
    return render_template('get_started.html')

@app.route('/login', methods=["GET", "POST"])
def login():
    '''
    If the user is already logged in, redirects to the landing page. Otherwise, it renders the login page.
    '''
    if current_user.is_authenticated:
        if current_user.role == "vendor":
            return redirect(url_for("vendor_home"))
        else:
            return redirect(url_for("transporter_home"))
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        if authenticate(username, password):
            authorize(username)
            if current_user.role == "vendor":
                return redirect(url_for("vendor_home"))
            else:
                return redirect(url_for("transporter_home"))
        return render_template('login.html', errorMsg="Incorrect username or password")
    return render_template('login.html', errorMsg="")

@app.route('/vendor_home')
def vendor_home():
    if not current_user.is_authenticated:
        return redirect(url_for('landing'))
    if current_user.role == "transporter":
        return redirect(url_for("transporter_home"))
    return render_template('vendor_home.html', name=current_user.name)

@app.route('/view_shipment/<int:shipment_id>')
def view_shipment(shipment_id):
    if not current_user.is_authenticated:
        return redirect(url_for('landing'))
    if current_user.role == "transporter":
        return redirect(url_for("transporter_home"))
    return render_template('view_shipment.html', name=current_user.name, id=shipment_id)

@app.route('/new_shipment')
def new_shipment():
    if not current_user.is_authenticated:
        return redirect(url_for('landing'))
    if current_user.role == "transporter":
        return redirect(url_for("transporter_home"))
    return render_template('new_shipment.html', name=current_user.name)

@app.route('/transporter_home')
def transporter_home():
    if not current_user.is_authenticated:
        return redirect(url_for('landing'))
    if current_user.role == "vendor":
        return redirect(url_for("vendor_home"))
    return render_template('transporter_home.html', name=current_user.name)

@app.route('/logout')
def logout():
    '''
    Logs out the user.
    '''
    logout_user()
    return redirect(url_for('landing'))
