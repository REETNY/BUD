
import RanAnimeApi from "../Apis/RanAnimeApi";
import RanMangaApi from "../Apis/RanMangaApi";


function wait(delay){
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export default async function RanAnime_Manga(){
    let letters = ['a', "b", "c", "d", "e", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", 'o', "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    try{
        let dataFetched = [];
        let mangasData = [];
        let animesData = [];
        let iterator = 0; 

        for(let z = 0; z < 12; z++){
            if(z % 2 == 0) await wait(1500);
            let genRan = Math.floor(Math.random() * letters.length);
            let res = await RanAnimeApi.get(`/anime?letter=${letters[genRan]}`);
            let rep = res.data;
            let animeData = rep.data[Math.floor(Math.random()*rep.data.length)];
            animesData = [...animesData, animeData];
            iterator += 1;
        }

        if(iterator == 12){
            for(let z = 0; z < 12; z++){
                if(z % 2 == 0) await wait(1500);
                let genRan = Math.floor(Math.random() * letters.length);
                let res = await RanMangaApi.get(`/manga?letter=${letters[genRan]}`);
                let rep = res.data;
                let animeData = rep.data[Math.floor(Math.random()*rep.data.length)];
                mangasData = [...mangasData, animeData];
            }
        }

        dataFetched = [animesData, mangasData]
        
        return dataFetched;
    }catch(err){
        return err
    }
}