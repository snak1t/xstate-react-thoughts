import React from "react";
import fetchJsonp from "fetch-jsonp";
import { galleryMachine } from "./machine/gallery.machine";
import { SearchForm } from "./SearchForm";
import { GalleryList } from "./GalleryList";
import { Machine } from "./Machine";
import { GalleryItem } from "./GalleryItem";

export class Flickr extends React.Component {
  state = {
    items: [],
    photo: null
  };

  updateItems = ({ items }) => {
    this.setState({ items });
  };

  setPhoto = ({ photo }) => {
    this.setState({ photo });
  };
  clearState = () => {
    this.setState({ items: [], photo: null });
  };

  search = ({ query }, next) => {
    const encodedQuery = encodeURIComponent(query);
    setTimeout(() => {
      fetchJsonp(
        `https://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&tags=${encodedQuery}`,
        { jsonpCallback: "jsoncallback" }
      )
        .then(res => res.json())
        .then(data => {
          next({ type: "SEARCH_SUCCESS", items: data.items });
        })
        .catch(error => {
          next({ type: "SEARCH_FAILURE" });
        });
    }, 1000);
  };

  commands = {
    search: this.search,
    updateItems: this.updateItems,
    setPhoto: this.setPhoto,
    clearState: this.clearState
  };

  render() {
    return (
      <Machine machine={galleryMachine} commands={this.commands}>
        {machine => (
          <div className="ui-app" data-state={machine.state}>
            <SearchForm machine={machine} />
            <GalleryList images={this.state.items} machine={machine} />
            <GalleryItem photo={this.state.photo} machine={machine} />
          </div>
        )}
      </Machine>
    );
  }
}
