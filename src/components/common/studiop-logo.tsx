import { Component, Prop, h } from "@stencil/core";

@Component({ tag: "studiop-logo" })
export class Logo {
  @Prop() byline: string;
  @Prop() name: string;

  getStyle(index: number) {
    const baseSeconds = 0.05;
    const transitionLength = baseSeconds + 0.02 * index;
    return { "transition-delay": `${transitionLength}s` };
  }

  render() {
    return (
      <div class="logo">
        <div>
          <h1 class="site-title">
            <span>
              <a href="/" title={this.byline} rel="home" class="logo-letters">
                {[...this.name].map((char, idx) => (
                  <span class="logo-letter" style={this.getStyle(idx)}>
                    {char}
                  </span>
                ))}
              </a>
            </span>
          </h1>
          <span class="site-description">{this.byline}</span>
        </div>
      </div>
    );
  }
}
