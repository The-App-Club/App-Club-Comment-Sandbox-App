import type {NextPage} from 'next';
import Comment from '@/components/Comment';
import dataComments from '@/data/comments.json';
import {Comment as IComment} from '@/domains/comment';
import Spacer from '@/components/Spacer';
import Header from '@/components/Header';
import {useHashFragment} from '@/hooks/useHashFragment';
import Footer from '@/components/Footer';

const Home: NextPage = () => {
  useHashFragment(48); // header height pixel

  return (
    <div className="mx-auto max-w-xl w-full">
      <Header />
      <div className="mt-12 flex flex-col justify-center items-center gap-4">
        {dataComments.map((item: IComment, index) => {
          return <Comment item={item} key={index} />;
        })}
      </div>
      <Spacer height="50vh" />
      <Footer />
    </div>
  );
};

export default Home;
