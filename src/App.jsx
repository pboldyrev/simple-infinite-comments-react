/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function getId() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function Comment({ comment, deleteCommentFromParent }) {
  const [reply, setReply] = useState("");
  const [childComments, setChildComments] = useState(comment.childComments);
  const [showInput, setShowInput] = useState(false);

  const addChildComment = () => {
    if (!reply) {
      return;
    }
    const newComment = {
      text: reply,
      childComments: [],
    };
    setReply("");
    setShowInput(false);
    setChildComments((prevComments) => {
      let updatedChildren = [
        <Comment
          key={getId()}
          id={getId()}
          deleteCommentFromParent={deleteComment}
          comment={newComment}
        ></Comment>,
        ...prevComments,
      ];
      return updatedChildren;
    });
  };

  const deleteComment = (id) => {
    setChildComments((prevChildren) => {
      return prevChildren.filter((child) => {
        child.props.id !== id;
      });
    });
  };

  const updateComment = (e) => {
    setReply(e.target.value);
  };

  return (
    <div className={comment.text ? "comment" : "comment blank"}>
      {comment.text}
      {!showInput && comment.text && (
        <div className="button-row">
          <button onClick={() => setShowInput(true)}>Reply</button>
          <button onClick={deleteCommentFromParent}>Delete</button>
        </div>
      )}
      {(showInput || !comment.text) && (
        <>
          <input
            value={reply}
            onChange={updateComment}
            placeholder="Reply text..."
          ></input>
          <div className="button-row">
            <button onClick={addChildComment}>Reply</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        </>
      )}
      {childComments}
    </div>
  );
}
function App() {
  return (
    <div className="comment-list-wrapper">
      <div className="content">
        <Comment
          comment={{ id: getId(), text: "", childComments: [] }}
        ></Comment>
      </div>
    </div>
  );
}

export default App;
