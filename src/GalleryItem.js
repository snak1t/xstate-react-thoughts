import React from "react";

export const GalleryItem = ({ machine, photo }) => {
  if (machine.state !== "photo") return null;
  return (
    <section
      className="ui-photo-detail"
      onClick={() => machine.transition({ type: "EXIT_PHOTO" })}
    >
      <img src={photo.media.m} className="ui-photo" alt="Look at me" />
    </section>
  );
};
