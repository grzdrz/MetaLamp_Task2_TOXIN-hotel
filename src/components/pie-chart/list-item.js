class ListItem {
  constructor(chart, container, segment) {
    this.chart = chart;
    this.container = container;
    this.segment = segment;

    this._handleItemMouseOver = this._handleItemMouseOver.bind(this);
    this._handleItemMouseOut = this._handleItemMouseOut.bind(this);
  }

  initialize() {
    this.container.addEventListener('mouseover', this._handleItemMouseOver);
    this.container.addEventListener('mouseout', this._handleItemMouseOut);
  }

  _handleItemMouseOver() {
    this.segment.isTargeted = true;
    this.chart.render();
  }

  _handleItemMouseOut() {
    this.segment.isTargeted = false;
    this.chart.render();
  }
}

export default ListItem;
