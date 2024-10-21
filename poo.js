// Classe pour représenter un produit
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Classe pour représenter un élément du panier d'achat
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Méthode pour calculer le prix total de l'élément
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Classe pour représenter le panier d'achat
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Méthode pour ajouter des éléments au panier
    addItem(product, quantity) {
        const item = this.items.find(i => i.product.id === product.id);
        if (item) {
            item.quantity += quantity; // Augmenter la quantité
        } else {
            this.items.push(new ShoppingCartItem(product, quantity)); // Ajouter un nouvel élément
        }
        this.displayCart();
    }

    // Méthode pour supprimer un élément du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    // Méthode pour afficher les éléments du panier
    displayCart() {
        const cartDiv = document.getElementById('shopping-cart');
        cartDiv.innerHTML = ''; // Réinitialiser le contenu

        if (this.items.length === 0) {
            cartDiv.innerHTML = '<p>Le panier est vide.</p>';
            return;
        }

        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>Produit: ${item.product.name}</p>
                <p>Quantité: ${item.quantity}</p>
                <p>Prix total: ${item.getTotalPrice().toFixed(2)}CFA</p>
                <button onclick="cart.removeItem(${item.product.id})">Supprimer</button>
            `;
            cartDiv.appendChild(itemDiv);
        });
    }
}

// Création de produits
const product1 = new Product(1, 'T-shirt', 20.00);
const product2 = new Product(2, 'Jean', 40.00);
const product3 = new Product(3, 'Chaussures', 60.00);

// Création du panier d'achat
const cart = new ShoppingCart();

// Affichage des produits
const productList = document.getElementById('product-list');
const products = [product1, product2, product3];

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Prix: ${product.price.toFixed(2)}CFA</p>
        <button onclick="cart.addItem(product${product.id}, 1)">Ajouter au panier</button>
    `;
    productList.appendChild(productDiv);
});

// Associer les produits à la portée globale
window.product1 = product1;
window.product2 = product2;
window.product3 = product3;
