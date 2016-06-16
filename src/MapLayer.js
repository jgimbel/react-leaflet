import { assign } from 'lodash';
import React, { cloneElement, Children, PropTypes } from 'react';
import { Map } from 'leaflet';
import warning from 'warning';

import childrenType from './types/children';
import layerContainerType from './types/layerContainer';

import MapComponent from './MapComponent';

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: childrenType,
    layerContainer: layerContainerType,
    map: PropTypes.instanceOf(Map),
  };

  static contextTypes = {
    layerContainer: layerContainerType,
    map: PropTypes.instanceOf(Map),
  }

  componentDidMount() {
    super.componentDidMount();
    const layerContainer = this.getLayerContainer();
    layerContainer.addLayer(this.leafletElement);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    const layerContainer = this.getLayerContainer();
    layerContainer.removeLayer(this.leafletElement);
  }

  getMap() {
    warning(this.props.map && !this.context.map, 'Passing map as a prop is deprecated. Please check the change log for more information.')
    return this.context.map || this.props.map;
  }

  getLayerContainer() {
    warning(this.props.layerContainer && !this.context.layerContainer, 'Passing map as a prop is deprecated. Please check the change log for more information.')
    return this.context.layerContainer || this.props.layerContainer;
  }

  getClonedChildrenWithProps(extra) { // Will be removed in the next version
    const { children, layerContainer } = this.props;
    const map = this.getMap();
    const props = assign({map, layerContainer}, extra);

    return Children.map(children, child => {
      return child ? cloneElement(child, props) : null;
    });
  }

  renderChildrenWithProps(props) {
    const children = this.getClonedChildrenWithProps(props);
    return <div style={{display: 'none'}}>{children}</div>;
  }
}
