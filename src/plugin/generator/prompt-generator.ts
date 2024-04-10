import { FigmaPropertiesToPromptTextStrategy } from "../strategy/figma-properties-to-prompt";

export class PromptGenerator {
  private nextLineSymbol = '\r\n';
  private systemPrompt = "You are a senior developer. Use the provided design context to create idiomatic HTML/CSS code based on the user request. Everything must be inline in one file and your response must be directly renderable by the browser. Write code that matches the Figma file nodes and metadata as exactly as you can. Figma file nodes and metadata: {context} ";
  private humanPrompt = "Code the content. Ensure that the code is mobile responsive and follows modern design principles."

  export(node, deep: number = 0): string {
    const nodeTemplate = this.getNodeTemplate(node);

    let children = '';
    if (node.children) {
      try {
        children = node.children.map((child) => this.export(child, deep + 1));
      } catch (e) {
        console.error(e);
      }
    }

    if (deep >= 1) {
      return [nodeTemplate, 'childrenNode: ', children].join(this.nextLineSymbol);
    }
    const context = [nodeTemplate, 'childrenNode: ', children].join(this.nextLineSymbol);
    return [this.systemPrompt.replace('{context}', context), this.nextLineSymbol, this.humanPrompt].join(this.nextLineSymbol);
  }

  private getNodeTemplate(node: any): string {
    if (!node.visible) {
      return '';
    }

    let list = [];

    for (let { condition, style } of FigmaPropertiesToPromptTextStrategy) {
      if (condition(node)) {

        list.push(...style(node), this.nextLineSymbol);
      }
    }
    return list.join(this.nextLineSymbol);
  }
}
