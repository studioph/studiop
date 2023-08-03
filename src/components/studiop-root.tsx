import { Component, h } from "@stencil/core";

@Component({
  tag: "studiop-root",
})
export class StudiopRoot {
  render() {
    return (
      <div>
        {/* <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="studiop-home" exact={true} />
          </stencil-route-switch>
        </stencil-router> */}
        <studiop-nav items={["Home", "About", "Reel", "Works"]} />
      </div>
    );
  }
}
