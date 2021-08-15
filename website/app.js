/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/'+ d.getDate()+'/'+ d.getFullYear();
const apikey = "&appid=eb178e6646ab2ff673acea0b68822814&units=metric";
const apiurl ="http://api.openweathermap.org/data/2.5/forecast?zip=";
// Event listener to add function to existing HTML DOM element
let btn = document.getElementById('generate');
btn.addEventListener('click', performAction);

function performAction()
{
    const zipCode = document.getElementById('zip').value;                  
    let userResponse = document.getElementById('feelings').value;
    getWeatherData(apiurl, zipCode, apikey)

    .then(function(weatherData){
        if(weatherData.cod !=200)
        {return alert(weatherData.message)}
        postData('http://localhost:5000/addData', {date:newDate,temp:weatherData.list[0].main.temp , f:userResponse})
        updateUI();
    })
}

async function getWeatherData(url,z,api)
{
  
    const link = await fetch(url + z + api)
    try{
        const data =await link.json();
        return data;
    }  
    catch(err){
         console.log(err);
         
    }
}
const postData=async (url='',data={})=>
{
    console.log(data);
    const response = await fetch(url,
        {
            method: 'POST'
            ,credentials: 'same-origin'
            ,headers:{
                'content-type':'application/json',
            },body:JSON.stringify(data),
        });
            try{
                const newData = await response.json();
                console.log(newData);
                return newData
            }
            catch(err){
                console.log(err)
            }
}
const updateUI = async()=>{
        const request = await fetch('/data')
        try{
            const allData = await request.json();
            console.log(allData)
            document.getElementById('date').innerHTML = "Date:"+ allData.date;
            document.getElementById('temp').innerHTML = "Temperature:" + allData.temp;
            document.getElementById('content').innerHTML = "feelings:" + allData.feel;
        }
        catch(err){
            console.log('error',err);
        }
    }