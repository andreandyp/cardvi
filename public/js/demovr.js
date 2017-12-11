var maxX = Infinity, maxZ = Infinity;

AFRAME.registerComponent('limite', {
    tick: function () {
        let posX = this.el.getAttribute("position").x;
        let posZ = this.el.getAttribute("position").z;

        if(posX > maxX || posX < -maxX || posZ > maxZ || posZ < -maxZ){
            document.querySelector("a-camera").setAttribute("position", {x: Math.trunc(posX), y: 1.6, z: Math.trunc(posZ)});
        }
    }
  });
$(document).ready(() =>{
});