export default function ImageGalleryItem({
  onClose,
  largeImageURL,
  webformatURL,
  id,
}) {
  const onClickGalleryItem = () => {
    onClose(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem" onClick={onClickGalleryItem}>
      <img src={webformatURL} alt={id} className="ImageGalleryItem-image" />
    </li>
  );
}
