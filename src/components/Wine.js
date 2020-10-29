import React from "react";
import { useSubscription, gql } from "@apollo/client";
import { List, ListItem } from "./shared/List";
import { Badge } from "./shared/Badge";

const WINE = gql`
  subscription WINE($id: uuid!) {
    wines_by_pk(id: $id) {
      id
      name
      grapeType
      reviews {
        id
        body
      }
    }
  }
`;

const Wine = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, error, data } = useSubscription(WINE, {variables: { id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  const { name, grapeType, reviews } = data.wines_by_pk;

  return (
    <div>
      <h3>
        {name} <Badge>{grapeType}</Badge>
      </h3>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Wine;