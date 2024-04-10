import { RgbToHex } from '../utils/rgb-to-hex';

export interface StyleRule {
  condition: Function;
  style: Function;
}

const nextLineSymbol = '<br/>';


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

export const FigmaPropertiesToPromptTextStrategy: Array<StyleRule> = [
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('id'),
    style: (node) => [`id: ${node['id']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('width'),
    style: (node) => [`width: ${node['width']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('maxWidth'),
    style: (node) => [`maxWidth: ${node['maxWidth']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('minWidth'),
    style: (node) => [`minWidth: ${node['minWidth']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('height'),
    style: (node) => [`height: ${node['height']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('maxHeight'),
    style: (node) => [`maxHeight: ${node['maxHeight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('minHeight'),
    style: (node) => [`minHeight: ${node['minHeight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingBottom'),
    style: (node) => [`paddingBottom: ${node['paddingBottom']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingLeft'),
    style: (node) => [`paddingLeft: ${node['paddingLeft']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingRight'),
    style: (node) => [`paddingRight: ${node['paddingRight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('paddingTop'),
    style: (node) => [`paddingTop: ${node['paddingTop']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('fontName'),
    style: (node) => [`fontName: ${node['fontName']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('fontSize'),
    style: (node) => [`fontSize: ${node['fontSize']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('fontWeight'),
    style: (node) => [`fontWeight: ${node['fontWeight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeLeftWeight'),
    style: (node) => [`strokeLeftWeight: ${node['strokeLeftWeight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeRightWeight'),
    style: (node) => [`strokeRightWeight: ${node['strokeRightWeight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeTopWeight'),
    style: (node) => [`strokeTopWeight: ${node['strokeTopWeight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokeBottomWeight'),
    style: (node) => [`strokeBottomWeight: ${node['strokeBottomWeight']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('bottomLeftRadius'),
    style: (node) => [`bottomLeftRadius: ${node['bottomLeftRadius']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('bottomRightRadius'),
    style: (node) => [`bottomRightRadius: ${node['bottomRightRadius']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('topLeftRadius'),
    style: (node) => [`topLeftRadius: ${node['topLeftRadius']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('topRightRadius'),
    style: (node) => [`topRightRadius: ${node['topRightRadius']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('strokes'),
    style: (node) => {
      return node['strokes']
        .map((stroke) => {
          const classNameList = [];
          if (stroke.color) {
            classNameList.push(`strokeColor: ${RgbToHex(stroke.color.r, stroke.color.g, stroke.color.b)}`);
          }
          if (stroke.type) {
            classNameList.push(stroke.type);
          }
          return classNameList.join(nextLineSymbol);
        });
    },
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('textDecoration'),
    style: (node) => [`textDecoration: ${node['textDecoration']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('textCase'),
    style: (node) => [`textCase: ${node['textCase']}`],
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('backgrounds'),
    style: (node) => {
      return node['backgrounds']
        .map((background) => {
          const classNameList = [];
          if (background.color) {
            const hexColor = RgbToHex(background.color.r, background.color.g, background.color.b);
            classNameList.push(`BackgroundColor: ${hexColor}`);
          }
          if (background.blendMode) {
            classNameList.push(`BackgroundBlendMode: ${background.blendMode}`);
          }
          return classNameList.join(nextLineSymbol);
        });
    },
  },
  {
    condition: (node) => StrategyConditions.availableKeyInNode(node)('absoluteBoundingBox'),
    style: (node) => {
      return [`absoluteBoundingBox: `, `x: ${node['absoluteBoundingBox'].x}`, `y: ${node['absoluteBoundingBox'].y}`, `height: ${node['absoluteBoundingBox'].height}`, `width: ${node['absoluteBoundingBox'].width}`];
    },
  },
];
