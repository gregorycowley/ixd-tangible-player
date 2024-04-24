class TangibleInfo {
  constructor() {
    this.element = this.createHtmlElement({ data1: 123, data2: 'abc', data3: { data4: 456 } });
    document.body.appendChild(this.element);
  }
  update(data) {
    console.log('t: Updating Info Display', data);
    this.element.remove();
    this.element = this.createHtmlElement(data);
    this.element.style.display = 'inline-flex';
    this.element.style.font = '16px Arial';
    this.element.style.color = 'orange';
    this.element.style.margin = '10px';
    this.element.style.padding = '30px';
    this.element.style.backgroundColor = 'rgba(0,0,0,0.5)';
    document.body.appendChild(this.element);
  }

  createHtmlElement(data) {
    // Create a <ul> element to list properties or array items
    const ul = document.createElement('ul');

    for (const key in data) {
      const li = document.createElement('li');
      if (typeof data[key] === 'object' && data[key] !== null) {
        // Recurse if the item is an object or an array
        li.innerHTML = `<strong>${key}:</strong>`;
        li.appendChild(this.createHtmlElement(data[key]));
      } else {
        // Display the value directly if it's not an object or array
        li.innerHTML = `<strong>${key}:</strong> ${data[key]}`;
      }
      li.style.display = 'flex';
      ul.appendChild(li);
    }
    return ul;
  }
}

module.exports = { TangibleInfo };
