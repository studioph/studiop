import { Component, h } from "@stencil/core";

// interface Props {
//   text: string;
// }

@Component({
  tag: "studiop-home",
})
export class StudiopHome {
  render() {
    return <studiop-nav items={["Home", "About", "Reel", "Works"]} />;
  }
}
