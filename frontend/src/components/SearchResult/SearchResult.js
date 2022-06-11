import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AllMatchingResults from './AllMatchingResults';
import LoadingSpinner from '../LoadingSpinner';
import Error from '../Error';
import SubHeader from '../Header/SubHeader';

// this component is responsible for showing the results of all items that match the keywords in the SearchBar.js.
const SearchResult = () => {
  const { keyword } = useParams();

  const [error, setError] = useState();

  // this state is passing down to ProductList component
  const [items, setItems] = useState();

  // fetching all products that match the keywords in the search bar
  useEffect(() => {
    fetch(`/api/arts/name/${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404 || data.status === 400) {
          setError(data.message);
        }
        if (data.status === 200) {
          setItems(data.data);
          console.log(data.data);
        }
      })
      .catch((err) => {
        console.log('fetch data error: ' + err);
      });
  }, [keyword]);

  if (error) {
    return (
      <Error
        message={"Sorry, we can't seem to find what you're looking for."}
      />
    );
  }
  return items ? (
    <>
      {/* <SubHeader title='Search results' subTitle={'keyword: ' + keyword} /> */}
      <AllMatchingResults arts={items} />
    </>
  ) : (
    <LoadingSpinner top={40} />
  );
};

export default SearchResult;
