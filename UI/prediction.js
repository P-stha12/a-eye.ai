let axios = require('axios');
let patientModel = require('./model/patientModel')
let FormData = require('form-data')

function getName(d){
    d.replaceAll('\\',"")
    d.replaceAll('\'',"")
    d.replaceAll('\"',"")
    d = parseInt(d)
    switch(d){
        case 0:
            return 'Cataract';
            break
        case 1:
            return 'Diabeties'
            break
        case 2:
            return 'Glaucoma'
            break
        case 3: 
            return 'Normal'
            break;
        default:
            return 'other'
            break
    }
}

let prediction = async (leftbuff, rightbuff,contact) => {
    let formL = new FormData();
    let formR=new FormData();
    formL.append('files[]',leftbuff,{
        "contentType":"image/jpeg",
        "filename":"left.jpg"
    })
    formR.append('files[]',rightbuff,{
        "contentType":"image/jpeg",
        "filename":"left.jpg"
    })
    try {
        let resultL = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/predict',
            data: formL,
            headers:{"Content-Type":"application/json"}
        })
        let resultR =await axios({
            method:'post',
            url:'http://127.0.0.1:5000/predict',
            data :formR,
            headers:{"Content-Type":"application/json"}
        })
        let problem = {}
        if(resultL.data.percentage >resultR.data.percentage){
            problem ={
                name:getName(resultL.data.prediction),
                percentage:resultL.data.percentage*100,
                eye:"left"
            }
        }else{
            problem ={
                name:getName(resultR.data.prediction),
                percentage:resultR.data.percentage*100,
                eye:"right"
            }
        }
        let doc = await patientModel.findOneAndUpdate({contactNumber:contact},{
            leftEyeProblem:{
                name:getName(resultL.data.prediction),
                percentage:resultL.data.percentage*100
            },
            rightEyeProblem:{
                name:getName(resultR.data.prediction),
                percentage:resultR.data.percentage*100
            },
            problem:problem
        })
        console.log(resultR.data);
    } catch (err) {
        console.log(err)
    }
}

module.exports = prediction