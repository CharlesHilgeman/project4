# import necessary libraries

import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression


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

        form_result = [int(age), workclass, education, marital, occupation, race, sex, int(hours), country]

        return redirect("/", code=302)

    return render_template("form.html")


@app.route("/api/pals")
def pals():

    train_data = pd.read_csv("Cleaning/cleaned_salary.csv")

    X_train = pd.get_dummies(train_data.drop(columns=['salary']))
    y_train = train_data["salary"]

    from sklearn.model_selection import train_test_split

    X_train1, X_test1, y_train1, y_test1 = train_test_split(X_train, y_train, random_state=1)

    from sklearn.linear_model import LogisticRegression

    classifier1 = LogisticRegression()

    classifier1.fit(X_train1, y_train1)

    predictions = classifier1.predict(form_result)

    return jsonify(predictions)


if __name__ == "__main__":
    app.run()
