# GoMarketplace
#### A mobile cart application.

### 📺 Preview
![preview-gomarketpalce](https://user-images.githubusercontent.com/55659197/81866712-f857b100-9545-11ea-9a6b-3a1f04551eeb.gif)


### 👨🏻‍💻 Stack and extensions
- React native with typescript
- Axios
- React navigation
- Styled components
- Json server

### 💻 Features
- List products
- Add products in cart
- Increment the quantity of a product
- Decrement the quantity of a product
- Calculates total cart items
- Calculates total value of the products
- Save cart items to memory

### 💾 How to install
1. Clone this repository - 
`git clone https://github.com/jfilipe-dev/gomarketplace.git`

2. Install the dependencies - 
`yarn`

3. Start Json server - 
` yarn json-server server.json -p 3333`

4. Run aplication (emulator)
- android - 
`adb reverse tcp:3333 tcp:3333`
`yarn android`

- ios - 
`cd ios`
`pod install`
`cd ..`
`yarn ios`
