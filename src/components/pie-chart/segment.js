/* eslint-disable array-bracket-spacing */
class Segment {
  constructor(chart, index, outerPath, innerPath) {
    this.chart = chart;

    this.isTargeted = false;

    this.index = index;
    this.outerPath = outerPath;
    this.innerPath = innerPath;
    this.name = outerPath.dataset.name;
    this.value = Number.parseInt(outerPath.dataset.value, 10);

    this.innerRadius = this.chart.innerRadius;

    this.handleSegmentMouseOver = this.handleSegmentMouseOver.bind(this);
    this.handleSegmentMouseOut = this.handleSegmentMouseOut.bind(this);
  }

  initialize() {
    this.calculateAngle();
    this.render();

    this.outerPath.addEventListener('mouseover', this.handleSegmentMouseOver);
    this.outerPath.addEventListener('mouseout', this.handleSegmentMouseOut);
  }

  calculateAngle() {
    this.startAngle = this.index > 0 ? this.chart.segments[this.index - 1].endAngle : -90;
    this.angle = (this.value * 360) / this.chart.totalValue;
    this.endAngle = this.startAngle - this.angle;
  }

  calculateArcSize(isInnerArc = false) {
    const startAngleInRad = this.converDegToRad(this.startAngle);
    const endAngleInRad = this.converDegToRad(this.endAngle);
    let intervalBetweenArcs = this.converDegToRad(this.chart.intervalBetweenArcs);
    const radius = isInnerArc ? this.innerRadius : this.chart.outerRadius;
    if (isInnerArc) intervalBetweenArcs *= -1;

    const x1 = radius * Math.cos(startAngleInRad - intervalBetweenArcs);
    const y1 = radius * Math.sin(startAngleInRad - intervalBetweenArcs);
    const x2 = radius * Math.cos(endAngleInRad + intervalBetweenArcs);
    const y2 = radius * Math.sin(endAngleInRad + intervalBetweenArcs);

    return this.value !== 0 ? [x1, y1, x2, y2] : [x1, y1, x1, y1];
  }

  render() {
    this.innerRadius = this.isTargeted ? this.chart.hoveredInnerRadius : this.chart.innerRadius;

    const [outerX1, outerY1, outerX2, outerY2] = this.calculateArcSize();
    const [innerX1, innerY1, innerX2, innerY2] = this.calculateArcSize(true);

    const outerArcData = `M0 0 ${outerX1} ${outerY1} A${this.chart.outerRadius} ${this.chart.outerRadius} 0 ${Math.abs(this.angle) > 180 ? 1 : 0} 0 ${outerX2} ${outerY2}Z`;
    this.outerPath.setAttribute('d', outerArcData);

    const innerArcData = `M0 0 ${innerX1} ${innerY1} A${this.innerRadius} ${this.innerRadius} 0 ${Math.abs(this.angle) >= 180 ? 1 : 0} 0 ${innerX2} ${innerY2}Z`;
    this.innerPath.setAttribute('d', innerArcData);

    this.chart.currentSegment.classList.toggle(`pie-chart__current-segment-${this.index}`, false);
  }

  converDegToRad(deg) {
    const oneDeg = Math.PI / 180;
    const result = oneDeg * deg;
    return result;
  }

  handleSegmentMouseOver() {
    this.isTargeted = true;
    this.chart.render();
  }

  handleSegmentMouseOut() {
    this.isTargeted = false;
    this.chart.render();
  }
}

export default Segment;
