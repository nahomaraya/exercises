/**
 * Product Card Web Component
 * Uses Shadow DOM, slots, attributes, and custom events
 */
class ProductCard extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Create styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      
      .product-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        max-width: 300px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
        background: white;
      }
      
      .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .product-image {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 15px;
      }
      
      .product-header {
        margin-bottom: 12px;
      }
      
      .product-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
        margin: 0 0 8px 0;
      }
      
      .product-price {
        font-size: 1.25rem;
        color: #2196F3;
        font-weight: 600;
      }
      
      .product-description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 16px;
        min-height: 40px;
      }
      
      .purchase-button {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 12px 24px;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        font-weight: 600;
        transition: background 0.3s;
      }
      
      .purchase-button:hover {
        background: #45a049;
      }
      
      .purchase-button:active {
        transform: scale(0.98);
      }
      
      ::slotted(img) {
        width: 100%;
        height: auto;
        display: block;
      }
    `;
    
    // Create structure using DOM APIs
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Image container with slot
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image';
    const imageSlot = document.createElement('slot');
    imageSlot.name = 'image';
    imageContainer.appendChild(imageSlot);
    
    // Header with name and price
    const header = document.createElement('div');
    header.className = 'product-header';
    
    this.nameElement = document.createElement('h2');
    this.nameElement.className = 'product-name';
    
    this.priceElement = document.createElement('div');
    this.priceElement.className = 'product-price';
    
    header.appendChild(this.nameElement);
    header.appendChild(this.priceElement);
    
    // Description with slot
    const description = document.createElement('div');
    description.className = 'product-description';
    const descriptionSlot = document.createElement('slot');
    descriptionSlot.name = 'description';
    description.appendChild(descriptionSlot);
    
    // Button
    this.button = document.createElement('button');
    this.button.className = 'purchase-button';
    this.button.textContent = 'Add to Cart';
    
    // Assemble the card
    card.appendChild(imageContainer);
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(this.button);
    
    // Add to shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(card);
    
    // Bind event handler
    this.handlePurchase = this.handlePurchase.bind(this);
  }
  
  // Define which attributes to observe
  static get observedAttributes() {
    return ['name', 'price'];
  }
  
  // Called when the element is added to the DOM
  connectedCallback() {
    this.button.addEventListener('click', this.handlePurchase);
    this.updateContent();
  }
  
  // Called when the element is removed from the DOM
  disconnectedCallback() {
    this.button.removeEventListener('click', this.handlePurchase);
  }
  
  // Called when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateContent();
    }
  }
  
  // Update the content based on attributes
  updateContent() {
    const name = this.getAttribute('name') || 'Product Name';
    const price = this.getAttribute('price') || '0.00';
    
    this.nameElement.textContent = name;
    this.priceElement.textContent = `$${price}`;
  }
  
  // Handle purchase button click
  handlePurchase() {
    // Dispatch a custom "purchase" event
    const purchaseEvent = new CustomEvent('purchase', {
      detail: {
        name: this.getAttribute('name'),
        price: this.getAttribute('price'),
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true // Allows event to cross shadow DOM boundary
    });
    
    this.dispatchEvent(purchaseEvent);
  }
}

// Register the custom element
customElements.define('product-card', ProductCard);
