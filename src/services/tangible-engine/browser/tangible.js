class Tangible {

  constructor() {
    this.tangible = this.createTangibleGraphicalElement('tangible');
    this.tangible.style.position = 'absolute';
    this.tangible.style.width = '50px';
    this.tangible.style.height = '50px';
    this.tangible.style.backgroundColor = 'red';
    this.tangible.style.opacity = 0;
    this.tangible.style.transition = 'all 0.1s ease-in-out';
    this.tangible.style.transformOrigin = 'center';
    this.tangible.style.borderRadius = '50%';
    document.body.appendChild(this.tangible);
  }

  onUpdate = (response) => {
    console.log("Renderer : ", response)
    if (response.TANGIBLES.length > 0) {
      showTangible(tangible)
      updateTangiblePos(
        this.tangible,
        response.TANGIBLES[0].X,
        response.TANGIBLES[0].Y
      )
      updateTangibleRot(this.tangible, response.TANGIBLES[0].R)
    } else {
      hideTangible(this.tangible)
    }
  }

  hideTangible(tangible) {
    tangible.style.opacity = 0
  }
  
  showTangible(tangible) {
    tangible.style.opacity = 1
  }
  
  updateTangiblePos(tangible, x, y) {
    let newPoint = {x:x,y:y};
    // let newPoint = screen.screenToDipPoint({x:x,y:y});
    const bounds = tangible.getBoundingClientRect()
    tangible.style.left = `${(newPoint.x - bounds.x) * 0.5 +
      bounds.x -
      tangible.clientWidth / 4}px`
    tangible.style.top = `${(newPoint.y - bounds.y) * 0.5 +
      bounds.y -
      tangible.clientHeight / 4}px`
  }
  
  updateTangibleRot(tangible, radian) {
    tangible.style.transform = `rotate(${radian * 57.29578}deg)`
  }

  displayData(data) {
    // Check if the input data is an array or an object
    const isValidInput = Array.isArray(data) || (typeof data === 'object' && data !== null);
    if (!isValidInput) {
        throw new Error('Input must be an array or an object');
    }
    // Start the HTML creation from the root
    const rootElement = createHtmlElement(data);
    return rootElement;
  }

  createHtmlElement (data) {
    // Create a <ul> element to list properties or array items
    const ul = document.createElement('ul');

    for (const key in data) {
        const li = document.createElement('li');
        if (typeof data[key] === 'object' && data[key] !== null) {
            // Recurse if the item is an object or an array
            li.innerHTML = `<strong>${key}:</strong>`;
            li.appendChild(createHtmlElement(data[key]));
        } else {
            // Display the value directly if it's not an object or array
            li.innerHTML = `<strong>${key}:</strong> ${data[key]}`;
        }
        ul.appendChild(li);
    }

    return ul;
  };

  createTangibleGraphicalElement(tangibleId) {
    var newDiv = document.createElement('div');
    newDiv.id = tangibleId;

    newDiv.innerHTML = 'This is the content of the new div.';
    newDiv.style.color = 'blue';
    newDiv.style.border = '1px solid black';
    newDiv.style.padding = '10px';
    newDiv.style.marginTop = '10px';

    // document.body.appendChild(newDiv);
    return newDiv;
}
}



export { Tangible };