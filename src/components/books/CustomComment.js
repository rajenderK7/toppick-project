import React from "react";
import { Comment } from "semantic-ui-react";
import "./CustomComment.css";

const CustomComment = ({ username, comment, dateTime, profileURL }) => (
  <Comment.Group>
    <Comment>
      <Comment.Avatar
        as="a"
        src={"https://react.semantic-ui.com/images/avatar/small/joe.jpg"}
      />
      <Comment.Content>
        <Comment.Author>{username}</Comment.Author>
        <Comment.Text>{comment}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
          <Comment.Action>Save</Comment.Action>
          <Comment.Action>{dateTime}</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </Comment.Group>
);

export default CustomComment;
