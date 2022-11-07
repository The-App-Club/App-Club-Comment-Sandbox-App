import {Comment} from '@/domains/comment';
import {css, cx} from '@emotion/css';
import {Menu, Transition} from '@headlessui/react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Fragment, useEffect, useState} from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {MdDelete, MdOutlineContentCopy} from 'react-icons/md';

const ShortHandMenu = ({item}: {item: Comment}) => {
  const [permanentLink, setPermanentLink] = useState<string>('');

  useEffect(() => {
    setPermanentLink(`${window.location.origin}/#${item.commentId}`);
  }, [item]);

  return (
    <div
      className={cx(
        // `absolute top-2 right-2`,
        `w-[24px] h-[24px] flex items-center justify-center`,
        css`
          z-index: 1;
        `
      )}
    >
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-center justify-center">
          <Menu.Button onClick={() => {}}>
            <BsThreeDotsVertical size={20} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({active}) => {
                  return (
                    <button
                      className={`${
                        active ? 'bg-red-700 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                      }}
                    >
                      {active ? (
                        <MdDelete
                          size={20}
                          className="mr-2"
                          aria-hidden="true"
                        />
                      ) : (
                        <MdDelete
                          size={20}
                          className="mr-2"
                          aria-hidden="true"
                        />
                      )}
                      Delete
                    </button>
                  );
                }}
              </Menu.Item>
              <CopyToClipboard
                text={permanentLink}
                onCopy={() => {
                  console.log(`copied`);
                }}
              >
                <Menu.Item>
                  {({active}) => {
                    return (
                      <button
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          console.log(permanentLink);
                        }}
                      >
                        {active ? (
                          <MdOutlineContentCopy
                            size={20}
                            className="mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <MdOutlineContentCopy
                            size={20}
                            className="mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Copy
                      </button>
                    );
                  }}
                </Menu.Item>
              </CopyToClipboard>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ShortHandMenu;
