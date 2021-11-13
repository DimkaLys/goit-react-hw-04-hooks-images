import './App.css';
import './components/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import fetchImages from './services/api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import LoaderSpin from './components/Loader';

export default function App() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [arr, setArr] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!value) return;
    setStatus('pending');
    fetchImages(value, page)
      .then(data => {
        if (data.length !== 0) {
          page === 1 ? setArr(data) : setArr(prev => [...prev, ...data]);
          setStatus('resolved');
          return;
        }
        toast.warn('Изображений с таким названием нет');
        setStatus('idle');
      })
      .catch(err => {
        console.log(err);
        setStatus('error');
      })
      .finally(() => {
        windowScroll();
      });
  }, [value, page]);

  const windowScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const clearRender = () => {
    setStatus('idle');
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar
        onValueSubmit={setValue}
        clearRender={clearRender}
        onPageSubmit={setPage}
      />
      <ToastContainer theme="colored" autoClose={2000} />
      {status === 'idle' && <p>Начните поиск изображений</p>}

      {status === 'pending' && (
        <div className="Loader">
          <LoaderSpin />
        </div>
      )}

      {status === 'resolved' && (
        <ImageGallery
          arr={arr}
          handleClick={handleClick}
          onClose={toggleModal}
        />
      )}

      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
}
