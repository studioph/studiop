import { Component, Prop, h } from "@stencil/core";

@Component({ tag: "studiop-nav" })
export class StudiopNav {
  @Prop() items: string[];

  render() {
    return (
      <header>
        <div class="header">
          <div class="header-inside">
            <studiop-logo name="StudioP" byline="The Music of Paul Hutchings" />
            <nav class="desktop" role="navigation" aria-label="Primary Menu" itemtype="http://schema.org/SiteNavigationElement">
              <ul class="nav-list">
                {this.items.map(item => (
                  <li class="nav-item">
                    <a class="nav-link">
                      <span class="nav-text">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
