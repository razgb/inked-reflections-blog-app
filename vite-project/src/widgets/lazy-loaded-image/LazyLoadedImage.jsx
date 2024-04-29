import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirebaseImageSrc } from "../../shared/util/fetchFirebaseImageSrc";
import { addImageToCache } from "../../entities/image-cache/image-cache-slice";
import Spinner from "../../shared/ui/spinner/Spinner";

export default function LazyLoadedImage({
  reference,
  altText,
  firebaseFolder,
  spinnerSize = "small",
}) {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const imageSrc = useSelector((state) => state.imageCache[reference]);

  useEffect(() => {
    if (!reference || !firebaseFolder || imageSrc) return;

    const imageRefCurrent = imageRef.current;
    let componentIsMounted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fetchImageURL = async () => {
              const src = await fetchFirebaseImageSrc(
                reference,
                firebaseFolder
              );
              if (componentIsMounted && src) {
                dispatch(addImageToCache({ reference, src }));
              }
            };

            // Not using await so call stack isn't blocked.
            fetchImageURL();
            observer.unobserve(imageRefCurrent);
          }
        });
      },
      {
        rootMargin: "1400px",
        threshold: 0,
      }
    );

    if (imageRefCurrent) {
      observer.observe(imageRefCurrent);
    }

    return () => {
      componentIsMounted = false;
      if (imageRefCurrent) {
        observer.unobserve(imageRefCurrent);
      }
    };
  });

  // Case where there is an error from firebase that went past image validation upon uploading a post.
  if (!reference) {
    return null;
  }

  return (
    <div className="lazy-loaded-image-container" ref={imageRef}>
      {imageSrc ? (
        <img className="lazy-loaded-image" src={imageSrc} alt={altText} />
      ) : (
        <div className="lazy-loaded-spinner-container">
          <Spinner size={spinnerSize} />
        </div>
      )}
    </div>
  );
}
