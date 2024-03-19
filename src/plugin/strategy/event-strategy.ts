import { Event } from '../enum/event.enum';
import { HtmlInTailWindGenerator } from '../generator/html-in-tailwind-generator';

export const EventStrategy = [
  {
    event: Event.GenerateHtml,
    handler: () => {
      const selection = figma.currentPage.selection;
      if (selection.length === 0) {
        figma.closePlugin('Please select a frame.');
        return null;
      }

      const selected = selection[0];
      if (selected.type !== 'FRAME') {
        figma.closePlugin('Please select a frame.');
        return null;
      }

      const generator = new HtmlInTailWindGenerator();
      try {
        const html = generator.export(selected);
        console.log(html);
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
