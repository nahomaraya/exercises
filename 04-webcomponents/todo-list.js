/**
 * Todo List Web Component
 * Uses Shadow DOM, custom events, and internal state management
 */
class TodoList extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Internal state - list of items
    this.items = [];
    
    // Create styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      
      .todo-container {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 500px;
      }
      
      .todo-header {
        font-size: 1.8rem;
        font-weight: bold;
        color: #333;
        margin: 0 0 20px 0;
        text-align: center;
      }
      
      .todo-input-section {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
      }
      
      .todo-input {
        flex: 1;
        padding: 12px 16px;
        font-size: 1rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        outline: none;
        transition: border-color 0.2s;
      }
      
      .todo-input:focus {
        border-color: #4CAF50;
      }
      
      .add-button {
        padding: 12px 24px;
        font-size: 1rem;
        font-weight: 600;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s;
      }
      
      .add-button:hover {
        background: #45a049;
      }
      
      .add-button:active {
        transform: scale(0.98);
      }
      
      .add-button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      
      .todo-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .todo-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        margin-bottom: 8px;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #4CAF50;
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .todo-item-text {
        flex: 1;
        color: #333;
        font-size: 1rem;
      }
      
      .delete-button {
        padding: 6px 12px;
        font-size: 0.875rem;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s;
      }
      
      .delete-button:hover {
        background: #d32f2f;
      }
      
      .empty-state {
        text-align: center;
        color: #999;
        padding: 40px 20px;
        font-size: 1.1rem;
      }
      
      .item-counter {
        text-align: center;
        color: #666;
        font-size: 0.9rem;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e0e0e0;
      }
    `;
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'todo-container';
    
    // Create header
    const header = document.createElement('h2');
    header.className = 'todo-header';
    header.textContent = 'Todo List';
    
    // Create input section
    const inputSection = document.createElement('div');
    inputSection.className = 'todo-input-section';
    
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'todo-input';
    this.input.placeholder = 'Enter a new task...';
    
    this.addButton = document.createElement('button');
    this.addButton.className = 'add-button';
    this.addButton.textContent = 'Add';
    
    inputSection.appendChild(this.input);
    inputSection.appendChild(this.addButton);
    
    // Create list container
    this.listElement = document.createElement('ul');
    this.listElement.className = 'todo-list';
    
    // Create item counter
    this.counter = document.createElement('div');
    this.counter.className = 'item-counter';
    
    // Assemble container
    container.appendChild(header);
    container.appendChild(inputSection);
    container.appendChild(this.listElement);
    container.appendChild(this.counter);
    
    // Add to shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
    
    // Bind event handlers
    this.handleAdd = this.handleAdd.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  connectedCallback() {
    // Add event listeners
    this.addButton.addEventListener('click', this.handleAdd);
    this.input.addEventListener('keypress', this.handleKeyPress);
    
    // Initial render
    this.render();
  }
  
  disconnectedCallback() {
    // Clean up event listeners
    this.addButton.removeEventListener('click', this.handleAdd);
    this.input.removeEventListener('keypress', this.handleKeyPress);
  }
  
  handleKeyPress(event) {
    // Add item when Enter key is pressed
    if (event.key === 'Enter') {
      this.handleAdd();
    }
  }
  
  handleAdd() {
    const value = this.input.value.trim();
    
    // Don't add empty items
    if (!value) {
      return;
    }
    
    // Add item to internal list
    const item = {
      id: Date.now(),
      text: value,
      timestamp: new Date().toISOString()
    };
    
    this.items.push(item);
    
    // Clear input
    this.input.value = '';
    this.input.focus();
    
    // Re-render the list
    this.render();
    
    // Emit custom event
    this.emitListChanged('added', item);
  }
  
  handleDelete(id) {
    // Find the item being deleted
    const deletedItem = this.items.find(item => item.id === id);
    
    // Remove item from internal list
    this.items = this.items.filter(item => item.id !== id);
    
    // Re-render the list
    this.render();
    
    // Emit custom event
    this.emitListChanged('deleted', deletedItem);
  }
  
  render() {
    // Clear the list
    this.listElement.textContent = '';
    
    // If list is empty, show empty state
    if (this.items.length === 0) {
      const emptyState = document.createElement('li');
      emptyState.className = 'empty-state';
      emptyState.textContent = 'No tasks yet. Add one above!';
      this.listElement.appendChild(emptyState);
    } else {
      // Render each item
      this.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const text = document.createElement('span');
        text.className = 'todo-item-text';
        text.textContent = item.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.handleDelete(item.id));
        
        li.appendChild(text);
        li.appendChild(deleteBtn);
        
        this.listElement.appendChild(li);
      });
    }
    
    // Update counter
    this.updateCounter();
  }
  
  updateCounter() {
    const count = this.items.length;
    if (count === 0) {
      this.counter.textContent = '';
    } else if (count === 1) {
      this.counter.textContent = '1 task';
    } else {
      this.counter.textContent = `${count} tasks`;
    }
  }
  
  emitListChanged(action, item) {
    // Dispatch custom event with details
    const event = new CustomEvent('listChanged', {
      detail: {
        action: action,
        item: item,
        totalItems: this.items.length,
        items: [...this.items], // Copy of items array
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true // Allows event to cross shadow DOM boundary
    });
    
    this.dispatchEvent(event);
  }
  
  // Public API: Get current items
  getItems() {
    return [...this.items];
  }
  
  // Public API: Clear all items
  clearAll() {
    this.items = [];
    this.render();
    this.emitListChanged('cleared', null);
  }
  
  // Public API: Add item programmatically
  addItem(text) {
    if (!text || typeof text !== 'string') {
      return;
    }
    
    const item = {
      id: Date.now(),
      text: text.trim(),
      timestamp: new Date().toISOString()
    };
    
    this.items.push(item);
    this.render();
    this.emitListChanged('added', item);
  }
}

// Register the custom element
customElements.define('todo-list', TodoList);
