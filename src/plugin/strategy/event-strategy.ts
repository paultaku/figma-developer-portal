import { Event } from '../enum/event.enum';
import { HtmlInTailWindGenerator } from '../generator/html-in-tailwind-generator';

export const EventStrategy = [
  {
    event: Event.GenerateHtml,
    handler: () => {
      const selection = figma.currentPage.selection;
      console.log(selection.map((node) => node.type));
      if (selection.length === 0) {
        figma.closePlugin('Please select a frame.');
        return null;
      }

      const selected = selection[0];
      if (!['FRAME', 'GROUP'].includes(selected.type)) {
        figma.closePlugin('Please select a frame.');
        return null;
      }

      const generator = new HtmlInTailWindGenerator();
      try {
        const html = generator.export(selected);
        return {
          html,
        };
      } catch (e) {
        console.error(e);
        figma.closePlugin('An error occurred.');
        return null;
      }
    },
    close: false,
  },
  {
    event: Event.ClosePlugin,
    handler: () => {},
    close: true,
  },
];
