import React, {useState} from "react";
import { useSubscription, useMutation, gql } from "@apollo/client";
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

const ADD_REVIEW = gql`
mutation ($body: String!, $id: uuid!) {
    AddTrashlessReview(body: $body, id: $id) {
      affected_rows
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

  const [addReview] = useMutation(ADD_REVIEW);

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
        onSubmit={() => {
            addReview({ variables: {id, body: inputVal } })
            .then(() => setInputVal(""))
            .catch((e) => {
              setInputVal(e.message);
        });
    }}
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