import {formatRelativeTime} from '@/utils/dateUtil';
import {cx} from '@emotion/css';
import {Comment} from 'domains/comment';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useMemo, useState} from 'react';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineQuickreply,
} from 'react-icons/md';
import ShortHandMenu from '@/components/ShortHandMenu';
import dataComments from '@/data/comments.json';
import {default as numbro} from 'numbro';
import {AnimatePresence} from 'framer-motion';
import CommentForm from '@/components/CommentForm';

const Comment = ({item}: {item: Comment}) => {
  const router = useRouter();

  const replyCount = useMemo(() => {
    if (!item) {
      return 0;
    }
    return dataComments.filter((d) => {
      return d.parentCommentId === item.commentId;
    }).length;
  }, [item]);

  const [isShow, setIsShow] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleReply = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsShow((prev) => {
      return !prev;
    });
  };

  const handleLiked = (e: React.MouseEvent<HTMLDivElement>) => {
    setLiked((prev) => {
      return !prev;
    });
  };

  return (
    <div
      id={`${item.commentId}`}
      className={cx(
        'relative w-full min-h-[8rem] border-2 rounded-xl px-2 py-2',
        `border-2 border-gray-200 dark:border-slate-500`,
        `mb-2`
      )}
    >
      <div className="w-full flex items-start gap-2 min-h-[3rem]">
        <div className={cx('w-full flex flex-col items-start gap-2')}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <picture>
                <source srcSet={item.avatorURL} type={`image/png`} />
                <img
                  src={item.avatorURL}
                  alt={'profile'}
                  width={40}
                  height={40}
                  className={`rounded-full border-2`}
                />
              </picture>
              <span>{item.userName}</span>
              <span className="text-sm">
                {formatRelativeTime(item.updatedAt)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center justify-center">{`#${item.commentId}`}</span>
              <ShortHandMenu item={item} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-2">
        <p className="break-words">{item.text}</p>
      </div>
      <div
        className={cx(
          'w-full h-[32px] flex justify-between px-2 min-h-[3rem] items-center',
          `border-t-2 border-gray-200 dark:border-slate-500`
        )}
      >
        {/* <Link href={`https://example.com/`} passHref>
          <a target={"_blank"}>example</a>
        </Link> */}
        {item.parentCommentId && (
          <Link
            passHref
            replace
            scroll={false}
            href={{
              pathname: router.pathname,
              query: router.query,
              hash: `${item.parentCommentId}`,
            }}
            // https://nextjs.org/docs/api-reference/next/link
          >
            <a
              target={'_blank'}
              className="w-full flex items-start justify-start hover:underline hover:cursor-pointer"
            >{`linked to #${item.parentCommentId}`}</a>
          </Link>
        )}
        {replyCount !== 0 && (
          <span className="w-full flex items-start justify-start">{`have ${replyCount} reply`}</span>
        )}
        <div className="w-full flex justify-end items-center gap-4">
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={handleLiked}
          >
            {liked ? (
              <MdOutlineFavorite
                size={20}
                fill={`rgb(244 114 182)`} // bg-pink-400
              />
            ) : (
              <MdFavoriteBorder
                size={20}
                fill={`rgb(156 163 175)`} // text-gray-400
              />
            )}
            <span className="text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-50 flex items-center gap-1">
              Like
              <span className="flex items-center justify-center">
                {item.likedCount === 0
                  ? null
                  : numbro(item.likedCount).format({
                      average: true,
                    })}
              </span>
            </span>
          </div>
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={handleReply}
          >
            <MdOutlineQuickreply size={20} fill={`rgb(156 163 175)`} />
            <span className="text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-50">
              {isShow ? `Cancel` : `Reply`}
            </span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isShow && (
          <CommentForm commentId={item.commentId} setIsShow={setIsShow} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comment;
