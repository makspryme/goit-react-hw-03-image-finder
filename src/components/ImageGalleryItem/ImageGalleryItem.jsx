export default function ImageGalleryItem({
  id,
  image,
  largeImage,
  onImageClick,
}) {
  return (
    <>
      <li key={id} className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={image}
          alt={largeImage}
          onClick={e => {
            onImageClick(e.target.alt);
          }}
        />
      </li>
    </>
  );
}
