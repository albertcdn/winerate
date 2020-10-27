import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { List, ListItemWithLink } from "./shared/List";
import { Badge } from "./shared/Badge";

const WINES = gql`{
  wines {
    id
    name
    grapeType
  }
}
`;

const Wines = ({ newWines }) => {
  const { loading, error, data } = useQuery(WINES);

  const renderWines = (wines) => {
    return wines.map(({ id, name, grapeType }) => (
      <ListItemWithLink key={id}>
        <Link to={`/wine/${id}`}>
          {name} <Badge>{grapeType}</Badge>
        </Link>
      </ListItemWithLink>   
    ));
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  return <List>{renderWines(newWines || data.wines)}</List>;
    
};

export default Wines;