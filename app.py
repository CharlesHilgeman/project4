# import necessary libraries

import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle 

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# import machine learning model
# joblib.load('model.sav')
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        age = request.form["age"]
        workclass = request.form["workclass"]
        education = request.form["education"]
        marital = request.form["marital"]
        occupation = request.form["occupation"]
        race = request.form["race"]
        sex = request.form["sex"]
        hours = request.form["hours"]
        country = request.form["country"]

        form_result = set((workclass, education, marital, occupation, race, sex, country))
        

        train_data = pd.read_csv("Cleaning/cleaned_salary.csv")

        X_train = pd.get_dummies(train_data.drop(columns=['salary']))
        y_train = train_data["salary"]
        
        test_dict = {}
        for c in X_train.columns:
            if c in form_result:
                test_dict.update({c: [1]})
            else: 
                test_dict.update({c:[0]})

        test_dict.update({"age": [int(age)], "hours": [int(hours)]})
        test_dict_df = pd.DataFrame(test_dict)

        print(test_dict_df.columns, len(test_dict_df.columns))

        X_train1, X_test1, y_train1, y_test1 = train_test_split(X_train, y_train, random_state=1)

        classifier1 = LogisticRegression()

        classifier1.fit(X_train1, y_train1)

        # classifier1 = pickle.load(open('model.sav','rb'))

        predictions = classifier1.predict(test_dict_df)
        print("this is prediction:" + predictions)

        if predictions == ">50K":
            return redirect("/above", code=302)
        else:
            return redirect("/below", code=302)

        # return redirect("/", code=302)

    return render_template("form.html")


@app.route("/above")
def pals1():
    return render_template("above.html")

@app.route("/below")
def pals2():
    return render_template("below.html")

if __name__ == "__main__":
    app.run(debug=True)

