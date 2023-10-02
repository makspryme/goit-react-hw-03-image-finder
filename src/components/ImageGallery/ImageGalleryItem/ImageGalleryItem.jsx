export default function ImageGalleryItem({ id, image, largeImage, onClick }) {
  return (
    <>
      <li key={id} className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={image}
          alt={largeImage}
          onClick={e => {
            onClick(e.target.alt);
          }}
        />
      </li>
    </>
  );
}
