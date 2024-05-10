import React from 'react';

const PersistentGif = ({ src }) => {
  // Using React useRef to persist the img element across re-renders
  const imgRef = React.useRef(null);

  // Check if img element is already loaded with the correct src, if not update it
  React.useEffect(() => {
    console.log('src:', src);
    if (imgRef.current && imgRef.current.src !== src) {
      imgRef.current.src = src;
    }
  }, [src]); // Only re-run this effect if src changes

  return (
    <div>
      {/* The key remains constant, so React doesn't remount the img element */}
      <img ref={imgRef} src={src} alt="Persistent GIF" key="persistentGif" />
    </div>
  );
};

export default PersistentGif;
