export const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
        </div>
        <div className="comment-text">{comment.body}</div>
      </div>
    </div>
  );
};
