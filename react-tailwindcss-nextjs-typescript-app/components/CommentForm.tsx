import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRef, useState} from 'react';

const motionConfig = {
  initial: {
    x: 0,
    y: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  hidden: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const CommentForm = ({
  commentId,
  setIsShow,
}: {
  commentId: number;
  setIsShow: (isShow: boolean) => void;
}) => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (messageRef.current?.value === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      console.log({
        parentCommentId: commentId,
        comment: messageRef.current?.value,
      });
      setIsShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.form
      className="w-full px-2"
      initial={'initial'}
      animate={'animate'}
      exit={'hidden'}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      variants={motionConfig}
    >
      <label
        htmlFor={`message-${commentId}`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Your message
      </label>
      <textarea
        id={`message-${commentId}`}
        rows={4}
        name={`message-${commentId}`}
        className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
        ref={messageRef}
        value={message}
        onChange={handleChange}
      ></textarea>
      <div className="w-full mt-2 flex justify-end items-center">
        <button
          type={'button'}
          disabled={disabled}
          onClick={handleSubmit}
          className={cx(
            'px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center',
            `disabled:bg-gray-400`
          )}
        >
          Comment
        </button>
      </div>
    </motion.form>
  );
};

export default CommentForm;
