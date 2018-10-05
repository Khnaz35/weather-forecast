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
      update: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps() {
    if(this.props.selectedAddress) {
      this.setState({update: true, address: this.props.selectedAddress})
    }
  }

  handleChange(address) {
    this.setState({ address });
  }

  render() {
    console.log('!!', this.props.selectedAddress)
    let address = this.props.selectedAddress ? this.props.selectedAddress : null;

    let value;
    if(!address || this.state.update) {
      value = this.state.address
    }
    else if(!this.state.update) {
      value = address
    }


    return (
      <PlacesAutocomplete
        value={value}
        onChange={this.handleChange}
        onSelect={this.props.handleSelect}
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
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: 'green', cursor: 'pointer' }
                  : { backgroundColor: 'blue', cursor: 'pointer'};
                return (
                  <div

                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
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


