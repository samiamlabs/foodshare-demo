import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

// , {
//   geocodeByAddress,
//   getLatLng
// }

import Button from 'material-ui/Button';

class AddressAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {address: props.defaultAddress};
    this.onChange = address => this.setState({address});
  }

  handleClick = event => {
    event.preventDefault();

    // geocodeByAddress(this.state.address)
    //   .then(results => getLatLng(results[0]))
    //   .then(latLng => console.log('Success', latLng))
    //   .catch(error => console.error('Error', error));

    this.props.handleAddressSubmit(this.state.address);
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    return (
      <div>
        <PlacesAutocomplete inputProps={inputProps} />
        <Button onClick={this.handleClick} variant="raised" color="secondary" fullWidth>
          CHOOSE
        </Button>
      </div>
    );
  }
}

export default AddressAutoComplete;
// API-key: AIzaSyCZFFfGR0KFAwC6sTIMAkDffYQmqcihgcA
