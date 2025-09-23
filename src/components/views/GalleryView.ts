import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface GalleryData {
  catalog: HTMLElement[];
}

export class GalleryView extends Component<GalleryData> {
  protected gallery: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.gallery = ensureElement(".gallery", this.container);
  }
  set catalog(value: HTMLElement[]) {
    value.forEach((item) => this.gallery.appendChild(item));
  }
}
