import MovieApi from "../Apis/MovieApi";

async function getLocation() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    if(lat != undefined && lon != undefined){
        getCounty(lat, lon)
    }
}

let GEOCODINGKEY = `64336cfdc95e4fb58d5e897eacc762bd`;

let geoData = {
    co: "",
    st: "",
    cy: "",
    ct: "",
    cc: ""
}

async function getCounty(lat, lon){
    let serverResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEOCODINGKEY}`);
        let resp = await serverResponse.json();
    let response = resp.results[0];
    let {country, state, city, continent} = response.components;

    geoData = {
        co: country,
        st: state,
        cy: city,
        ct: continent,
        cc: response.components["ISO_3166-1_alpha-2"]
    }
}




export default async function FetchMore(queryKey){
    await getLocation()
    let type = queryKey[2];
    let id = queryKey[1];

    let Credit = `/${type}/${id}/credits?language=en-US`;
    let OthImgs = `/${type}/${id}/images`;
    let Similar = `/${type}/${id}/similar?language=en-US&page=1`;
    let Reviews = `/${type}/${id}/reviews?language=en-US&page=1`;
    let WatchProvider = `/${type}/${id}/watch/providers`;
    let ReleaseDate = `/${type}/${id}/release_dates`;
    let ContentRating = `/${type}/${id}/content_ratings`;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQxMmEzM2Y3ZGM2YjZlNGYxYzhlNGEyYWI4YWRhNCIsInN1YiI6IjYzYTk3ZjI2ZWRhNGI3MDBkNzY3MWM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaQDnk3-5VSEXMcuUlZa1Bgxq6c3CTUmJ0tvqEzC3Wg'
        }
    };


    try{
        let res1 = await MovieApi.get(Credit, options);
        let rep1 = res1?.data;
        
        let res2 = await MovieApi.get(OthImgs, options);
        let rep2 = res2?.data;

        let res3 = await MovieApi.get(Similar, options);
        let rep3 = res3?.data;

        let res4 = await MovieApi.get(Reviews, options);
        let rep4 = res4?.data;

        let res5 = await MovieApi.get(WatchProvider, options);
        let rep5 = res5?.data;

        let res6 = type == "movie" ? await MovieApi.get(ReleaseDate, options) : "";
        let rep6 = res6?.data;

        let res7 = type == "tv" ? await MovieApi.get(ContentRating, options) : "";
        let rep7 = res7?.data;

        let fetchedData = {
            creditsData: rep1,
            otherImages: rep2,
            releaseDate: rep6,
            contentRating: rep7,
            similar: rep3,
            reviews: rep4,
            watchProvide: rep5,
            geoDatas: geoData
        }

        console.log(fetchedData);

        return fetchedData
    }catch(err){
        return err
    }
}
  