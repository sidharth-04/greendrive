from flask import render_template,url_for,request
from app import app
from app.database import Database

db = Database()

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/data',methods=["POST","GET"])
def data():
    if request.method == "POST":
        json = request.json
        db.insert_data(json)
    else:
        json_response = db.fetch_data()
        return json_response
    return "complete"
