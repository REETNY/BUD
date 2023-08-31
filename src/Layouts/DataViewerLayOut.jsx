import React, {useState, useEffect} from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import DataViewerHeader from '../Headers/DataViewerHeader';
import getDataById from '../AsyncFetch/FetchIdData';
import { useQuery } from '@tanstack/react-query';
import LoadingAnimation from '../Externals/LoadingAnimation';
import Error from '../Components/Error';

const DataViewerLayOut = () => {

  let {type, id} = useParams();
  let [linkState, setLink] = useState(undefined);

  const fetchData = useQuery({
    queryKey: ["Data", `${type}`, `${id}`],
    queryFn: async({queryKey}) => {
      return await getDataById(queryKey)
    }
  })

  let loc = useLocation();
  let prevLink = `${loc.pathname}${loc.search}`;

  let urlPrev = loc.state?.myLink;

  
  useEffect(() => {
    setLink(() => urlPrev)
  }, [fetchData.data]);

  if(fetchData.data && fetchData.data.stack == undefined && fetchData.data.componentStack == undefined){
    return (
      <section className="dataViewCont">
        <DataViewerHeader prevLink={linkState} headData={fetchData.data} currType={type} />
        <Outlet context={fetchData.data} />
      </section>
    )
  }

  if(fetchData.isFetching)return(<LoadingAnimation />)

  if(fetchData.data?.stack != undefined || fetchData.data.componentStack != undefined)return(<Error errorData={fetchData.data} rf={prevLink} />)
}

export default DataViewerLayOut