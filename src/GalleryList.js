import React from "react";

export const GalleryList = ({ images, machine }) => {
  return (
    <section className="ui-items" data-state={machine.state}>
      {machine.state === "error" ? (
        <span className="ui-error">Uh oh, search failed.</span>
      ) : (
        images.map((photo, i) => (
          <img
            src={photo.media.m}
            className="ui-item"
            style={{ "--i": i }}
            key={photo.link}
            onClick={() =>
              machine.transition({
                type: "SELECT_PHOTO",
                photo
              })
            }
          />
        ))
      )}
    </section>
  );
};
