import { useField } from '../hooks';

const CreateNew = ({ addAnecdote }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0,
    });
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button type="submit">create</button>
        <button
          type="button"
          onClick={() => {
            content.reset();
            author.reset();
            info.reset();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;