import { BlendMode } from '../utils/blend-mode';
import { RgbToHex } from '../utils/rgb-to-hex';

export interface StyleRule {
  condition: Function;
  style: Function;
}

const unit = 'px';

class StrategyConditions {
  static availableKeyInNode(node) {
    return (key) => key in node && node[key] !== null;
  }

  static shouldBeAbleToGetAbsolutePosition(node: any) {
    return [
      'absoluteBoundingBox' in node,
      'absoluteBoundingBox' in node.parent,
      node.absoluteBoundingBox,
      node.parent.absoluteBoundingBox,
      node.type !== 'TEXT',
    ].every((o) => !!o);
  }
}

export const FigmaPropertiesToTailwindCssStrategy: Array<StyleRule> = [
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('width'),
    style: (node) => [`w-[${node['width']}${unit}]`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('maxWidth'),
    style: (node) => [`max-w-[${node['maxWidth']}${unit}]`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('minWidth'),
    style: (node) => [`min-w-[${node['minWidth']}${unit}]`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('height'),
    style: (node) => [`h-[${node['height']}${unit}]`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('maxHeight'),
    style: (node) => [`max-h-[${node['maxHeight']}${unit}]`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('minHeight'),
    style: (node) => [`min-h-[${node['minHeight']}${unit}]`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingBottom'),
    style: (node) => [node ? `pb-[${node['paddingBottom']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingLeft'),
    style: (node) => [node ? `pl-[${node['paddingLeft']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingRight'),
    style: (node) => [node ? `pr-[${node['paddingRight']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingTop'),
    style: (node) => [node ? `pt-[${node['paddingTop']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('fontName'),
    style: (node) => [node ? `font-[${node.family}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('fontSize'),
    style: (node) => [node ? `text-[${node['fontSize']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('fontWeight'),
    style: (node) => [node ? `font-[${node['fontWeight']}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeLeftWeight'),
    style: (node) => [node ? `border-l-[${node['strokeLeftWeight']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeRightWeight'),
    style: (node) => [node ? `border-r-[${node['strokeRightWeight']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeTopWeight'),
    style: (node) => [node ? `border-t-[${node['strokeTopWeight']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeBottomWeight'),
    style: (node) => [node ? `border-b-[${node['strokeBottomWeight']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('bottomLeftRadius'),
    style: (node) => [node ? `rounded-bl-[${node['bottomLeftRadius']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('bottomRightRadius'),
    style: (node) => [node ? `rounded-bt-[${node['bottomRightRadius']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('topLeftRadius'),
    style: (node) => [node ? `rounded-tl-[${node['topLeftRadius']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('topRightRadius'),
    style: (node) => [node ? `rounded-tr-[${node['topRightRadius']}${unit}]` : ''],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokes'),
    style: (node) => {
      return node['strokes']
        .map((stroke) => {
          const classNameList = [];
          if (stroke.color) {
            const hexColor = RgbToHex(stroke.color.r, stroke.color.g, stroke.color.b);
            classNameList.push(`border-[${hexColor}]`);
          }
          if (stroke.type) {
            classNameList.push(stroke.type === 'SOLID' ? 'border-solid' : 'border-dahsed');
          }
          return classNameList;
        })
        .reduce((val, acc) => {
          acc.push(...val);
          return acc;
        }, []);
    },
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('textDecoration'),
    style: (node) => {
      const className = [
        ['STRIKETHROUGH', 'line-through'],
        ['NONE', 'no-underline'],
        ['UNDERLINE', 'underline'],
      ].filter(([key]) => key === node['textDecoration'])[0][1];
      return [className];
    },
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('textCase'),
    style: (node) => {
      const className = [
        ['UPPER', 'uppercase'],
        ['LOWER', 'lowercase'],
        ['SMALL_CAPS', 'capitalize'],
        ['ORIGINAL', 'normal-case'],
      ].filter(([key]) => key === node['textCase'])[0][1];
      return [className];
    },
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('backgrounds'),
    style: (node) => {
      return node['backgrounds']
        .map((background) => {
          const classNameList = [];
          if (background.color) {
            const hexColor = RgbToHex(background.color.r, background.color.g, background.color.b);
            classNameList.push(`bg-[${hexColor}]`);
          }
          if (background.blendMode) {
            const rules: Array<[BlendMode, string]> = [
              ['NORMAL', 'bg-blend-normal'],
              ['MULTIPLY', 'bg-blend-multiply'],
              ['SCREEN', 'bg-blend-screen'],
              ['OVERLAY', 'bg-blend-overlay'],
              ['DARKEN', 'bg-blend-darken'],
              ['LIGHTEN', 'bg-blend-lighten'],
              ['COLOR_DODGE', 'bg-blend-color-dodge'],
              ['COLOR_BURN', 'bg-blend-color-burn'],
              ['HARD_LIGHT', 'bg-blend-hard-light'],
              ['SOFT_LIGHT', 'bg-blend-soft-light'],
              ['DIFFERENCE', 'bg-blend-difference'],
              ['EXCLUSION', 'bg-blend-exclusion'],
              ['HUE', 'bg-blend-hue'],
              ['SATURATION', 'bg-blend-saturation'],
              ['COLOR', 'bg-blend-color'],
              ['LUMINOSITY', 'bg-blend-luminosity'],
            ];
            classNameList.push(rules.filter(([key]) => key === background.blendMode)[0][1]);
          }
          return classNameList;
        })
        .reduce((cur, acc) => {
          acc.push(...cur);
          return acc;
        }, []);
    },
  },
  {
    condition: (node) => StrategyConditions.shouldBeAbleToGetAbsolutePosition(node),
    style: (node) => {
      const classNameList = [];
      const left = Math.ceil(node.absoluteBoundingBox.x - node.parent.absoluteBoundingBox.x);
      const top = Math.ceil(node.absoluteBoundingBox.y - node.parent.absoluteBoundingBox.y);
      if (top > 0 || left > 0) {
        classNameList.push('absolute');
      }
      if (left > 0) {
        classNameList.push(`ml-[${left}${unit}]`);
      }
      if (top > 0) {
        classNameList.push(`mt-[${top}${unit}]`);
      }
      return classNameList;
    },
  },
];
