import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';

export default function ImageGallery({ arr, onClose, handleClick }) {
  return (
    <>
      <ul className="ImageGallery">
        {arr.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClose={onClose}
          />
        ))}
      </ul>
      {arr.length % 12 === 0 && <Button onClick={handleClick} />}
    </>
  );
}
