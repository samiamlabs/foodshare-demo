// @flow
import * as React from 'react';

type Props = {
  name: string,
  add_ons: Array<{name: string, price: number}>,
  price: number,
};

class Meal extends React.Component<Props> {
  render() {
    return <h1>meal</h1>;
  }
}
