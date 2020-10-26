import React from "react";
import { useQuery, gql } from "@apollo/client";
import { List, ListItem } from "./shared/List";
import { Badge } from "./shared/Badge";

const WINES = gql`{
  wines {
    id
    name
    grapeType
  }
}
`;

export default function Wines() {
  const { loading, error, data } = useQuery(WINES);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  return(
    <List>
      {data.wines.map(({ id, name, grapeType }) => (
        <ListItem key={id}>
          {name} <Badge>{grapeType}</Badge>
        </ListItem>
      ))}
    </List>
  )
}