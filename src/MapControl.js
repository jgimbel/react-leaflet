import { Component, PropTypes } from 'react';
import { Map } from 'leaflet';
import warning from 'warning';

import controlPositionType from './types/controlPosition';
import layerContainerType from './types/layerContainer';

export default class MapControl extends Component {
  static propTypes = {
    layerContainer: layerContainerType,
    map: PropTypes.instanceOf(Map),
    position: controlPositionType,
  };

  componentDidMount() {
    this.leafletElement.addTo(this.props.map);
  }

  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setPosition(this.props.position);
    }
  }

  componentWillUnmount() {
    this.leafletElement.removeFrom(this.props.map);
  }

  getLeafletElement() {
    return this.leafletElement;
  }

  getMap() {
    warning(this.props.map && !this.context.map, 'Passing map as a prop is deprecated. Please check the change log for more information.')
    return this.context.map || this.props.map;
  }

  getLayerContainer() {
    warning(this.props.layerContainer && !this.context.layerContainer, 'Passing layerContainer as a prop is deprecated. Please check the change log for more information.')
    return this.context.layerContainer || this.props.layerContainer;
  }

  render() {
    return null;
  }
}
