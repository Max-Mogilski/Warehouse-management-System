# Warehouse-Management-System

LIVE: https://www.warehousesystem.ovh/

TEST USER: test@test.com <br />
TEST PASSWORD: Test123%

To fully use the application you need to allow your camera due to the scanning functionality.

## Technologies used:
 #### Fronted: react, typescript, scss, zustand, react-query, framermotion and other libraries
 
 #### Backend: express, typescript, prisma, mysql
 
 #### Deploy: docker, linux, vps

## How does the application work?

 ### Adding product model
  First, we must create a product model in order to see products in the shop
  </br>
  ![Add product model](https://github.com/Hero1230/Warehouse-management-System/blob/master/images-gh/add-prod.png?raw=true)
   </br>
  As soon as we have added one, we will be able to see the product in the store
  </br>
![Add product model](https://github.com/Hero1230/Warehouse-management-System/blob/master/images-gh/Zrzut%20ekranu%202023-09-1%20o%2019.29.42.png?raw=true)
  
## Features
### Shop prototype
  - add/remove products from the cart
  - create an order

### WMS
  - register/login
  - create product and add it to the shop
  - create location
  - create pallet
  - refill products
  - re-assign product to a different pallet
  - inspect all locations
  - inspect all products
  - inspect all orders
  - inspect location via scanning QR
  - inspect product via scanning barcode
  - order picking (pick all ordered items, and forward it to the shipment zone)
