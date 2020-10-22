class ListItem {
  constructor(chart, container, segment) {
    this.chart = chart;
    this.container = container;
    this.segment = segment;

    this.handleItemMouseOver = this.handleItemMouseOver.bind(this);
    this.handleItemMouseOut = this.handleItemMouseOut.bind(this);
  }

  initialize() {
    this.container.addEventListener('mouseover', this.handleItemMouseOver);
    this.container.addEventListener('mouseout', this.handleItemMouseOut);
  }

  handleItemMouseOver() {
    this.segment.handleSegmentMouseOver();
  }

  handleItemMouseOut() {
    this.segment.handleSegmentMouseOut();
  }
}

export default ListItem;
