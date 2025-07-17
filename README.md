Project Name:
Kata: Sweet Shop Management System

Features:

Add Sweets: 
• Users should be able to add new sweets to the shop. 
o Each sweet should have a unique identifier (e.g.,  ID), name, category (e.g., 
chocolate, candy, pastry), price, and quantity in stock. 
Delete Sweets: 
• Users should be able to remove sweets from the shop. 
View Sweets: 
• Users should be able to view a list of all sweets currently available in the shop.

Search: 
• Users should be able to search for sweets by name, category, or price range.

Purchase Sweets: 
• Users can purchase sweets, which decreases the quantity of them in stock. 
• The system should ensure enough stock is available before allowing a purchase. 
• If there is not enough stock, the system should raise an appropriate error. 

Restock Sweets: 
• Users can restock sweets, increasing their quantity of stock.

How to run:

cd sweet-shop-backend
npm install
npm run start

cd sweet-shop-frontend
npm install
npm start