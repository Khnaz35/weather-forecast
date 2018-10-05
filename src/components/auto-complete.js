import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      suggestedAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.setSuggestedAddress = this.setSuggestedAddress.bind(this);
  }

  handleChange(address) {
    this.setState({ address });
  }

  setSuggestedAddress(suggestedAddress) {
    this.setState({ suggestedAddress });
  }

  render() {

    return (
      <PlacesAutocomplete
        value={this.state.suggestedAddress ? this.state.suggestedAddress : this.state.address}
        onChange={this.handleChange}
        onSelect={() => this.props.handleSelect(this.state.address)}

      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div  className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                let activeSuggestion;
                if(suggestion.active) {
                  activeSuggestion = suggestion.description;
                }
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: 'green', cursor: 'pointer', width: '60%' }
                  : { backgroundColor: 'blue', cursor: 'pointer', width: '60%' };
                return (
                  <div

                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span onClick={() => this.setSuggestedAddress(activeSuggestion)}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}


