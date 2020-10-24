import Segment from './segment';
import ListItem from './list-item';
import { doDeclensionOfWord } from '../../assets/helpers';

import './pie-chart.scss';

class PieChart {
  constructor(outerContainer) {
    this.outerContainer = outerContainer;

    this.initialize();
  }

  initialize() {
    this.container = this.outerContainer.querySelector('.js-pie-chart');
    this.chartListContainer = this.container.querySelector('.js-pie-chart__chart-list');
    this.currentSegment = this.container.querySelector('.js-pie-chart__current-segment');
    this.currentSegmentValue = this.container.querySelector('.js-pie-chart__current-segment-value');
    this.currentSegmentName = this.container.querySelector('.js-pie-chart__current-segment-name');

    this._extractData();
    this._createSegments();
    this._createListItems();

    this.totalValue = this.segments.reduce((previousValue, currentSegment) => previousValue + currentSegment.value, 0);

    this.segments.forEach((segment) => segment.initialize());
    this.items.forEach((item) => item.initialize());

    this.render();
  }

  render() {
    this.segments.forEach((segment) => {
      segment.render();
    });

    const targetedSegment = this.segments.find((segment) => segment.isTargeted);
    if (targetedSegment) {
      this.currentSegmentValue.textContent = targetedSegment.value;
      this.currentSegment.classList.toggle(`pie-chart__current-segment_with-name_${targetedSegment.name}`, true);
      this.currentSegmentName.textContent = doDeclensionOfWord(targetedSegment.value, ['голос', 'голоса', 'голосов']);
    } else {
      this.currentSegmentValue.textContent = this.totalValue;
      this.currentSegmentName.textContent = doDeclensionOfWord(this.totalValue, ['голос', 'голоса', 'голосов']);
    }
  }

  _extractData() {
    this.outerRadius = Number.parseInt(this.container.dataset.outerRadius, 10);
    this.innerRadius = Number.parseInt(this.container.dataset.innerRadius, 10);
    this.hoveredInnerRadius = Number.parseInt(this.container.dataset.hoveredInnerRadius, 10);
    this.intervalBetweenArcs = Number.parseInt(this.container.dataset.intervalBetweenArcs, 10);
  }

  _createSegments() {
    const pathsContainer = this.container.querySelector('.js-pie-chart__paths');
    const outerPaths = Array.from(pathsContainer.querySelectorAll('.js-pie-chart__outer-path'));
    const innerPaths = Array.from(pathsContainer.querySelectorAll('.js-pie-chart__inner-path'));

    this.segments = [];
    outerPaths.forEach((outerPath, index) => {
      this.segments.push(new Segment(this, index, outerPath, innerPaths[index]));
    });
  }

  _createListItems() {
    const itemsContainer = Array.from(this.chartListContainer.querySelectorAll('.js-pie-chart__list-item'));
    this.items = itemsContainer.map((itemContainer, index) => new ListItem(this, itemContainer, this.segments[index]));
  }
}

export default PieChart;
