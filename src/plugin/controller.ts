import { EventStrategy } from './strategy/event-strategy';

console.clear();
console.log(figma.viewport.center);
figma.showUI(__html__);
const nodes = figma.currentPage.selection;
figma.viewport.scrollAndZoomIntoView(nodes);
figma.ui.resize(640, 480);

figma.ui.onmessage = (msg) => {
  for (const strategy of EventStrategy) {
    if (msg.type === strategy.event) {
      const result = strategy.handler();
      figma.ui.postMessage({
        type: strategy.event,
        message: result,
      });

      if (strategy.close) {
        figma.closePlugin();
      }
    }
  }
};

