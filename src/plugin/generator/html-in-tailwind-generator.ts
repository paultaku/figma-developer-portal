import { FigmaTypeTagMap } from '../config/figma-type-to-tag';
import { FigmaPropertiesToTailwindCssStrategy } from '../strategy/figma-properties-to-tailwind-css-strategy';

export class HtmlInTailWindGenerator {
  private getClassNameList(node: any) {
    let classNameList = [];
    for (let { condition, style } of FigmaPropertiesToTailwindCssStrategy) {
      if (condition(node)) {
        classNameList.push(...style(node));
      }
    }

    return classNameList;
  }

  private getTemplate({
    tag,
    classNameList,
  }: {
    tag: string;
    classNameList: Array<string>;
    node: any;
  }): [string, string] {
    return [`<${tag} class="${classNameList.join(' ')}">`, `</${tag}>`];
  }

  export(node): string {
    if (node.type === 'VECTOR') {
      return '';
    }

    const classNameList = this.getClassNameList(node).filter((o) => !!o);
    const [open, close] = this.getNodeTemplate(node, classNameList).filter((o) => !!o);
    let children = '';

    if (node.type == 'TEXT') {
      return [open, node.characters, close].filter((o) => !!o).join('\r\n');
    }

    if (node.children) {
      try {
        children = node.children.map((child) => this.export(child)).join('\r\n');
      } catch (e) {
        console.error(e);
      }
    }

    return [open, children, close].filter((o) => !!o).join('\r\n');
  }

  private getNodeTemplate(node: any, classNameList: Array<string>): [string, string] {
    if (node.visible === false) {
      return ['', ''];
    }

    for (let [type, tag] of FigmaTypeTagMap) {
      if (node.type === type) {
        return this.getTemplate({
          tag,
          classNameList,
          node,
        });
      }
    }
    return ['', ''];
  }
}
