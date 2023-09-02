import Anime_MangaHeader from '../Headers/Anime_MangaHeader';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MangaFetch from '../AsyncFetch/MangaFetch';
import EachData2 from '../Components/EachData2';
import LoadingAnimation from '../Externals/LoadingAnimation';
import Error from '../Components/Error';

const Manga = () => {

  let title = document.getElementsByTagName("title");
  title[0].textContent = `BUD/Manga`

  let [params, setParams] = useSearchParams();
  let arrayNum = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 'o', "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  
  let {search, pathname} = useLocation();
  let refreshLink = `${pathname}${search == undefined ? "" : search}`;

  function genSearchParams(key, val){
    let SP = new URLSearchParams(params);
    if(key == "letter"){
      SP.delete("page");
    }
    if(!val || val == null){
      SP.delete(key)
    }else{
      SP.set(key, val);
      setParams(() => SP.toString())
    }
  }

  let alpha = params.get('letter') != undefined ? params.get("letter") : "a";
  let pageNum = params.get("page") != undefined ? params.get("page") : 1;

  let IPP = 25;

  let alphaLink = arrayNum.map((item, index) => {
    return (<li style={alpha == item ? {borderColor: "white", color: "white"} : {}} key={index} onClick={() => genSearchParams("letter", `${item}`)}>{item}</li>)
  })

  const fetchAnime = useQuery({
    queryKey: ['mangaFetch', `${alpha}`, `${pageNum}`],
    queryFn: async({queryKey}) => {
     return await MangaFetch(queryKey)
    }
  })

  let mappedManga = [];
  if(fetchAnime.data && fetchAnime.data.stack == undefined){
    mappedManga = fetchAnime.data?.fetch.map((item, index) => {
      return (<EachData2 prevUrl={refreshLink} fetched={item} key={index} />)
    })
  }

  if(fetchAnime.data && fetchAnime.data.stack == undefined) return (
    <section className="myAnimeSect">
        <Anime_MangaHeader newDataFunc={genSearchParams} currPage={pageNum} oth2={IPP} oth1={fetchAnime.data.totalItem} />
        <div id='viewComponents'>
          <ul className="alphaLinks">
            {alphaLink}
          </ul>

          <section className="renderData">
            {mappedManga}
          </section>
        </div>
    </section>
  )

  if(fetchAnime.data?.stack != undefined){
    return (<Error rf={refreshLink} errorData={fetchAnime.data} />)
  }

  if(fetchAnime.isFetching && mappedManga.length == 0)return (<LoadingAnimation />)
}

export default Manga