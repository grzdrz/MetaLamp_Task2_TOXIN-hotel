import Segment from './segment';
import ListItem from './list-item';

import './pie-chart.scss';

class PieChart {
  constructor(outerContainer) {
    this.outerContainer = outerContainer;

    this.initialize();
  }

  initialize() {
    this.container = this.outerContainer.querySelector('.pie-chart');
    this.chartListContainer = this.container.querySelector('.pie-chart__chart-list');
    this.currentSegment = this.container.querySelector('.pie-chart__current-segment');
    this.currentSegmentValue = this.container.querySelector('.pie-chart__current-segment-value');
    this.currentSegmentName = this.container.querySelector('.pie-chart__current-segment-name');

    this.extractData();
    this.createSegments();
    this.createListItems();

    this.totalValue = this.segments.reduce((previousValue, currentSegment) => previousValue + currentSegment.value, 0);

    this.segments.forEach((segment) => segment.initialize());
    this.items.forEach((item) => item.initialize());

    this.render();
  }

  extractData() {
    this.outerRadius = Number.parseInt(this.container.dataset.outerRadius, 10);
    this.innerRadius = Number.parseInt(this.container.dataset.innerRadius, 10);
    this.hoveredInnerRadius = Number.parseInt(this.container.dataset.hoveredInnerRadius, 10);
    this.intervalBetweenArcs = Number.parseInt(this.container.dataset.intervalBetweenArcs, 10);
  }

  createSegments() {
    const pathsContainer = this.container.querySelector('.pie-chart__paths');
    const outerPaths = Array.from(pathsContainer.querySelectorAll('.pie-chart__outer-path'));
    const innerPaths = Array.from(pathsContainer.querySelectorAll('.pie-chart__inner-path'));

    this.segments = [];
    outerPaths.forEach((outerPath, index) => {
      this.segments.push(new Segment(this, index, outerPath, innerPaths[index]));
    });
  }

  createListItems() {
    const itemsContainer = Array.from(this.chartListContainer.querySelectorAll('.pie-chart__list-item'));
    this.items = itemsContainer.map((itemContainer, index) => new ListItem(this, itemContainer, this.segments[index]));
  }

  render() {
    this.segments.forEach((segment) => {
      segment.render();
    });

    const targetedSegment = this.segments.find((segment) => segment.isTargeted);
    if (targetedSegment) {
      this.currentSegmentValue.textContent = targetedSegment.value;
      this.currentSegmentName.textContent = 'голосов';
      this.currentSegment.classList.toggle(`pie-chart__current-segment-${targetedSegment.index}`, true);
    } else {
      this.currentSegmentValue.textContent = this.totalValue;
      this.currentSegmentName.textContent = 'голосов';
    }
  }
}

export default PieChart;
