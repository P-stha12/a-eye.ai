import os
import numpy as np
import json
from flask import Flask, jsonify, request
from keras.models import load_model
from PIL import Image

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def apicall():

    image = request.files.getlist('files[]')[0]
    im = Image.open(image)
    im = im.resize((150,150))
    
    test = np.array(im)
    test = np.expand_dims(test, axis=0)
    
    model = load_model('./final.h5')
    prediction = model.predict(test)
    predictions = prediction.tolist()[0]
    prediction = np.argmax(predictions)
    print(prediction)
    percentage = predictions[prediction]

    responses = jsonify(prediction=json.dumps(str(prediction)), percentage=json.dumps(percentage))
    responses.status_code = 200

    return (responses)
    
app.run()
