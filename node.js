var jspbusstops = require('./data/source/jsp_stanici.json');
var fs = require('fs');

class GeoJson {
    constructor(features){
        
        this.type = "FeatureCollection";
        this.features = features;
    }
}

class Feuture{
    constructor(geometry,type,properties){
        this.geometry = geometry;
        this.type = type;
        this.properties = properties;
    }
}

class Geometry {
    constructor(type,coordinates){
        this.type = type;
        this.coordinates = coordinates;
    }
}


class Properties {
    constructor(description,marker_symbol,title,url,lines,address){
        this.description = description;
        this.marker_symbol = marker_symbol;
        this.title = title;
        this.url = url;
        this.lines = lines;
        this.address = address;

    }
}



mapJSP();

function mapJSP(){
    let geojson = new GeoJson(new Array);


    for(let e of jspbusstops){


        //Geometry
        let newCoord = [];
        let geometry_type = "Point";
        newCoord[0] = e.lon;
        newCoord[1] = e.lat;
        let geometry = new Geometry(geometry_type,newCoord);

        //Type
        // let featureType = "Feature";
        let type = "Feature";

        //Properties
        let description = e.name;
        let marker_symbol = "bus-stop";
        let title = e.id;
        let url = "empty";
        let lines = "empty";
        let address = e.name;
        let properties = new Properties(description,marker_symbol,title,url,lines,address)

        //Feature
        let newFeature = new Feuture(geometry, type, properties);

        //push to geojson
        geojson.features.push(newFeature);

    }

    geojson = JSON.stringify(geojson);
    fs.writeFile("./data/output/busstops.json", geojson, 'utf8',callback);
    // console.log(JSON.stringify(geojson));
}

function callback(err) {
    console.log(err);
}

// console.log(JSON.stringify(newj));

