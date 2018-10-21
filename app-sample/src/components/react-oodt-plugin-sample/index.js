import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { number, object, string } from 'yup';
import JsonTable from 'ts-react-json-table';

const schema = object().shape({
  productId: string().required(),
  interval: number()
});

export default class OODTSample extends Component {
  static defaultProps = {
    interval: 1000 * 60 * 5
  };

  state = {
    product: {},
    error: false,
    loading: true
  };

  componentDidMount() {
    schema
      .validate(this.props)
      .then(() => this.fetchData())
      .catch(error => {
        console.error(`${error.name} @ ${this.constructor.name}`, error.errors);
        this.setState({ error: true, loading: false });
      });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  async fetchData() {
    const { productId, interval } = this.props;

    try {
      const res = await fetch(
        `http://46.4.26.22:8012/fmprod/jaxrs/product?productId=${productId}`
      );
      const json = await res.json();

      this.setState({
        product: json.product,
        error: false,
        loading: false
      });
    } catch (error) {
      this.setState({ error: true, loading: false });
    } finally {
      this.timeout = setTimeout(() => this.fetchData(), interval);
    }
  }

  render() {
    const { product, error, loading } = this.state;

    return loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error :(</div>
    ) : (
      <JsonTable className="table" rows={product} />
    );
  }
}
