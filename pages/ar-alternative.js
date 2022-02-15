import { useEffect } from "react";

export default function arAlternative() {
  /* Add new element directory to body */
  useEffect(() => {
    const arElement = document.createElement("a-scene");
    arElement.setAttribute("arjs", "");
    arElement.setAttribute("embedded", "");
    arElement.innerHTML = `
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05"
          gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>`;
    document.body.appendChild(arElement);
  }, []);

  return (
    <div>
      <h1>arAlternative</h1>
    </div>
  );
}
