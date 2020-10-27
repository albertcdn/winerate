import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Search from "./Search";
import Wines from "./Wines";

const SEARCH = gql`
query Search($match: String) {
    wines(order_by: {name: asc}, where: {name: {_ilike: $match}}) {
      id
      name
      grapeType
    }
  }
`;

const WineSearch = () => {
    const [inputVal, setInputVal] = useState("");
    const [search, { loading, error, data }] = useLazyQuery(SEARCH);
    return (
        <div>
            <Search 
                inputVal={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onSearch={() => search({ variables: { match: `%${inputVal}%` } })}
            />
            <Wines newWines={data ? data.wines : null}/>
        </div>
    );
};

export default WineSearch;