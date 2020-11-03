import React, {useState} from "react";
import { useSubscription, gql } from "@apollo/client";
import { List, ListItem } from "./shared/List";
import { Badge } from "./shared/Badge";
import InputForm from "./shared/InputForm";

const WINE = gql`
  subscription WINE($id: uuid!) {
    wines_by_pk(id: $id) {
      id
      name
      grapeType
      reviews(order_by: {created_at: desc}) {
        id
        body
        created_at
      }
    }
  }
`;

const Wine = ({
  match: {
    params: { id },
  },
}) => {

    const [inputVal, setInputVal] = useState("");
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
      <InputForm
        inputVal = {inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSubmit={() => {}}
        buttonText = "Submit"
    />
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Wine;