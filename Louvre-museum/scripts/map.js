const mymap = L.map('map').setView([48.8606, 2.3376], 16);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 22,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW5haXN0YXQiLCJhIjoiY2t1bDR5eWZhM2RpdDJvbW9sa3BhM3R4ZyJ9.25oRw5MKDqiuktvMJLmaxA'
}).addTo(mymap);

const marker = L.marker([48.86091, 2.3364]).addTo(mymap);
const marker1 = L.marker([48.8602, 2.3333]).addTo(mymap);
const marker2 = L.marker([48.8607, 2.3397]).addTo(mymap);
const marker3 = L.marker([48.8619, 2.3330]).addTo(mymap);


