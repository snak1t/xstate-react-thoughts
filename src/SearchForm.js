import React from "react";
import { match } from "./machine/match";

export class SearchForm extends React.Component {
  state = {
    query: ""
  };

  handleChangeQuery(value) {
    this.setState({ query: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.machine.transition({ type: "SEARCH", query: this.state.query });
  }

  render() {
    const { machine } = this.props;

    const searchText = match(
      {
        loading: "Searching...",
        error: "Try search again",
        otherwise: "Search"
      },
      machine
    );

    const renderLoading = (
      <button
        className="ui-button"
        type="button"
        onClick={() => machine.transition({ type: "CANCEL_SEARCH" })}
      >
        Cancel
      </button>
    );
    const renderGallery = (
      <button
        className="ui-button"
        type="button"
        onClick={() => machine.transition({ type: "CLEAR_GALLERY" })}
      >
        Clear
      </button>
    );
    return (
      <form className="ui-form" onSubmit={e => this.handleSubmit(e)}>
        <input
          type="search"
          className="ui-input"
          value={this.state.query}
          onChange={e => this.handleChangeQuery(e.target.value)}
          placeholder="Search Flickr for photos..."
          disabled={machine.state === "loading"}
        />
        <div className="ui-buttons">
          <button className="ui-button" disabled={machine.state === "loading"}>
            {searchText}
          </button>
          {match(
            {
              gallery: renderGallery,
              loading: renderLoading,
              otherwise: null
            },
            machine
          )}
        </div>
      </form>
    );
  }
}
